import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from '../../../node_modules/rxjs';
import { Class } from '../models/class.model';

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  private classListUrl = 'http://localhost:8080/classes';
  constructor(private httpClient: HttpClient) { }

  getClasses(): Observable<Class[]> {
    return this.httpClient.get<Class[]>(this.classListUrl);
  }

}
