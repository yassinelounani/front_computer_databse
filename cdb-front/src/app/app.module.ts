import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import { GridModule, PageService, SortService, FilterService, EditService } from '@syncfusion/ej2-angular-grids';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    GridModule
  ],
  providers: [
    PageService, 
    SortService,
    FilterService,
    EditService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
