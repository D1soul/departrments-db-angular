import {ElementRef} from '@angular/core';
import {FormGroup} from '@angular/forms';

export function GetElementOnFocus (elementRef: ElementRef){
 // console.log((this.elementRef.nativeElement).getElementsByTagName('input'));
 // setTimeout(()=> {

  let nameFocus: string;
    // }, 100)

    let elements = [].slice.call((elementRef.nativeElement).getElementsByTagName('input'));

    elements.forEach(element => {
      element.addEventListener('focus', () => {
        setTimeout(() => {


        nameFocus = element.id;


        }, 100);
        console.log(nameFocus);
      });

      /*    element.addEventListener('blur', () => {
            name = '';
            console.log('lostName   ' + name);
          }) */
    });

    setTimeout(() => {
      console.log(nameFocus);
      return nameFocus;
    }, 50);

}


/*
return (matchForm: FormGroup) => {
  const passwordValue  = matchForm.get(password);
  const confirmPasswordValue = matchForm.get(confirmPassword);

  if (confirmPasswordValue.errors && !confirmPasswordValue.errors.notEqual) {
    return;
  }

  if (passwordValue.value !== confirmPasswordValue.value) {
    confirmPasswordValue.setErrors({ notEqual: true });
  } else {
    confirmPasswordValue.setErrors(null);
  }
  return null;
}
}
*/
