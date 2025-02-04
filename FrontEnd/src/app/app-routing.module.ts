import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { HomeOwnerAuthorization } from './guards/homeowner-authorization.guard';
import { CompanyOwnerAuthorization } from './guards/companyowner-authorization.guard';
import { NotLoggedAuthorization } from './guards/notlogged-authorization';
import { NotLoggedOrAdministratorAuthorization } from './guards/notlogged-or-administrator-authorization.guard';
import { NgModule } from '@angular/core';
import { AdministratorAuthorization } from './guards/administrator-authorization.guard';
import { NotFoundComponent } from './views/notFound/notFound.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NotLoggedAuthorization],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [NotLoggedOrAdministratorAuthorization],
  },
  {
    path: 'companyowner',
    canActivate: [CompanyOwnerAuthorization],
    loadChildren: () =>
      import('./views/companyowner/companyowner.module').then(
        (a) => a.CompanyOwnerModule
      ),
  },
  {
    path: 'administrator',
    canActivate: [AdministratorAuthorization],
    loadChildren: () =>
      import('./views/administrator/administrator.module').then(
        (a) => a.AdministratorModule
      ),
  },
  {
    path: 'homeowner',
    canActivate: [HomeOwnerAuthorization],
    loadChildren: () =>
      import('./views/homeowner/homeowner.module').then(
        (a) => a.HomeOwnerModule
      ),
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
