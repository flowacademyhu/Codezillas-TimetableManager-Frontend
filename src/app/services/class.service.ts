import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from '../../../node_modules/rxjs';
import { Class } from '../models/Class.model';

@Injectable({
  providedIn: 'root'
})
export class ClassService {
  classes: Class[];

  private classListUrl = 'http://localhost:8080/categories';
  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Class[]> {
    return this.httpClient.get<Class[]>(this.classListUrl);
  }
}
