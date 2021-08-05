import { Injectable } from "@angular/core";
import { AbstractControl } from "@angular/forms";
import { Observable } from "rxjs";
import { IAccount } from "../interfaces/account.interface";
import { AccountStatus, Role } from "../interfaces/accountEnum";

@Injectable({providedIn: 'platform'})
export class AccountSerivice {
    accounts: [IAccount?] = []

    currentAccount: IAccount = { id: 0,
                                 username: 'default',
                                 email: "default",
                                 password: "default",
                                 role: "user", 
                                 status: "deactivated"
    };
    
    
    // *** get service section ***
    getAllAccounts() : Observable<[IAccount?]> {
        return new Observable((observer) => {
            setTimeout(() => {
                observer.next(this.accounts)
            }, 1500)
        })
    }

    getAccountById(id: number) : Observable<IAccount>{
        return new Observable((observer) => {
            setTimeout(() => {
                observer.next(this.accounts.find(account => account!.id === id))
            }, 1500)
        })
    }

    getAccountByUsername(username: string) : Observable<IAccount>{
        return new Observable((observer) => {
            setTimeout(() => {
                observer.next(this.accounts.find(account => account!.username === username))
            }, 1500)
        })
    }

    getCurrentUser() : Observable<IAccount>{
        return new Observable((observer) => {
            observer.next(this.currentAccount)
        })
    }


    // *** add service section ***
    addAccount(newAccount: IAccount) : Observable<any> {
        this.accounts.push(newAccount)
        this.currentAccount = newAccount
        return new Observable((observer) => {
            setTimeout(() => {
                observer.next(newAccount)
            }, 1500)
        })
    }

    updateAccount(username: string, updatedAccount : IAccount) : Observable<IAccount>{
        this.accounts[this.accounts.findIndex(account => account?.username === username)] = updatedAccount;
        
        if(this.currentAccount.username == username){
            this.currentAccount = updatedAccount
        }
        
        return new Observable((observer) => {
            observer.next(updatedAccount)
        })
    }

    // *** special service section ***
    login(loginRequest: {username: string, password: string}) : Observable<boolean> {
        let loginSuccess = false
        let user = this.accounts.find(account => account?.username == loginRequest.username)
        if (user){
            if(user.password === loginRequest.password){
                if(user.status === AccountStatus.ACTIVATED){
                    this.currentAccount = user
                    loginSuccess = true
                }
                
            }
        }

        return new Observable((observer) => {
            setTimeout(()=> {
                observer.next(loginSuccess)
            }, 1500)
        })
    }

    logout() : Observable<boolean> {
        this.currentAccount = { id: 0,
            username: 'default',
            email: "default",
            password: "default",
            role: "user", 
            status: "deactivated"
        };
        return new Observable((observer) => {
            setTimeout(()=>{
                observer.next(true)
            }, 1500)
            
        })
    }


    // *** validation service section ***

    // this service is only used for form control element
    checkUsernameFormDuplication(control: AbstractControl) : Promise<any> {
        let isDuplicated = (this.accounts.find(account => account?.username === control.value)) ? true : false
        console.log(control.value)
        console.log(control.errors)
        return new Promise((resolve, reject) => {
             setTimeout(() => {
                if (isDuplicated) {
                    resolve({'isUsernameDuplicated': true})
                } else {
                    resolve(null)
                }
                
             },1500)
         })
    }

    checkUsernameDuplication(username: string) : Observable<boolean> {
        let isDuplicated = (this.accounts.find(account => account?.username === username)) ? true : false
        
        return new Observable((observer) => {
             setTimeout(() => {
                 observer.next(isDuplicated)
             },1500)
         })
    }

    checkEmailFormDuplication(control: AbstractControl) : Promise<any> {
        let isDuplicated = (this.accounts.find(account => account?.email === control.value)) ? true : false
        
        return new Promise((resolve, reject) => {
             setTimeout(() => {
                if (isDuplicated) {
                    resolve({'isEmailDuplicated': true})
                } else {
                    resolve(null)
                }
                
             },1500)
         })
    }

    checkEmailDuplication(email: string) : Observable<boolean> {
        let isDuplicated = (this.accounts.find(account => account?.email === email)) ? true : false
        
        return new Observable((observer) => {
             setTimeout(() => {
                 observer.next(isDuplicated)
             })
         })
    }

    checkIsAdmin(): Promise<boolean>{
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(this.currentAccount.role === Role.ADMIN)
            }, 1500)
        })
    }
}