import {Role} from './role';

export class User {
  id: number;
  username: string;
  password: string;
  confirmPassword: string;
  birthDate: string;
  gender: string;
  roles: string[];
}
