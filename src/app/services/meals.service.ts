import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MealsService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<any>(`${environment.apiUrl}/meals`);
  }

  getOne(id: string) {
    return this.http.get<any>(`${environment.apiUrl}/meals/${id}`);
  }

  save(data) {
    return this.http.post<any>(`${environment.apiUrl}/meals`, data);
  }

  update(id, data) {
    return this.http.patch<any>(`${environment.apiUrl}/meals/${id}`, data);
  }

  getCategories() {
    return this.http.get<any>(`${environment.apiUrl}/categories`);
  }
}
