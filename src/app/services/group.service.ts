import { Injectable } from '@angular/core';
import { Group } from '../models/group.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class GroupService {
  groups: Group[];
  private groupListUrl = 'http://localhost:8080/groups';

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Group[]> {
    return this.httpClient.get<Group[]>(this.groupListUrl);
  }
}
