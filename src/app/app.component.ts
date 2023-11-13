import { Component } from '@angular/core';
import { Observable, merge } from 'rxjs';
import { map, shareReplay, switchMap } from 'rxjs/operators';
import { StateService } from './services/state.service';
import { DataService } from './services/data.service';
import { GetCartTotalsQuery, GetCollectionsQuery, GetCollectionsQueryVariables } from './shared/types/predefined-types';
import { GET_CART_TOTALS, GET_COLLECTIONS } from './shared/types/results';
import { SearchDialogComponent } from './shared/components/search-dialog/search-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'e-commerce-app';

  // Shopping Cart
  shoppingCart$!: Observable<{ total: number; quantity: number; }>;
  collections$!: Observable<GetCollectionsQuery['collections']['items']>;
  cartCount: number = 0;

  constructor(
    private dataService: DataService,
    private stateService: StateService,
    private _matDialog: MatDialog,
    private route: ActivatedRoute, 
    private router: Router,
    ) {
  }

  ngOnInit(): void {
    this.subscribeToCartData();
  }

  subscribeToCartData() {
    this.collections$ = this.dataService.query<GetCollectionsQuery, GetCollectionsQueryVariables>(GET_COLLECTIONS, {
      options: {take: 25, topLevelOnly: true}
    }).pipe(
        map(({collections}) => collections.items)
    );

    this.shoppingCart$ = merge(
      this.stateService.select(state => state.activeOrderId),
    ).pipe(
        switchMap(() => this.dataService.query<GetCartTotalsQuery>(GET_CART_TOTALS, {}, 'network-only')),
        map(({activeOrder}) => {
            return {
                total: activeOrder ? activeOrder.totalWithTax : 0,
                quantity: activeOrder ? activeOrder.totalQuantity : 0,
            };
        }),
        shareReplay(1),
    );

    this.shoppingCart$.subscribe(
      data => {{
        this.cartCount = data.quantity;
      }}
    );
  }

  openSearchDialog() {
    const dialogRef = this._matDialog.open(SearchDialogComponent, {
      panelClass: 'search-dialog',
      disableClose: false,
      width: '50%',
    });
    dialogRef.afterClosed().subscribe({
      next: (result: any) => {
        if (result) {
          this.router.navigate(['/search'], {
            queryParams: { search: result },
            relativeTo: this.route,
            queryParamsHandling: 'merge',
        });
        }
      }
    })
  }

}

