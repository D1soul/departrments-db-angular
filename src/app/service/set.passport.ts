import {FormGroup} from '@angular/forms';

export function SetPassport(passportForm: FormGroup, seriesF : string, seriesS: string, number: string) {
  return 'Серия: ' + passportForm.get(seriesF).value + ' '
    + passportForm.get(seriesS).value + ' Номер: '
    + passportForm.get(number).value;
}
