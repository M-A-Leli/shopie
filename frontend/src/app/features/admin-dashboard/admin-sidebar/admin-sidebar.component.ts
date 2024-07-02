import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import User from '../../../shared/models/User';

@Component({
  selector: 'app-admin-sidebar',

  standalone:true,
  imports:[CommonModule,RouterLink],
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css']
})
export class AdminSidebarComponent implements OnInit {

  user_id:string = 'e1d71522-6cc5-4442-ad51-f668a8f01200';

  profile:User|null = null;

  constructor(private service:UserService){}
  ngOnInit(): void {
//  this.getProfileDetails();
  }

  isCollapsed = false;


  // getProfileDetails(){
  //   this.service.getUserProfile().subscribe((res)=>{
  //      this.profile = res;

  //   })
  // }

  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
  }

}
