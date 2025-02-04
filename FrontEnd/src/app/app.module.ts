import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { AppComponent } from './app.component';
import { AppRoutingModule, routes } from './app-routing.module';
import { LoginComponent } from './views/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RegisterComponent } from './views/register/register.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { AdministratorAuthorization } from './guards/administrator-authorization.guard';
import { HomeOwnerAuthorization } from './guards/homeowner-authorization.guard';
import { NotLoggedOrAdministratorAuthorization } from './guards/notlogged-or-administrator-authorization.guard';
import { CompanyOwnerAuthorization } from './guards/companyowner-authorization.guard';
import { HomeOwnerModule } from './views/homeowner/homeowner.module';
import { NavigationModule } from './components/navigation/navigation.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { ConfirmationDialogModule } from './components/confimation-dialog/confirmation-dialog.module';
import { NotFoundComponent } from './views/notFound/notFound.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RegisterAdminComponent } from './views/administrator/users/register-admin/register-admin.component';
import { ViewPhotosDialogComponent } from './components/view-photos-dialog/view-photos-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NotFoundComponent,
    RegisterAdminComponent,
    ViewPhotosDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatRadioModule,
    MatSelectModule,
    MatOptionModule,
    MatIconModule,
    MatCheckboxModule,
    NavigationModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ConfirmationDialogModule,
    MatProgressBarModule,
  ],
  providers: [
    AdministratorAuthorization,
    HomeOwnerAuthorization,
    NotLoggedOrAdministratorAuthorization,
    CompanyOwnerAuthorization,
  ],
  exports: [RegisterComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
