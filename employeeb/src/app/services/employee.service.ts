import { Injectable } from '@angular/core';
import { Employee } from '../models/employee.resource';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  // Use BehaviorSubject to hold the employees array
  private employeesSubject = new BehaviorSubject<Employee[]>( 
    [
      { id: 1, name: 'Alice Smith', email: 'alice.smith@example.com', phone: '1234567890', departmentId: 'HR', position: 'Manager', dateOfJoining: new Date('2018-01-15') },
      { id: 2, name: 'Bob Johnson', email: 'bob.johnson@example.com', phone: '1234567891', departmentId: 'HR', position: 'Executive', dateOfJoining: new Date('2019-03-12') },
      { id: 3, name: 'Carol Williams', email: 'carol.williams@example.com', departmentId: 'HR2', position: 'Developer', dateOfJoining: new Date('2020-06-25') },
      { id: 4, name: 'David Brown', email: 'david.brown@example.com', phone: '1234567893', departmentId: 'HR2', position: 'Developer', dateOfJoining: new Date('2021-07-30') },
      { id: 5, name: 'Eve Davis', email: 'eve.davis@example.com', phone: '1234567894', departmentId: 'HR', position: 'Coordinator', dateOfJoining: new Date('2017-09-18') },
      { id: 6, name: 'Frank Miller', email: 'frank.miller@example.com', departmentId: 'HR2', position: 'Lead Developer', dateOfJoining: new Date('2016-11-05') },
      { id: 7, name: 'Grace Wilson', email: 'grace.wilson@example.com', phone: '1234567897', departmentId: 'HR', position: 'HR Specialist', dateOfJoining: new Date('2020-02-20') },
      { id: 8, name: 'Hank Moore', email: 'hank.moore@example.com', departmentId: 'HR2', position: 'QA Engineer', dateOfJoining: new Date('2019-10-10') },
      { id: 9, name: 'Ivy Taylor', email: 'ivy.taylor@example.com', phone: '1234567899', departmentId: 'HR', position: 'Assistant', dateOfJoining: new Date('2021-01-12') },
      { id: 10, name: 'Jack Anderson', email: 'jack.anderson@example.com', departmentId: 'HR2', position: 'DevOps Engineer', dateOfJoining: new Date('2018-12-22') },
      { id: 11, name: 'Kate Thomas', email: 'kate.thomas@example.com', phone: '1234567810', departmentId: 'HR', position: 'Manager', dateOfJoining: new Date('2017-04-01') },
      { id: 12, name: 'Leo Jackson', email: 'leo.jackson@example.com', departmentId: 'HR2', position: 'Developer', dateOfJoining: new Date('2020-08-15') },
      { id: 13, name: 'Mia White', email: 'mia.white@example.com', phone: '1234567813', departmentId: 'HR', position: 'Coordinator', dateOfJoining: new Date('2019-05-20') },
      { id: 14, name: 'Nate Harris', email: 'nate.harris@example.com', departmentId: 'HR2', position: 'Developer', dateOfJoining: new Date('2021-03-10') },
      { id: 15, name: 'Olivia Martin', email: 'olivia.martin@example.com', phone: '1234567816', departmentId: 'HR', position: 'Assistant', dateOfJoining: new Date('2018-07-07') },
      { id: 16, name: 'Paul Lee', email: 'paul.lee@example.com', departmentId: 'HR2', position: 'Lead Developer', dateOfJoining: new Date('2016-09-30') },
      { id: 17, name: 'Quinn Perez', email: 'quinn.perez@example.com', phone: '1234567819', departmentId: 'HR', position: 'HR Specialist', dateOfJoining: new Date('2020-11-02') },
      { id: 18, name: 'Rita Scott', email: 'rita.scott@example.com', departmentId: 'HR2', position: 'QA Engineer', dateOfJoining: new Date('2019-01-28') },
      { id: 19, name: 'Sam Young', email: 'sam.young@example.com', phone: '1234567822', departmentId: 'HR', position: 'Manager', dateOfJoining: new Date('2017-06-14') },
      { id: 20, name: 'Tina King', email: 'tina.king@example.com', departmentId: 'HR2', position: 'Developer', dateOfJoining: new Date('2021-09-05') },
    ]
    
  );

  // Observable for all employees
  public employees$ = this.employeesSubject.asObservable();

  /** Get employees by department */
  public getEmployeeByDepartment(departmentId: string): Observable<Employee[]> {
    return this.employees$.pipe(
      map(employees => employees.filter(e => e.departmentId === departmentId))
    );
  }

  /** Get a single employee by ID */
  public getAEmployeeById(employeeId: number): Observable<Employee> {
    return this.employees$.pipe(
      map(employees => {
        const emp = employees.find(e => e.id === employeeId);
        if (!emp) {
          throw new Error(`Employee with ID ${employeeId} not found`);
        }
        return emp;
      })
    );
  }

  /** Delete an employee by ID */
  public deleteAEmployeeById(employeeId: number): void {
    const updated = this.employeesSubject.value.filter(e => e.id !== employeeId);
    this.employeesSubject.next(updated); // notify all subscribers
  }

  /** Optional: add new employee */
  public addEmployee(emp: Employee): void {
    const updated = [...this.employeesSubject.value, emp];
    this.employeesSubject.next(updated);
  }
}
