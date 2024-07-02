import { Component, OnInit } from '@angular/core';
import User from '../../../shared/models/User';
import { UserService } from '../../../core/services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css'
})
export class UserManagementComponent implements OnInit {
  constructor(private service:UserService){}
  ngOnInit(){
  this.fetchUsers()
  }
users:User[] = []


fetchUsers(){
this.service.getAllUsers().subscribe((res)=>{
  this.users = res
})
}
}
