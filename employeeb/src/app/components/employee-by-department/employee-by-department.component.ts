import { Component, inject, OnInit, signal } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { Employee } from '../../models/employee.resource';
import { CommonModule, DatePipe } from '@angular/common';
 
@Component({
  selector: 'app-employee-by-department',
  imports: [DatePipe, RouterLink,CommonModule,RouterModule],
  templateUrl: './employee-by-department.component.html',
  styleUrl: './employee-by-department.component.css'
})
export class EmployeeByDepartmentComponent implements OnInit {


    private readonly employeeServices =inject(EmployeeService);
    private readonly route = inject(ActivatedRoute);
    employees=signal<Employee[]>([]);
    departmentId=signal<string>("");
  
    ngOnInit(): void {

      const departmentId=this.route.snapshot.paramMap.get('departmentId');
      if(departmentId!=null){ 
        this.departmentId.set(departmentId);
      }
      this.renderEmployees()
    }


  public renderEmployees() {

    console.log("renderEmployees")
     this.employeeServices.getEmployeeByDepartment(this.departmentId())
     .subscribe({
      next:(employees:Employee[])=>this.employees.set(employees),
      error:console.log
     })
     
  }
  public deleteEmployeeById(employeeId: number):void {
    console.log(`deleteEmployeeById${employeeId}`)
    this.employeeServices.deleteAEmployeeById(employeeId);
    
  }
}
