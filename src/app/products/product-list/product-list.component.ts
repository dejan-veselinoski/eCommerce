import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, combineLatest, merge, Observable, of } from 'rxjs';
import { distinctUntilChanged, map, mapTo, scan, share, shareReplay, skip, switchMap, take, tap, } from 'rxjs/operators';
import { DataService } from 'src/app/services/data.service';
import { StateService } from 'src/app/services/state.service';
import { getRouteArrayParam } from 'src/app/shared/get-route-array-param';
import { GetCollectionQuery, GetCollectionQueryVariables, SearchProductsQuery, SearchProductsQueryVariables } from 'src/app/shared/types/predefined-types';
import { GET_COLLECTION, SEARCH_PRODUCTS } from 'src/app/shared/types/results';
import { FilterModel } from '../../ngrx/filter.model';
import { Store } from '@ngrx/store';
import { selectFilterCollection } from 'src/app/ngrx/filter.selector';
import * as FilterActions from '../../ngrx/act.action';
type SearchItem = SearchProductsQuery['search']['items'][number];

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {

  @Input() showToolbar: boolean = true;

  // Products
  products$!: Observable<SearchItem[]>;
  totalResults$!: Observable<number>;
  collection$!: Observable<GetCollectionQuery['collection']>;
  displayLoadMore$!: Observable<boolean>;
  totalCount!: number;
  unfilteredTotalItems = 0;
  private currentPage = 15;

  // Filters
  activeFacetValueIds$!: Observable<string[]>;
  searchTerm$!: Observable<string>;
  idValues!: SearchProductsQuery['search']['facetValues'];
  activeFacetValueIds: Array<any> = [];
  searchValue!: string;
  
  // ngrx
  filter$ = this.store.select(selectFilterCollection);

  // Breadcrumbs
  breadcrumbs$!: Observable<Array<{id: string; name: string; }>>;
  breadCrumbs: Array<any> = [];

  // Other
  categoryName!: string | null;
  private refresh = new BehaviorSubject<void>(undefined);
  isUrlChecked!: boolean;
  loading: boolean = true;

  constructor(private dataService: DataService,
              private route: ActivatedRoute,
              private stateService: StateService,
              private router: Router,
              private store:Store<FilterModel>
              ) { }

  ngOnInit() {
      this.stateService.loading.subscribe( (data: boolean) => { this.loading = data; });

      const perPage = 15;
      const collectionSlug$ = this.route.paramMap.pipe(
          map(pm => pm.get('slug')),
          distinctUntilChanged(),
          tap(slug => {
              this.stateService.setState('lastCollectionSlug', slug || null);
              this.currentPage = 0;
          }),
          shareReplay(1),
      );

      collectionSlug$.subscribe(data => {
        this.categoryName = data;
      })
      
      this.collection$ = collectionSlug$.pipe(
          switchMap(slug => {
              if (slug) {
                  return this.dataService.query<GetCollectionQuery, GetCollectionQueryVariables>(GET_COLLECTION, {
                      slug,
                  }).pipe(
                      map(data => data.collection),
                  );
              } else {
                  return of(undefined);
              }
          }),
          shareReplay(1),
      );

      this.subscribeToFilters();
      this.subscribeToBreadcrumbs();

      const triggerFetch$ = combineLatest(this.collection$, this.activeFacetValueIds$, this.searchTerm$, this.refresh);
      const getInitialFacetValueIds = () => {
          combineLatest(this.collection$, this.searchTerm$).pipe(
              take(1),
              switchMap(([collection, term]) => {
                  return this.dataService.query<SearchProductsQuery, SearchProductsQueryVariables>(SEARCH_PRODUCTS, {
                      input: {
                          term,
                          groupByProduct: true,
                          collectionId: collection?.id,
                          take: perPage,
                          skip: this.currentPage * perPage,
                      },
                  });
              }),
              ).subscribe(data => {
                  this.idValues = data.search.facetValues;
                  this.unfilteredTotalItems = data.search.totalItems;
              });
      };
  
      const queryResult$ = triggerFetch$.pipe(
          switchMap(([collection, facetValueIds, term]) => {
              return this.dataService.query<SearchProductsQuery, SearchProductsQueryVariables>(SEARCH_PRODUCTS, {
                  input: {
                      term,
                      groupByProduct: true,
                      collectionId: collection?.id,
                      facetValueFilters: facetValueIds.map(id => ({ and: id })),
                      take: perPage,
                      skip: this.currentPage * perPage,
                  },
              }).pipe(
                  tap(data => {
                      if (facetValueIds.length === 0) {
                          this.idValues = data.search.facetValues;
                          this.unfilteredTotalItems = data.search.totalItems;
                      } else if (!this.idValues) {
                          getInitialFacetValueIds();
                      } else {
                          this.idValues = this.idValues.map(fv => fv);
                      }
                  }),
              );
          }),
          shareReplay(1),
      );

      const RESET = 'RESET';
      const items$ = this.products$ = queryResult$.pipe(map(data => data.search.items));
      const reset$ = merge(collectionSlug$, this.activeFacetValueIds$, this.searchTerm$).pipe(
          mapTo(RESET),
          skip(1),
          share(),
      );

      this.products$ = merge(items$, reset$).pipe(
          scan<SearchItem[] | string, SearchItem[]>((acc, val) => {
              if (typeof val === 'string') {
                  return [];
              } else {
                  return acc.concat(val);
              }
          }, [] as SearchItem[]),
      );

      this.products$.subscribe( data => { 
        if (data && data.length > 0) {
            this.loading = false;
        } else {
            setTimeout(() => {
                this.loading = false;
            }, 1500)
        }
      })

      this.totalResults$ = queryResult$.pipe(map(data => data.search.totalItems));
      this.totalResults$.subscribe(
        (data: number) => {
          this.totalCount = data;
        }
      )

      this.displayLoadMore$ = combineLatest(this.products$, this.totalResults$).pipe(
          map(([products, totalResults]) => {
              return 0 < products.length && products.length < totalResults;
          }),
      );
  }

  subscribeToFilters() {
    this.activeFacetValueIds$ = this.route.paramMap.pipe(
        map(pm => getRouteArrayParam(pm, 'facets')),
        distinctUntilChanged((x, y) => x.toString() === y.toString()),
        tap(() => {
            this.currentPage = 0;
        }),
        shareReplay(1),
    );

    this.searchTerm$ = this.route.queryParamMap.pipe(
      map(pm => pm.get('search') || ''),
      distinctUntilChanged(),
      shareReplay(1),
  );

    this.searchTerm$.subscribe(data => {
      this.searchValue = data;
    })

    this.activeFacetValueIds$.subscribe(data => {
      this.activeFacetValueIds = data;
      this.checkHistoryValues();
    })
  }

  subscribeToBreadcrumbs(){
    this.breadcrumbs$ = this.collection$.pipe(
        map(collection => {
            if (collection) {
                return collection.breadcrumbs;
            } else {
                return [{
                    id: '',
                    name: 'Home',
                }, {
                    id: '',
                    name: 'Search',
                }];
            }
        }),
    );

    this.breadcrumbs$.subscribe(data => {
      this.breadCrumbs = data;
    })
  }

  checkHistoryValues() {
    this.filter$.subscribe(data => {
        if (data && data.length > 0 && !this.isUrlChecked) {
            let item = data[data.length - 1];
            const uniqueValues = new Set([...this.activeFacetValueIds, ... item.ids ? item.ids : []]);
            this.activeFacetValueIds = Array.from(uniqueValues);
            this.activeFacetValueIds.length > 0 ? this.setFilterIds() : null;
        }
        this.isUrlChecked = true;
    })

    let filter = {
        ids: this.activeFacetValueIds,
        search: this.searchValue,
        category: this.categoryName
    };
    this.store.dispatch(new FilterActions.AddFilter(filter) );
  }

  setFilterIds() {
    this.router.navigate(['./', {
        facets: this.activeFacetValueIds,
    }], {
        queryParamsHandling: 'merge',
        relativeTo: this.route,
        state: {
            noScroll: true,
        },
    });
  }

  trackByProductId(index: number, item: SearchItem) {
      return item.productId;
  }

  loadMore() {
      this.currentPage ++;
      this.refresh.next();
  }

}
