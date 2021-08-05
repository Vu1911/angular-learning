import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { interval, Observable, Observer } from 'rxjs';
import { IAccount } from './interfaces/account.interface';
import { AccountSerivice } from './services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  currentUser: IAccount = { id: 0,
    username: 'default',
    email: "default",
    password: "default",
    role: "user", 
    status: "deactivated"
  };

  isLogin = false

  title = 'angular-learning';

  constructor(private accountService: AccountSerivice, private router: Router) { }


  ngOnInit(){
    this.accountService.getCurrentUser().subscribe((currentUser : IAccount) => {
      if (currentUser.id != 0){
        this.currentUser = currentUser
        this.isLogin = true
      } else {
        this.isLogin = false
      }
    })
  }

  logout(){
    this.accountService.logout().subscribe((isLogout : boolean) => {
      this.isLogin = !isLogout
      this.router.navigate(['/home'])
    })
  }
}
