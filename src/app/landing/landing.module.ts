import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing.component';
import { LandingRoutingModule } from './landing-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ApolloModule} from 'apollo-angular';
import { MaterialModule } from '../shared/material.module';

@NgModule({
  declarations: [
    LandingComponent,
  ],
  imports: [
    CommonModule,
    LandingRoutingModule,
    SharedModule,
    ApolloModule,
    MaterialModule,
  ]
})
export class LandingModule { }
