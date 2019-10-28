import {FormControl, ValidatorFn} from "@angular/forms";

// custom validator used in abstract. CAN SAVE FUNCTION IN VARIABLE, then the inital function just returns a variable
export function restrictedWords(words): ValidatorFn { // pass an array of restricted words to the custom validator
  return (control: FormControl) => { // the initial function returns a function
    if (!words) {
      return null; // the validator passes with null (noop)
    }

    let invalidWords = words // get the invalid words that are present in the text
      .map(w => control.value.includes(w) ? w : null)
      .filter(w => w != null);

    // the function returns an object that has the name of the validator as key and all invalid words as value
    return invalidWords && invalidWords.length > 0 ? {'restrictedWords': invalidWords.join(', ')} : null;
  }
}
