import { FormGroup, ValidatorFn } from '@angular/forms';

export function PasswordMatchValidator(password: string, confirmPassword: string): ValidatorFn {
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
