import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor(private httpClient: HttpClient) { }

  getAllInventory() {
    return this.httpClient.get('http://localhost:3002/api/inventory/getAllInventory');
  }

  getInventoryAndPriceById(productId: any) {
    return this.httpClient.get('http://localhost:3004/api/om-bff/' + productId).toPromise();
  }
}
