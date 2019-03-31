import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginoutService } from '../login_out.service';
import { User } from '../user.modle';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private server: LoginoutService, private route: ActivatedRoute,
    private router: Router) {}
  ngOnInit() {
  }

  signup(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    const newuser = new User(email, password);
    this.server.checkUser(newuser);
    this.router.navigate(['/login'] , {relativeTo: this.route});


  }
}
