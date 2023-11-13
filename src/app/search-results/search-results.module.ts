import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchResultsComponent } from './search-results.component';
import { SearchResultsRoutingModule } from './search-results-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../shared/material.module';



@NgModule({
  declarations: [
    SearchResultsComponent
  ],
  imports: [
    CommonModule,
    SearchResultsRoutingModule,
    SharedModule,
    MaterialModule,
  ]
})
export class SearchResultsModule { }
