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
    component: ComputersComponent
  },
  {
    path: 'companies',
    component: CompaniesComponent,
    canActivate: [ IsSignedInService]
  },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
