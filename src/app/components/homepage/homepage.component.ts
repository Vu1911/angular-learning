import { Component, OnInit } from '@angular/core';
import { IAccount } from 'src/app/interfaces/account.interface';
import { AccountSerivice } from 'src/app/services/account.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  currentUser: IAccount = { id: 0,
    username: 'default',
    email: "default",
    password: "default",
    role: "user",
    status: "deactivated"
  };

  username = ""


  constructor(private accountService: AccountSerivice) { }

  ngOnInit(): void {
    this.accountService.getCurrentUser().subscribe((currentUser) => {
      this.currentUser = currentUser
      
      if (this.currentUser.id === 0){
        this.username = "stranger"
      } else {
        this.username = this.currentUser.username
      }

      console.log(this.username)
    })
  }

  getCurrentUser(){
    
  }

}
