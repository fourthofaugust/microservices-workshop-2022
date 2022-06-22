import { Component, OnInit } from '@angular/core';
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

  constructor(private inventoryService: InventoryService) { }

  ngOnInit(): void {
    this.inventoryService.getAllInventory().subscribe( (res: any) => {
      this.totalInventory = res;
    });
  }

}
