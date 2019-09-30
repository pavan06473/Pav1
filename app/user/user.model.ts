export class User {
  public empId: number;
  public firstName: string;
  public lastName: string;
  public userId: number;
  

  constructor(empId: number, firstName: string, lastName: string, userId: number) {
    this.empId = empId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.userId = userId;

  }
}
