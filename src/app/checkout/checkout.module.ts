import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from './checkout.component';
import { SharedModule } from '../shared/shared.module';
import { CheckoutRoutingModule } from './checkout-routing.module';
import { MaterialModule } from '../shared/material.module';



@NgModule({
  declarations: [
    CheckoutComponent
  ],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    SharedModule,
    MaterialModule,
  ]
})
export class CheckoutModule { }
