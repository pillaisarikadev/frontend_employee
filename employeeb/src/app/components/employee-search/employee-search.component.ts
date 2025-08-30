import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
 

@Component({
  selector: 'app-employee',
  standalone:true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './employee-search.component.html',
  styleUrl: './employee-search.component.css'
})
export class EmployeeSearchComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  searchForm = this.fb.group({
    departmentId: ['', Validators.required]
  });


  onSubmit() {
    if (this.searchForm.valid) {
      const departmentId = this.searchForm.value.departmentId ?? null;
       // navigate to employee/{departmentId}
      console.log(`forward to /employee/${departmentId}"`)
      this.router.navigate(['/employees', departmentId]);
    } else {
      this.searchForm.markAllAsTouched();
    }
  }

}
