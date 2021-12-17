import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { User } from '../_models';
import { AccountService } from '../_services';

@Component({
  selector: 'app-appointments',
  templateUrl: './makeAppointments.component.html',
  styleUrls: ['./makeAppointments.component.css']
})
export class MakeAppointmentsComponent implements OnInit {
  users = null;
  selectedUser: User = null;
  datePicker : any
  constructor(public accountService: AccountService) {
      
  }
  
  id:any;
  ngOnInit() {
    this.id = this.accountService.userValue._id;
    console.log(this.id);
    this.showDetails(this.id);
      this.accountService.getById(this.id).subscribe(data =>{
        this.selectedUser = data;
      });
    
    
      // this.accountService.getAll()     
      //     .pipe(first())
      //     .subscribe(users => this.users = users);
      //     this.test()
  }
  test ( ){

      setTimeout(() => {
      console.log(this.users); 
          
      }, 100);
  }
  showDetails(id:string){
    console.log(id);
    this.accountService.getById(id).subscribe(data =>{
      this.selectedUser = data;
    });
  }

    makeAppointment(id ,selectedUser){
      console.log("ktauuuuuu");
      
      selectedUser.appointment = this.datePicker;
      this.accountService.update(id , selectedUser).subscribe( x => console.log(x))
      
    }

  
}
