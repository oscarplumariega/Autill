import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Item } from '../models/Item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient) { }

  private readonly api = 'https://localhost:7234/';

  deleteProduct(id: number){
    return this.http.delete(this.api+'api/Item/'+id);
  }
  getItems(id: string){
    return this.http.get(this.api+'api/Item/list/'+id)
  }
  editItem(id:number, item:Item){
    return this.http.put(this.api+'api/Item/'+id, item)
  }
  addItem(item:Item){
    return this.http.post<Item>(this.api+'api/Item', item)
  }
}
