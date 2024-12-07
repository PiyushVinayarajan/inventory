import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './Modules/menu/menu.component';
import { MenusModule } from '@progress/kendo-angular-menu';
import { AccountingComponent } from './Modules/accounting/accounting.component';
import { AccountManagmentComponent } from './Modules/accounting/account-managment/account-managment.component';
import { AccountingDashboardComponent } from './Modules/accounting/dashboard/dashboard.component';
import { InventoryManagmentComponent } from './Modules/inventory/inventory-managment/inventory-managment.component';
import { InventoryComponent } from './Modules/inventory/inventory.component';
import { InventoryDashboardComponent } from './Modules/inventory/dashboard/dashboard.component';
import { LogisticsComponent } from './Modules/logistics/logistics.component';
import { LogisticsDashboardComponent } from './Modules/logistics/dashboard/dashboard.component';
// import { LogisticsManagmentComponent } from './Modules/logistics/logistics-managment/logistics-managment.component';
import { EmployeesComponent } from './Modules/employees/employees.component';
import { HumanResourcesComponent } from './Modules/human-resources/human-resources.component';
import { HRDashboardComponent } from './Modules/human-resources/hrdashboard/hrdashboard.component';
import { HRManagmentComponent } from './Modules/human-resources/hrmanagment/hrmanagment.component';
import { EmpComponent } from './Modules/employees/emp/emp.component';
import {
  GridModule,
  PDFModule,
  ExcelModule,
} from '@progress/kendo-angular-grid';
import { ChartsModule } from '@progress/kendo-angular-charts';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { ProductsService } from './Modules/inventory/inventory-managment/products.service';
import { PopupAnchorDirective } from './Modules/inventory/inventory-managment/popup.anchor-target.directive';
import { PopupModule } from '@progress/kendo-angular-popup';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { HomeComponent } from './Modules/home/home.component';
import { IconsModule } from '@progress/kendo-angular-icons';
import { EditService } from './Modules/logistics/logistics-managment/edit.service';
import { LabelModule } from '@progress/kendo-angular-label';
import {
  HttpClient,
  HttpClientModule,
  HttpClientJsonpModule,
} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    AccountingComponent,
    AccountManagmentComponent,
    AccountingDashboardComponent,
    InventoryManagmentComponent,
    InventoryComponent,
    InventoryDashboardComponent,
    LogisticsComponent,
    LogisticsDashboardComponent,
    // LogisticsManagmentComponent,
    EmployeesComponent,
    HumanResourcesComponent,
    HRDashboardComponent,
    HRManagmentComponent,
    EmpComponent,
    PopupAnchorDirective,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MenusModule,
    GridModule,
    ChartsModule,
    InputsModule,
    PDFModule,
    ExcelModule,
    PopupModule,
    ReactiveFormsModule,
    DropDownsModule,
    IconsModule,
    LabelModule,
    FormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
  ],
  providers: [
    provideClientHydration(),
    ProductsService,
    {
      deps: [HttpClient],
      provide: EditService,
      useFactory: (jsonp: HttpClient) => () => new EditService(jsonp),
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
