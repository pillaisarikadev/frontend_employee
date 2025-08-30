// employee.model.ts
export interface Employee {
    id: number;               // unique employee id
    name: string;             // full name
    email: string;            // email address
    phone?: string;           // optional phone number
    departmentId: string;     // department identifier
    position?: string;        // optional job title
    dateOfJoining?: Date;     // optional date of joining
  }
  