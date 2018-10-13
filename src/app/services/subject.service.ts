import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subject } from '../models/subject.model';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  private subjectListUrl = 'http://localhost:8080/subjects/all';

  constructor(private httpClient: HttpClient) { }

  getSubjects(): Observable<Subject[]> {
    return this.httpClient.get<Subject[]>(this.subjectListUrl);
  }

  addNewSubject(subject) {
    return this.httpClient.post<Subject>(this.subjectListUrl, subject);
  }

  delete(id) {
    return this.httpClient.delete<Subject>(`${this.subjectListUrl}/${id}`);
  }
}
