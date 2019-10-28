import {Directive} from '@angular/core';
import {AbstractControl, FormGroup, NG_VALIDATORS, ValidationErrors, Validator} from "@angular/forms";

@Directive({
  selector: '[validate-location]',
  providers: [
    // multi needed for PUSH instead of OVERWRITE
    {provide: NG_VALIDATORS, useExisting: LocationValidatorDirective, multi: true} // NEED TO REGISTER IT AS VALIDATOR. CAN BE
                                                                                   // INJECTED IN CHILD COMPONENTS
  ]
})
export class LocationValidatorDirective implements Validator {

  constructor() {
  }

  validate(control: AbstractControl): ValidationErrors | null {
    let address = control.get('address');
    let city = control.get('city');
    let country = control.get('country');
    // need to go up 1 level, since directive is applied on location => location is the inital formgroup. OnlineUrl
    // is sibling of location, so we need the parent of location and cast it to FormGroup.
    let onlineUrl = (<FormGroup>control.root).get('onlineUrl');

    let validLocation = address && address.value && city && city.value && country && country.value;
    let validUrl = onlineUrl && onlineUrl.value;

    return validLocation || validUrl
      ? null
      : {validateLocation: false};
  }
}
