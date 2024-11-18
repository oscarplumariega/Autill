import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BillService {

  constructor(private http: HttpClient) { }

  private readonly api = 'http://localhost:3000/api/v1';

  getBills(id:string, filters: any, t: number, s:number): Observable<any>{
    const body = {userId: id, filters: filters, take: t, skip: s};

    return this.http.post(this.api+'/Bills/getList',body);
  }
  deleteBill(id: number){
    return this.http.delete(this.api+'/Bills/'+id);
  }
  cloneRegister(id:number){
    const body = {id: id};

    return this.http.post(this.api+'/Bills/generateBill',body);
  }
}
