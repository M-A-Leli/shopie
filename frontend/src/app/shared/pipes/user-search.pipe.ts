import { Pipe, PipeTransform } from '@angular/core';
import User from '../models/User';



@Pipe({
  name: 'userSearch',
  standalone: true,
})
export class UserSearchPipe implements PipeTransform {
  transform(users: User[], searchString: string): User[] {
    if (!users || searchString == '') {
      return users;
    }

    let filteredUsers: User[] = [];

    for (let user of users) {
      if (
        user.username.toLowerCase().includes(searchString.toLowerCase()) ||
        user.email.toLowerCase().includes(searchString.toLowerCase())
      ) {
        filteredUsers.push(user);
      }
    }

    return filteredUsers;
  }
}
