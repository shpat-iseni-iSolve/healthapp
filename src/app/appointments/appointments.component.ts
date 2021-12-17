import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { User } from '../_models';
import { AccountService } from '../_services';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { stringify } from 'querystring';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {
  users = null;
  selectedUser: User = null;
  todo = [];
  prescription = [];
  _prescription = [];

  constructor(public accountService: AccountService) {
  }
  
  ngOnInit() {
    this.accountService.getPrescription()
    .subscribe(prescription => {
      this.prescription = prescription.results;
      this._prescription = this.prescription;
      console.log('testsetestsettest',this.prescription);
    });
      this.accountService.getAll()
      
          .pipe(first())
          .subscribe(users => this.users = users);
          this.test()
  }
  
  test ( ){

      setTimeout(() => {
      console.log(this.users); 
          
      }, 100);
  }
  showDetails(id:string){
    this.accountService.getById(id).subscribe(data =>{
      this.selectedUser = data;
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this._prescription = this.prescription
    .filter(x => 
      (''+x.brand_name).toLocaleLowerCase().includes(filterValue.toLocaleLowerCase()) || 
      (''+x.generic_name).toLocaleLowerCase().includes(filterValue.toLocaleLowerCase())
      );
  }
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
  
}
