import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { IsSignedInService } from './service/is-signed-in.service';
import { ComputersComponent } from './computers/computers.component';
import { CompaniesComponent } from './companies/companies.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'computers',
    component: ComputersComponent,
    canActivate: [ IsSignedInService ]
  },
  {
    path: 'companies',
    component: CompaniesComponent,
    canActivate: [ IsSignedInService]
  },
  {
    path:'**',
    redirectTo:'computers'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
