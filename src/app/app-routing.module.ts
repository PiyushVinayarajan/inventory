import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InventoryComponent } from './Modules/inventory/inventory.component';
import { InventoryDashboardComponent } from './Modules/inventory/dashboard/dashboard.component';
import { InventoryManagmentComponent } from './Modules/inventory/inventory-managment/inventory-managment.component';
import { AccountingComponent } from './Modules/accounting/accounting.component';
import { AccountManagmentComponent } from './Modules/accounting/account-managment/account-managment.component';
import { AccountingDashboardComponent } from './Modules/accounting/dashboard/dashboard.component';
import { LogisticsComponent } from './Modules/logistics/logistics.component';
import { LogisticsManagmentComponent } from './Modules/logistics/logistics-managment/logistics-managment.component';
import { LogisticsDashboardComponent } from './Modules/logistics/dashboard/dashboard.component';
import { HomeComponent } from './Modules/home/home.component';
import { EmployeesComponent } from './Modules/employees/employees.component';
import { EmpComponent } from './Modules/employees/emp/emp.component';
import { HRDashboardComponent } from './Modules/human-resources/hrdashboard/hrdashboard.component';

export const routes = [
  { path: '', component: HomeComponent, text: 'Home' },
  {
    path: 'accounting',
    component: AccountingComponent,
    text: 'Accounting',
    children: [
      {
        path: 'accounting-dashboard',
        component: AccountingDashboardComponent,
        text: 'Accounting Dashboard',
      },
      {
        path: 'accounting-managment',
        component: AccountManagmentComponent,
        text: 'Accounting Managment',
      },
    ],
  },
  {
    path: 'inventory',
    component: InventoryComponent,
    text: 'Inventory',
    children: [
      {
        path: 'inventory-dashboard',
        component: InventoryDashboardComponent,
        text: 'Inventory Dashboard',
      },
      {
        path: 'inventory-managment',
        component: InventoryManagmentComponent,
        text: 'Inventory Managment',
      },
    ],
  },
  {
    path: 'logistics',
    component: LogisticsComponent,
    text: 'Logistics',
    children: [
      {
        path: 'logistics/logistics-dashboard',
        component: LogisticsDashboardComponent,
        text: 'Logistics Dashboard',
      },
      {
        path: 'logistics/logistics-managment',
        component: LogisticsManagmentComponent,
        text: 'Logistics Managment',
      },
    ],
  },
  {
    path: 'employees',
    component: EmpComponent,
    text: 'Employees',
    children: [
      {
        path: 'logistics/logistics-dashboard',
        component: HRDashboardComponent,
        text: 'Pay Roll',
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
