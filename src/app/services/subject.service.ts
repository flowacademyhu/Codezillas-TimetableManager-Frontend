import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subject } from '../models/subject.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  private subjectListUrl = '/subjects/';

  constructor(private httpClient: HttpClient) { }

  getSubjects(): Observable<Subject[]> {
    return this.httpClient.get<Subject[]>(this.subjectListUrl);
  }

  getMentors(id) {
    return this.httpClient.get<User[]>(`${this.subjectListUrl}/${id}/users`);
  }

  addNewSubject(subject) {
    return this.httpClient.post<Subject>(this.subjectListUrl, subject);
  }

  delete(id) {
    return this.httpClient.delete<Subject>(`${this.subjectListUrl}/${id}`);
  }
}
