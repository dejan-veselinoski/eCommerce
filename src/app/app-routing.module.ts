import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
    import('./landing/landing.module').then(
      m => m.LandingModule
    )
  },
  {
    path: 'products/:slug',
    loadChildren: () =>
    import('./products/products.module').then(
      m => m.ProductsModule
    )
  },
  {
    path: 'checkout',
    loadChildren: () =>
    import('./checkout/checkout.module').then(
      m => m.CheckoutModule
    )
  },
  {
    path: 'search',
    loadChildren: () =>
    import('./search-results/search-results.module').then(
      m => m.SearchResultsModule
    )
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
