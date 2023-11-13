import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { ProductsComponent } from './products.component';
import { StoreModule } from '@ngrx/store';
import { Reducers } from '../ngrx/red.reducer';
import { COLLECTION_FEATURE, FILTER_FEATURE } from '../ngrx/filter.selector';
import { MaterialModule } from '../shared/material.module';

@NgModule({
  declarations: [
    ProductDetailsComponent,
    ProductsComponent,
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedModule,
    NgxImageZoomModule,
    StoreModule.forFeature(FILTER_FEATURE, Reducers),
    MaterialModule,
  ]
})
export class ProductsModule { }
