import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DistributionCentersComponent } from './pages/distribution-centers/distribution-centers.component';
import { InventoryComponent } from './pages/inventory/inventory.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { SettingsComponent } from './pages/settings/settings.component';

const routes: Routes = [
	{ path: '', redirectTo: 'orders', pathMatch: 'full' },
	{ path: 'orders', component: OrdersComponent },
	{ path: 'inventory', component: InventoryComponent },
	{ path: 'settings', component: SettingsComponent },
	{ path: 'distribution-centers', component: DistributionCentersComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
