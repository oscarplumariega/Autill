import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BillService {

  constructor(private http: HttpClient) { }

  private readonly api = 'http://localhost:3000/api/v1';

  getBills(id: string){
    return this.http.get(this.api+'/Bills/list/'+id);
  }
  deleteBill(id: number){
    return this.http.delete(this.api+'/Bills/'+id);
  }
  cloneRegister(id:number){
    return this.http.post(this.api+'/Bills/clone',id);
  }
}
