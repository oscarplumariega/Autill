import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BillService {

  constructor(private http: HttpClient) { }

  private readonly api = 'http://localhost:3000/api/v1';

  private getHeaders(): HttpHeaders {
    const authToken = localStorage.getItem('token');

    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`
    });
  }

  getBills(id:string, filters: any, t: number, s:number): Observable<any>{
    const body = {userId: id, filters: filters, take: t, skip: s};
    const headers = this.getHeaders();

    return this.http.post(this.api+'/Bills/getList',body,{headers});
  }
  deleteBill(id: number){
    const headers = this.getHeaders();

    return this.http.delete(this.api+'/Bills/'+id,{headers});
  }
  cloneRegister(id:number){
    const body = {id: id};
    const headers = this.getHeaders();

    return this.http.post(this.api+'/Bills/generateBill',body,{headers});
  }
}
