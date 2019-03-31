import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginoutService } from '../login_out/login_out.service';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css']
})
export class HeadComponent implements OnInit, OnDestroy {
 userlog = false;
  userlisener: Subscription;
 constructor(private userservice: LoginoutService, private router: Router, private route: ActivatedRoute) { }

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

logoff() {
this.userservice.logout();
// this.router.navigate(['/'] , {relativeTo: this.route});

}
}
