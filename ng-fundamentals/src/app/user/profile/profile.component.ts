import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../auth.service";
import {Toastr, TOASTR_TOKEN} from "../../common/toastr.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileFormGroup;
  private firstName: FormControl;
  private lastName: FormControl;

  constructor(@Inject(TOASTR_TOKEN) private toastr: Toastr, private router: Router, private auth: AuthService) {

  }

  ngOnInit() {
    this.firstName = new FormControl(this.auth.currentUser.firstName, [Validators.required, Validators.pattern('[a-zA-Z].*')]);
    this.lastName = new FormControl(this.auth.currentUser.lastName, Validators.required);
    this.profileFormGroup = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName
    });
  }

  cancel() {
    this.router.navigate(['events']);
  }

  profileSave(profileValues) {
    if (this.profileFormGroup.valid) {
      this.auth.updateUser(profileValues.firstName, profileValues.lastName).subscribe(() => {
        this.toastr.success('Profile saved!');
        this.router.navigate(['events']);
      });
    }
  }

  isFirstNameValid() {
    return this.firstName.valid || this.firstName.untouched;
  }

  isLastNameValid() {
    return this.lastName.valid || this.lastName.untouched;
  }

  // normally you would just call method on auth service, and it will post to the backend to log out
  logout() {
    this.router.navigate(['/events']);
    this.auth.currentUser = undefined;
  }
}
