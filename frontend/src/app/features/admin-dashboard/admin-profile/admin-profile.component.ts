import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import User from '../../../shared/models/User';

@Component({
  selector: 'app-admin-profile',
  standalone: true,
  imports: [],
  templateUrl: './admin-profile.component.html',
  styleUrl: './admin-profile.component.css'
})
export class AdminProfileComponent implements OnInit {


details:User|null = null;
constructor(private service:UserService){}

ngOnInit(): void {
  // this.getAdminProfileDetails();
  }

// getAdminProfileDetails(){
//   this.service.getUserProfile().subscribe((res)=>{
//      this.details = res;
//   })}

  showUpdateModal(){

  }

  updateAdminProfileDetails(){

  }
}
