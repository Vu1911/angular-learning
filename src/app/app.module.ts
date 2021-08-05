import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppLoginComponent } from './components/app-login/app-login.component';
import { AppSignupComponent } from './components/app-signup/app-signup.component';
import { UsersDashboardComponent } from './components/users-dashboard/users-dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { UsersTableComponent } from './components/users-dashboard/users-table/users-table.component';
import { UsersFormComponent } from './components/users-dashboard/users-form/users-form.component';
import { AdminGuard } from './services/authGuard.service';
import { AccountSerivice } from './services/account.service';

const appRoute: Routes = [
  { path: "home", component: HomepageComponent},
  { path: "signup", component: AppSignupComponent},
  { path: "login", component: AppLoginComponent},
  { path: "users", canActivate: [AdminGuard], component: UsersDashboardComponent},
  { path: "**", redirectTo: '/login'}
]

@NgModule({
  declarations: [
    AppComponent,
    AppLoginComponent,
    AppSignupComponent,
    UsersDashboardComponent,
    HomepageComponent,
    UsersTableComponent,
    UsersFormComponent,

  ],
  imports: [
    BrowserModule, 
    ReactiveFormsModule,
    RouterModule.forRoot(appRoute)
  ],
  providers: [AccountSerivice, AdminGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
