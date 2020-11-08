import { Item } from './../model/item';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class ItemserviceService {

  constructor(private http: HttpClient) { }

  baseUrl: string = 'http://localhost:8080/shopbridge/item';

  getItems() {
    return this.http.get<Item[]>(this.baseUrl);
  }

  getItemById(id: number) {
    return this.http.get<Item>(this.baseUrl + '/' + id);
  }

  createItem(item: Item) {
    return this.http.post(this.baseUrl, item);
  }

  updateItem(item: Item) {
    return this.http.put(this.baseUrl, item);
  }

  deleteItem(id: string) {
    return this.http.delete(this.baseUrl + '/' + id);
  }
}
