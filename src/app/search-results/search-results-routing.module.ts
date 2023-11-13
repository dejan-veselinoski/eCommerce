import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchResultsComponent } from './search-results.component';
import { ProductDetailsComponent } from '../products/product-details/product-details.component';

const routes: Routes = [
  {
    path     : '',
    component: SearchResultsComponent
  },
  {
    path: 'details/:slug',
    component: ProductDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchResultsRoutingModule { }
