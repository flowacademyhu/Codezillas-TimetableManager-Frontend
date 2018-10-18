import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from '../../../node_modules/rxjs';
import { Class } from '../models/class.model';

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  private classListUrl = '/classes/';
  constructor(private httpClient: HttpClient) { }

  getClasses(startDate: Date, endDate: Date, groupId?: number): Observable<Class[]> {
    const sds = startDate.getTime().toString();
    const sde = endDate.getTime().toString();
    const id = groupId.toString();
    return this.httpClient.get<Class[]>(this.classListUrl + 'filter',
     {params: {SDS: sds, SDE: sde, groupId: id}});
  }

  newClass(cls) {
    return this.httpClient.post<Class>(this.classListUrl, cls);
  }

  delete(id) {
    return this.httpClient.delete<Class>(`${this.classListUrl}/${id}`);
  }

}
