import {FormGroup} from '@angular/forms';

export function InitDate(dateForm: FormGroup, day: string, month: string, year: string, birthDate: string) {
  let birthDateValue = birthDate.split('/');
  let dayValue = birthDateValue[0];
  let monthValue = birthDateValue[1];
  let yearValue = birthDateValue[2];
  dateForm.get(day).setValue(dayValue);
  dateForm.get(month).setValue(monthValue);
  dateForm.get(year).setValue(yearValue);
}
