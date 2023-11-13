import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Collection, GetCollectionsQuery } from '../shared/types/predefined-types';
import { map } from 'rxjs/operators';
import { DataService } from '../services/data.service';
import { NguCarousel, NguCarouselConfig } from '@ngu/carousel';
import * as FilterActions from './../ngrx/act.action';
import { FilterModel } from '../ngrx/filter.model';
import { Store } from '@ngrx/store';
import { GET_COLLECTIONS } from '../shared/types/results';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit{

  collectionsData$!: Observable<GetCollectionsQuery['collections']['items']>;
  productList: Array<Collection> = [];



  @ViewChild('categoryCarousel') categoryCarousel!: NguCarousel<any>;
  carouselConfig: NguCarouselConfig = {
    grid: { xs: 1, sm: 2, md: 3, lg: 3, all: 0 },
    load: 3,
    interval: {timing: 4000, initialDelay: 1000},
    loop: true,
    touch: true,
    velocity: 0.2
  }

  loading: boolean = true;

  constructor(
    private dataService: DataService,
    private cdRef: ChangeDetectorRef,
    private store:Store<FilterModel>
  ){}

  ngOnInit(): void {
    this.getCollections();
    this.removeProductFilters();
  }

  getCollections() {
    this.collectionsData$ = this.dataService.query<GetCollectionsQuery>(GET_COLLECTIONS, {
      options: { take: 50 },
    }).pipe(map(({collections}) => collections.items));

    this.collectionsData$.subscribe(
      (data: any) => {
        this.productList = data;
        this.loading = false;
        this.cdRef.detectChanges();
      }
    )
  }

  removeProductFilters() {
    let filter = {
      ids: [],
      search: '',
      category: ''
  };
  this.store.dispatch(new FilterActions.AddFilter(filter) );
  }

}
