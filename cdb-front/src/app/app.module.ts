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
import { MatFormFieldModule, MatInputModule, MatButtonModule, MatDividerModule, MatIconModule } from '@angular/material';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TestComponent } from './test/test.component';
import { AuthInterceptor } from './service/basic-auth-interceptor.service';
import {MatPaginatorModule} from '@angular/material/paginator';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ComputersComponent,
    CompaniesComponent,
    TestComponent
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
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    MatPaginatorModule,
    MatInputModule,
    MatIconModule
  ],
  providers: [
    PageService,
    SortService,
    FilterService,
    EditService,
    ToolbarService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
