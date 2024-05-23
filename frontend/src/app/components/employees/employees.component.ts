import { Component, OnInit } from '@angular/core';

import { EmployeeService } from '../../services/employee.service'
import { NgForm } from '@angular/forms';
import { Employee } from 'src/app/models/employee';

declare var M: any;


@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
  providers: [EmployeeService]
})
export class EmployeesComponent implements OnInit {

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.getEmployees();
  }

  addEmployee(form: NgForm){
    if(form.value._id) {
      this.employeeService.putEmployee(form.value)
        .subscribe(res => {
          this.resetForm(form);
          M.toast({html: 'Update Successfuly'});
          this.getEmployees();
        })
    } else {
      this.employeeService.postEmployee(form.value)
      .subscribe(res => {
        this.resetForm(form);
        M.toast({html: 'Save Successfuly'});
        this.getEmployees();
      });
    }
  }



  getEmployees(){
    this.employeeService.getEmployees()
      .subscribe(res => {
        this.employeeService.employees = res as Employee[];
        console.log(res);
      })
  }

  editEmployee(employee: Employee){
    this.employeeService.selectedEmployee = employee;
    //this.employeeService.putEmployee()

  }

  deleteEmployee(_id: string) {
    if (confirm('Are you suere you want to delete it?')) {
      this.employeeService.deleteEmployee(_id)
        .subscribe(res => {
          this.getEmployees();
          M.toast({html: 'Deleted Successfuly'});
        });
    }
  }

  resetForm(form?: NgForm){
    if (form) {
      form.reset();
      this.employeeService.selectedEmployee = new Employee();
    }

  }

}
