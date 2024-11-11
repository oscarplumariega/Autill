import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface UserEdit {
  email: string;
  address: string;
  phoneNumber: number;
  cif: string;
}

interface Client{
  id: number,
  name: string,
  address: string,
  region: string,
  city: string,
  postalCode: number,
  email: string,
  country: string,
  cif: string,
  phoneNumber: number
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  //private readonly api = 'https://localhost:7234/';
  private readonly api = 'http://localhost:3000/api/v1';

  /*getUserByEmail(email: string) {
    return this.http.get(this.api+'api/Users/byEmail/'+email);
  }
  getUserById(id: string) {
    return this.http.get(this.api+'api/Users/'+id);
  }
  editUser(user: any){
    return this.http.put<UserEdit>(this.api+'api/Users', user);
  }*/

  getUserByEmail(email: string) {
    return this.http.get(this.api+'/Users/getByEmail/'+email);
  }
  getUserById(id: string) {
    return this.http.get(this.api+'/Users/'+id);
  }
  editUser(user: any){
    return this.http.put<UserEdit>(this.api+'/Users', user);
  }
}
