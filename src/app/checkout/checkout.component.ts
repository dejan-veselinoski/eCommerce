import { Component, OnInit } from '@angular/core';
import { AdjustItemQuantityMutation, AdjustItemQuantityMutationVariables, CartFragment, GetOrderForCheckoutQuery, RemoveItemFromCartMutation, RemoveItemFromCartMutationVariables } from '../shared/types/predefined-types';
import { Observable, merge, of } from 'rxjs';
import { shareReplay, switchMap, take } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { StateService } from '../services/state.service';
import { ActiveService } from '../services/active.service';
import { DataService } from '../services/data.service';
import { ADJUST_ITEM_QUANTITY, REMOVE_ITEM_FROM_CART } from '../shared/types/results';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  shoppingCart$!: Observable<GetOrderForCheckoutQuery['activeOrder'] | null | undefined | any>;
  loading: boolean = true;
  
  constructor(
    private activeService: ActiveService,
    private stateService: StateService,
    private dataService: DataService,
    ) { }

    ngOnInit(): void {
      this.shoppingCart$ = merge(
        this.stateService.select(state => state.activeOrderId),
      ).pipe(
          switchMap(() => this.activeService.activeOrder$),
          shareReplay(1),
      );

      this.shoppingCart$.subscribe(data => { this.loading = false; })
    }

    increment(item: CartFragment['lines'][number]) {
      this.adjustItemQuantity(item.id, item.quantity + 1);
    }

    decrement(item: CartFragment['lines'][number]) {
      if (item.quantity < 1) {
        this.removeItem(item.id);
      } else {
        this.adjustItemQuantity(item.id, item.quantity - 1);
      }
    }

    removeItem(id: string) {
      this.dataService.mutate<RemoveItemFromCartMutation, RemoveItemFromCartMutationVariables>(REMOVE_ITEM_FROM_CART, {
          id,
      }).pipe(
          take(1),
      ).subscribe();
  }

    adjustItemQuantity(id: string, qty: number) {
      this.dataService.mutate<AdjustItemQuantityMutation, AdjustItemQuantityMutationVariables>(ADJUST_ITEM_QUANTITY, {
          id,
          qty,
      }).pipe(
          take(1),
      ).subscribe(({ adjustOrderLine }) => {
          switch (adjustOrderLine.__typename) {
              case 'Order':
                  break;
              case 'InsufficientStockError':
              case 'NegativeQuantityError':
              case 'OrderLimitError':
              case 'OrderModificationError':
                  break;
          }
      });
  }
}
