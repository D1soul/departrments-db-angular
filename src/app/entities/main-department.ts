export class MainDepartment {
  id: number;
  name: string;
  employees: Array<{lastName: string, firstName: string, middleName: string}>;
  subDepartments: Array<{name: string}>;
}
