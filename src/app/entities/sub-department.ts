export class SubDepartment {
  id: number;
  name: string;
  employees: Array<{lastName: string, firstName: string, middleName: string}>;
  mainDepartment: string;
}
