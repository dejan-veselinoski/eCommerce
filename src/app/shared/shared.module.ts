import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryCardComponent } from './components/category-card/category-card.component';
import { ApolloModule } from 'apollo-angular';
import { HttpClientModule } from '@angular/common/http';
import { NguCarouselModule } from '@ngu/carousel';
import { RouterModule } from '@angular/router';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { FormatPricePipe } from './pipes/format-price.pipe';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { SearchDialogComponent } from './components/search-dialog/search-dialog.component';
import { ProductFiltersComponent } from '../products/product-filters/product-filters.component';
import { ProductListComponent } from '../products/product-list/product-list.component';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [
    CategoryCardComponent,
    ProductCardComponent,
    FormatPricePipe,
    BreadcrumbsComponent,
    SearchDialogComponent,
    ProductFiltersComponent,
    ProductListComponent,
  ],
  imports: [
    CommonModule,
    ApolloModule,
    HttpClientModule,
    NguCarouselModule,
    RouterModule,
    MaterialModule,
  ],
  exports: [
    CategoryCardComponent,
    ApolloModule,
    HttpClientModule,
    NguCarouselModule,
    RouterModule,
    ProductCardComponent,
    FormatPricePipe,
    BreadcrumbsComponent,
    SearchDialogComponent,
    ProductFiltersComponent,
    ProductListComponent,
  ]
})
export class SharedModule { }
