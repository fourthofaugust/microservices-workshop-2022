import {Component, OnInit} from '@angular/core';
import {InventoryService} from "../../services/inventory.service";

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {

  columnHeaders = [
    "Inventory Id",
    "Product Number",
    "Quantity",
    "Status",
    "Price"
  ]

  totalInventory: any[] = [];
  productIds: any[] = [];
  consolidatedResponse: any[] = [];

  constructor(private inventoryService: InventoryService) {
  }

  ngOnInit(): void {
    this.inventoryService.getAllInventory().subscribe((res: any) => {
      this.totalInventory = res;
      this.productIds = res.map((res: any) => res.productId);

      const bffPromises: any[] = [];
      this.productIds.forEach(id => {
        bffPromises.push(this.inventoryService.getInventoryAndPriceById(id));
      })

      Promise.all(bffPromises).then(res => {
        this.consolidatedResponse =  res;
      })

    });

  }

}
