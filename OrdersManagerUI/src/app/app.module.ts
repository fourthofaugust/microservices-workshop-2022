import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClarityModule } from '@clr/angular';
import { HeaderComponent } from './components/header/header.component';
import { SubNavComponent } from './components/sub-nav/sub-nav.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { DataGridComponent } from './components/data-grid/data-grid.component';
import { InventoryComponent } from './pages/inventory/inventory.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { DistributionCentersComponent } from './pages/distribution-centers/distribution-centers.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		SubNavComponent,
		OrdersComponent,
		DataGridComponent,
		InventoryComponent,
		SettingsComponent,
		DistributionCentersComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		ClarityModule,
    HttpClientModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
