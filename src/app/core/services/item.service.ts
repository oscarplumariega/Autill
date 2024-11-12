import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Item } from '../models/Item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient) { }

  private readonly api = 'http://localhost:3000/api/v1';

  deleteProduct(id: number){
    return this.http.delete(this.api+'/Items/'+id);
  }
  getItems(id: string){
    const body = {userId: id};

    return this.http.post(this.api+'/Items/getList',body);
  }
  editItem(id:number, item:Item){
    return this.http.put(this.api+'/Items/'+id, item);
  }
  addItem(item:Item){
    return this.http.post<Item>(this.api+'/Items', item);
  }
}
