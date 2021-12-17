import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { User } from '../_models';
import { AccountService } from '../_services';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {
  users = null;
  selectedUser: User = null;
  constructor(public accountService: AccountService) {
      
  }
  
  ngOnInit() {
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


  
}
