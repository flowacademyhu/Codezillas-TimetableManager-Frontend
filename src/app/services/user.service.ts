import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: User[];
  private groupListUrl = '/groups/';
  private userListUrl = '/users/';
  private newUserUrl = '/createuser';

  constructor(private httpClient: HttpClient) { }

  getUsersFromGroup(groupId): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.groupListUrl}${groupId}/users`);
  }

  addNewUser(user, groupId) {
    user.groupId = groupId;
    return this.httpClient.post<User>(this.newUserUrl, user);
  }

  getMentors() {
    return this.httpClient.get<User[]>(this.userListUrl);
  }

  removeFromGroup(user) {
    user.groupId = 0;
    return this.httpClient.post<User>(this.userListUrl, user);
  }
}
