import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { ComputersComponent } from './computers/computers.component';
import { CompaniesComponent } from './companies/companies.component';
import { GridModule, PageService, SortService, FilterService, EditService, ToolbarService } from '@syncfusion/ej2-angular-grids';
import { DropDownListAllModule } from '@syncfusion/ej2-angular-dropdowns';

import {HttpClientModule} from '@angular/common/http';
// @ts-ignore
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ComputersComponent,
    CompaniesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    GridModule,
    DropDownListAllModule,
    BrowserAnimationsModule
  ],
  providers: [
    PageService,
    SortService,
    FilterService,
    EditService,
    ToolbarService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
