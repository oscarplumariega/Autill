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
    return this.http.delete(this.api+'/Item/'+id);
  }
  getItems(id: string){
    return this.http.get(this.api+'/Item/list/'+id)
  }
  editItem(id:number, item:Item){
    return this.http.put(this.api+'/Item/'+id, item)
  }
  addItem(item:Item){
    return this.http.post<Item>(this.api+'/Item', item)
  }
}
