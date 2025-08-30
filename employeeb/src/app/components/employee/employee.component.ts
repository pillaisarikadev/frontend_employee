import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employee } from '../../models/employee.resource';
import { EmployeeService } from '../../services/employee.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-employee',
  imports: [DatePipe],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit{
  private readonly employeeServices =inject(EmployeeService);
  private readonly route = inject(ActivatedRoute);
  employee=signal<Employee|undefined>(undefined);


  ngOnInit(): void {
    const departmentId = this.route.snapshot.paramMap.get('id');
    if(departmentId==null){
      throw Error("department id must to provided")
    }
    this.renderEmployees(Number(departmentId));
  }


public renderEmployees(employeeId: number ) {
   this.employeeServices.getAEmployeeById(employeeId)
   .subscribe({
    next:(employee:Employee)=>this.employee.set(employee),
    error:(error:Error)=>alert(error.message)
   })
   
}
}
