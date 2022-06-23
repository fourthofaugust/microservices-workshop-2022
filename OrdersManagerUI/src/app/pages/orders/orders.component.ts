import { Component, OnInit } from '@angular/core';
import {OrdersService} from "../../services/orders.service";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  columnHeaders = [
    "Order Number",
    "Product Number",
    "Quantity",
    "Status",
    "Price"
  ];

  totalOrders: any[] = [];

  constructor(private ordersService: OrdersService) { }

  ngOnInit(): void {
    this.ordersService.getAllOrders().subscribe( (res: any) => {
      this.totalOrders = res;
    });
  }

}
