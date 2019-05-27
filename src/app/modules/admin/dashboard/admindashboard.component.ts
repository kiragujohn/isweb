import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user/user.service';


@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html'
})

export class AdmindashboardComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  isLoggedIn() {
   if (this.userService.authorities === undefined) {
     return false;
    }
   return this.userService.isLoggedIn();
  }
}
