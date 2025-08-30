import { Routes } from '@angular/router';
import { EmployeeByDepartmentComponent } from './components/employee-by-department/employee-by-department.component';
 import { AppComponent } from './components/app/app.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { EmployeeSearchComponent } from './components/employee-search/employee-search.component';

export const routes: Routes = [    
    {path:'',component:EmployeeSearchComponent},
    
    { path: 'employees/:departmentId', component: EmployeeByDepartmentComponent },
    { path: 'employee/:id', component: EmployeeComponent }
];
