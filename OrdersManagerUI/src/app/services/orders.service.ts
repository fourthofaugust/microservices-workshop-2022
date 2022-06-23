import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private httpClient: HttpClient) {
  }

  getAllOrders() {
    return this.httpClient.get('http://localhost:3001/api/orders/stores/STORE-US-1');
  }
}
