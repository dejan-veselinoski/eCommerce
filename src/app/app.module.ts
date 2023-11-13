import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_BASE_HREF } from '@angular/common';
import { APOLLO_CLIENT_PROVIDER } from './shared/providers/apollo-client-provider';
import { DefaultInterceptor } from './interceptors/default.interceptor';
import { environment } from 'src/environments/environment';
import { StoreModule } from '@ngrx/store';
import { MaterialModule } from './shared/material.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    StoreModule.forRoot({}),
    MaterialModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: DefaultInterceptor, multi: true },
    { provide: APP_BASE_HREF, useValue: environment.baseHref },
        APOLLO_CLIENT_PROVIDER,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
