import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from '../models/Client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  private readonly api = 'http://localhost:3000/api/v1';

  getClients(id:string){
    const body = {userId: id};

    return this.http.post(this.api+'/Clients/getList',body);
  }
  getClientById(id:number){
    return this.http.get(this.api+'/Clients/'+id);
  }
  deleteClient(id: number){
    return this.http.delete(this.api+'/Clients/'+id);
  }
  addClient(client:Client){
    return this.http.post<Client>(this.api+'/Clients', client)
  }
  editClient(id:number, client:any){
    return this.http.put(this.api+'/Clients/'+id, client)
  }
}
