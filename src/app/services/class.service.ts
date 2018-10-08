import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from '../../../node_modules/rxjs';
import { Class } from '../models/class.model';
import { Subject } from '../models/subject.model';

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  classes: Class[] = [{
    id: 1,
    startDate: new Date(2018, 9, 5, 10),
    endDate: new Date(2018, 9, 5, 12),
    comment: 'cica',
    subjectId: 1,
    groupId: 1
  }, {
    id: 2,
    startDate: new Date(2018, 9, 4, 12),
    endDate: new Date(2018, 9, 4, 14),
    comment: 'kacsa',
    subjectId: 2,
    groupId: 1
  }
  ];

  subjects: Subject[] = [{
    id: 1,
    title: 'linux',
    color: '#00bfb2'
  }, {
    id: 2,
    title: 'javascript',
    color: '#088078'
  }
  ];

  private classListUrl = 'http://localhost:8080/classes';
  constructor(private httpClient: HttpClient) { }

  getClasses(): Observable<Class[]> {
    return this.httpClient.get<Class[]>('http://localhost:8080/classes/all');
  }

  getSubjects() {
    return this.subjects;
  }

  getAll(): Observable<Class[]> {
    return this.httpClient.get<Class[]>(this.classListUrl);
  }
}
