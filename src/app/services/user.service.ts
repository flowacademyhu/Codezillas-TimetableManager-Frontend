import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: User[];
  private groupListUrl = 'http://localhost:8080/groups';
  private userListUrl = 'http://localhost:8080/users';
  private newUsertUrl = 'http://localhost:8080/createUser';

  constructor(private httpClient: HttpClient) { }

  getUsersFromGroup(groupId, groupName): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.groupListUrl}`, { params: { id: groupId, name: groupName } });
  }

  addNewUser(user, groupId) {
    user.groupId = groupId;
    return this.httpClient.post<User>(this.newUsertUrl, user);
  }

  getMentors() {
    return this.httpClient.get<User[]>(this.userListUrl);
  }

  delete(id) {
    return this.httpClient.delete<User>(`${this.userListUrl}/${id}`);
  }
}
