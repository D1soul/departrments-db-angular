import {FormGroup} from '@angular/forms';

export function SetBirthDate(dateForm: FormGroup, day: string, month: string, year: string) {
  return dateForm.get(day).value + '/'
    + dateForm.get(month).value + '/'
    + dateForm.get(year).value;
}
