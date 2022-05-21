import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SchedulerService {

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<any>(`${environment.apiUrl}/scheduler`);
  }

  create(data) {
    return this.http.post<any>(`${environment.apiUrl}/scheduler`, data);
  }

  removeMeal(id, data) {
    return this.http.patch<any>(`${environment.apiUrl}/scheduler/${id}`, data);
  }
}
