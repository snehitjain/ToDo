import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private apiUrl= 'http://localhost:3000/api/todos';

  constructor(private http: HttpClient) { }

  getData(data:object): Observable<ITodo[]> {
    return this.http.get<ITodo[]>(`${this.apiUrl}`,data);
  }
   
  getDatabyId(id:number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // postData(data: object): Observable<any> {
  //   return this.http.post(`${this.apiUrl}`, data);
  // }
  
  postData(data: Omit<any[], '_id'|'completed'|'v'>) {
    return this.http.post<any[]>(`${this.apiUrl}`, data, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

  
  updateData(id: number, data: object): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}`, data);
  }


  deleteDatabyId(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
