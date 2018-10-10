import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: User[];
  private userListUrl = 'http://localhost:8080/groups';
  constructor(private httpClient: HttpClient) { }

  getAll(groupId, groupName): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.userListUrl}/${groupId}/${groupName}`);
  }
}
