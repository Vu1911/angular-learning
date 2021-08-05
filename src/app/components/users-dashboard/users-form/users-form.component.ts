import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IAccount } from 'src/app/interfaces/account.interface';
import { AccountStatus, Role } from 'src/app/interfaces/accountEnum';
import { AccountSerivice } from 'src/app/services/account.service';

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.css']
})
export class UsersFormComponent implements OnInit, OnChanges {
  roles = Object.values(Role)
  status = Object.values(AccountStatus)
  @Input() username: string = ""
  @Output() isShowUserform = new EventEmitter<boolean>()
  userForm: FormGroup = new FormGroup({});

  chosenUser: IAccount = {
    id: 0,
    username: "",
    email: "",
    password: "",
    role: "",
    status: ""
  }

  constructor(private accountService: AccountSerivice) { }

  ngOnInit(): void {
    this.userForm = new FormGroup({
      'username': new FormControl(
        null, 
        [], 
        [this.accountService.checkUsernameFormDuplication.bind(this.accountService)]),
      'email': new FormControl(
        null, 
        [Validators.email],
        [this.accountService.checkEmailFormDuplication.bind(this.accountService)]),
      'role': new FormControl(),
      'status': new FormControl()
    })
  }

  ngOnChanges(){
    this.accountService.getAccountByUsername(this.username).subscribe((user) => {
      this.chosenUser = user
    })
  }

  onSubmit(){
    this.userForm.value["hack"] = "hack info"
    let oldUsername = this.chosenUser.username
    let chosenAccount = JSON.parse(JSON.stringify(this.chosenUser))
    Object.keys(chosenAccount).map((key) => {
      if(this.userForm.value[key]){
        chosenAccount[key] = this.userForm.value[key]
      }
    })

    this.accountService.updateAccount(oldUsername, chosenAccount).subscribe((updatedAccount) => {
      console.log(updatedAccount)
      this.chosenUser = {
        id: 0,
        username: "",
        email: "",
        password: "",
        role: "",
        status: ""
      }
      this.userForm.reset()
      this.isShowUserform.emit(false)
    })


  }

}
