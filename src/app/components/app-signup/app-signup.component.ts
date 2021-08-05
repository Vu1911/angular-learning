import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IAccount } from 'src/app/interfaces/account.interface';
import { AccountStatus, Role } from 'src/app/interfaces/accountEnum';
import { AccountSerivice } from 'src/app/services/account.service';

@Component({
  selector: 'app-signup',
  templateUrl: './app-signup.component.html',
  styleUrls: ['./app-signup.component.css']
})
export class AppSignupComponent implements OnInit {
  roles = Object.values(Role);
  signupForm: FormGroup = new FormGroup({});
  isSignupSuccess = false

  constructor(private accountService: AccountSerivice, private router: Router) { }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'username': new FormControl(
        null, 
        [Validators.required], 
        [this.accountService.checkUsernameFormDuplication.bind(this.accountService)]),
      'email': new FormControl(
        null, 
        [Validators.required, 
          Validators.email],
        [this.accountService.checkEmailFormDuplication.bind(this.accountService)]),
      'role': new FormControl(Role.USER),
      'password': new FormControl(null, [Validators.required, Validators.minLength(8)])
    })
  }

  onSubmit(){
    this.signupForm.value['status'] = AccountStatus.ACTIVATED
    console.log(this.signupForm.value)
    this.accountService.addAccount(this.signupForm.value).subscribe((newAccount) => {
        console.log(newAccount);
        this.isSignupSuccess = true
        this.signupForm.reset();
        this.router.navigate(['/home'])
    })
  }

  
}
