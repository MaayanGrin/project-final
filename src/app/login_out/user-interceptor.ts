import {HttpInterceptor, HttpRequest, HttpHandler} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginoutService } from './login_out.service';

@Injectable()

export class UserInterceptor {

constructor(private userservice: LoginoutService) {}

intercept(req: HttpRequest<any>, next: HttpHandler) {
const userToken = this.userservice.getToken();
const userRrequest = req.clone({
  headers: req.headers.set('Authorization', 'Bearer ' + userToken)
});
return next.handle(userRrequest);
}
}
