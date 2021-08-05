import { Component, Input, OnInit } from '@angular/core';
import { IAccount } from 'src/app/interfaces/account.interface';
import { AccountSerivice } from 'src/app/services/account.service';

@Component({
  selector: 'users-dashboard',
  templateUrl: './users-dashboard.component.html',
  styleUrls: ['./users-dashboard.component.css']
})
export class UsersDashboardComponent implements OnInit {
  accounts: [
    IAccount?
  ] = []

  chosenUsername = ""

  isShowUserForm = false

  constructor(private accountService: AccountSerivice) { }

  ngOnInit(): void {
    this.accountService.getAllAccounts().subscribe((allAccounts) => {
      this.accounts = allAccounts
    })
  }

  onGetAccount(chosenUsername: string){
    this.chosenUsername = chosenUsername
    this.isShowUserForm = true
  }
  
  closeUserForm(isShow: boolean){
    this.isShowUserForm = isShow
  }

}
