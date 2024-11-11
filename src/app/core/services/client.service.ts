import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from '../models/Client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  //private readonly api = 'https://localhost:7234/';
  private readonly api = 'https://localhost:3000/api/v1';

  /*getClients(id:string){
    return this.http.get(this.api+'api/Clients/list/'+id);
  }
  getClientById(id:number){
    return this.http.get(this.api+'api/Clients/'+id);
  }
  deleteClient(id: number){
    return this.http.delete(this.api+'api/Clients/'+id);
  }
  addClient(client:Client){
    return this.http.post<Client>(this.api+'api/Clients', client)
  }
  editClient(id:number, client:any){
    return this.http.put(this.api+'api/Clients/'+id, client)
  }*/

  getClients(id:string){
    return this.http.get(this.api+'/Clients/list/'+id);
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
