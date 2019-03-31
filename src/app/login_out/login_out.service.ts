import { Injectable, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {User} from './user.modle';
import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable()
export class LoginoutService {
   private token: string;
   private userstatus = new Subject<boolean>();
   public email: string;

   constructor(private httpclient: HttpClient, private route: ActivatedRoute,
    private router: Router) {}


  getToken() {
    return this.token;
  }
  getuserstatus() {
  return this.userstatus.asObservable();
  }
getemail() {
  return this.email;
}
  creatUser(tempuser: User) {
    console.log(tempuser.password);
    this.httpclient.post('http://localhost:3000/user/signup', tempuser)
    .subscribe(res => {
      console.log(res);
    });
  }
  checkUser(tempuser: User) {
this.httpclient.get<{message: string}>('http://localhost:3000/user/' + tempuser.email)
.subscribe(res => {
  console.log(res.message);
  if (res.message === 'Yes') {
    alert('User exists');
  } else {
    this.creatUser(tempuser);
    alert('User Added!!');

  }

});
  }

  login(email: string, password: string) {
    this.email = email;
    const user = new User(email, password);
    this.httpclient.post<{token: string, message: string}>('http://localhost:3000/user/login', user)
    .subscribe(result => {
      console.log('result: ' + result.token);
      window.alert( result.message);
        const tok = result.token;
        this.token = tok;
        this.userstatus.next(true);
        this.router.navigate(['/'] , {relativeTo: this.route});
     });

    }



logout() {
this.email = undefined;
this.token = null;
this.userstatus.next(false);
this.router.navigate(['/login'] , {relativeTo: this.route});

}
}
