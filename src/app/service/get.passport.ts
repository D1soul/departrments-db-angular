import {FormGroup} from '@angular/forms';

export function GetPassport(passportForm: FormGroup, seriesF: string, seriesS: string, number: string, passport: string) {
  let birthDateValue = passport.split(' ');
  let seriesFValue = birthDateValue[1];
  let seriesSValue = birthDateValue[2];
  let numberValue = birthDateValue[4];
  passportForm.get(seriesF).setValue(seriesFValue);
  passportForm.get(seriesS).setValue(seriesSValue);
  passportForm.get(number).setValue(numberValue);
}
