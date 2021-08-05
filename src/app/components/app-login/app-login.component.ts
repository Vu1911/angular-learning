import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountSerivice } from 'src/app/services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './app-login.component.html',
  styleUrls: ['./app-login.component.css']
})
export class AppLoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({})
  constructor(private accountService : AccountSerivice, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'username': new FormControl(null, [Validators.required]),
      'password': new FormControl(null, [Validators.required])
    })
  }

  onSubmit(){
    this.accountService.login(this.loginForm.value).subscribe((isLoginSuccess : boolean) => {
      this.loginForm.reset();
      if(isLoginSuccess){
        this.router.navigate(['/home'])
      } else {
        alert("who are u?")
      }

    })
  }

}
