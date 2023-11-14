import { AfterViewInit, Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { ActiveService } from 'src/app/services/active.service';
import { DataService } from 'src/app/services/data.service';
import { StateService } from 'src/app/services/state.service';
import { AddToCartMutation, AddToCartMutationVariables, GetProductDetailQuery, GetProductDetailQueryVariables } from 'src/app/shared/types/predefined-types';
import { GET_PRODUCT_DETAIL, ADD_TO_CART } from 'src/app/shared/types/results';

type Variant = NonNullable<GetProductDetailQuery['product']>['variants'][number];
type Collection = NonNullable<GetProductDetailQuery['product']>['collections'][number];

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  // Product
  product: GetProductDetailQuery['product'] | any;
  qtyInCart: { [id: string]: number; } = {};
  qty = 1;
  product$!: Subscription;
  myThumbnail!: string;
  myFullresImage!: string;
  variantControl: FormControl = new FormControl();

  breadcrumbs: Collection['breadcrumbs'] = [];
  loading: boolean = true;

  constructor(private dataService: DataService,
    private stateService: StateService,
    private activeService: ActiveService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.subscribeToProductData();
  }

  subscribeToProductData() {
    const lastCollectionSlug$ = this.stateService.select(state => state.lastCollectionSlug);
    const productSlug$ = this.route.paramMap.pipe(
      map(paramMap => paramMap.get('slug')),
      filter(notNullOrUndefined),
    );

    this.product$ = productSlug$.pipe(
        switchMap(slug => {
            return this.dataService.query<GetProductDetailQuery, GetProductDetailQueryVariables>(GET_PRODUCT_DETAIL, {
                    slug,
                },
            );
        }),
        map(data => data.product),
        filter(notNullOrUndefined),
        withLatestFrom(lastCollectionSlug$),
    ).subscribe(([product, lastCollectionSlug]) => {
        this.product = product;
        this.myThumbnail = this.product?.featuredAsset?.preview;
        this.myFullresImage = this.product?.featuredAsset?.preview;
        this.variantControl.setValue(product!.variants[0])
        const collection = this.getMostRelevantCollection(product!.collections, lastCollectionSlug);
        this.breadcrumbs = collection ? collection.breadcrumbs : [];
        this.loading = false;
    });

    this.activeService.activeOrder$.subscribe((order: any) => {
      this.qtyInCart = {};
      for (const line of order?.lines ?? []) {
          this.qtyInCart[line.productVariant.id] = line.quantity;
      }
    })
  }

  addToCart(variant: Variant, qty: number) {
    this.dataService.mutate<AddToCartMutation, AddToCartMutationVariables>(ADD_TO_CART, {
      variantId: variant.id,
      qty,
    }).subscribe(({addItemToOrder}) => {
    switch (addItemToOrder.__typename) {
        case 'Order':
            this.stateService.setState('activeOrderId', addItemToOrder ? addItemToOrder.id : null);
            break;
        case 'OrderModificationError':
        case 'OrderLimitError':
        case 'NegativeQuantityError':
        case 'InsufficientStockError':
            break;
    }
    });
  }

  getMostRelevantCollection(collections: Collection[], lastCollectionSlug: string | null) {
    const lastCollection = collections.find(c => c.slug === lastCollectionSlug);
    if (lastCollection) {
      return lastCollection;
    }
    return collections.slice().sort((a, b) => {
    if (a.breadcrumbs.length < b.breadcrumbs.length) {
        return 1;
    }
    if (a.breadcrumbs.length > b.breadcrumbs.length) {
        return -1;
    }
    return 0;
      })[0];
  }
}

export function notNullOrUndefined<T>(val: T | undefined | null): val is T {
  return val !== undefined && val !== null;
}
