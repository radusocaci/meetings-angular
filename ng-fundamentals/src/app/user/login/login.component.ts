import {Component} from '@angular/core';
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  userName;
  password;
  mouseOverLogin;
  loginInvalid = false;

  constructor(private auth: AuthService, private router: Router) {

  }

  login(loginValues) {
    this.auth.loginUser(loginValues.userName, loginValues.password)
      .subscribe(rsp => {
        if (!rsp) {
          this.loginInvalid = true;
        } else {
          this.router.navigate(['events']);
        }
      });
  }

  cancel() {
    this.router.navigate(['events']);
  }
}
