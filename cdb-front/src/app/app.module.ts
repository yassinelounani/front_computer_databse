import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { ComputersComponent } from './computers/computers.component';
import { CompanysComponent } from './companys/companys.component';
import { GridModule, PageService, SortService, FilterService, EditService } from '@syncfusion/ej2-angular-grids';

import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ComputersComponent,
    CompanysComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
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
