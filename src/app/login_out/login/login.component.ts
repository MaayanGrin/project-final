import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginoutService } from '../login_out.service';
import { from, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit,   OnDestroy {

userlog = false;
userlisener: Subscription;

  constructor(private server: LoginoutService, private route: ActivatedRoute,
              private router: Router, private userservice: LoginoutService) {}

  ngOnInit() {
    this.userlisener = this.userservice.getuserstatus()
    .subscribe(islog => {
      console.log(islog);
    this.userlog = islog;
    });
   }
   ngOnDestroy() {
    this.userlisener.unsubscribe();

    }

  login(form: NgForm) {
    if (form.invalid) {
    return;
    }
    this.server.login(form.value.email, form.value.password);
    if (this.userlog) {
      this.router.navigate(['/'] , {relativeTo: this.route});
    } else {
      form.reset();

    }
}


}
