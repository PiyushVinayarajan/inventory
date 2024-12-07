import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductsService } from './products.service';
import { categories } from './categories';

const createFormGroup = (dataItem: any) =>
  new FormGroup({
    ProductID: new FormControl(dataItem.ProductID),
    ProductName: new FormControl(dataItem.ProductName, Validators.required),
    UnitPrice: new FormControl(dataItem.UnitPrice),
    UnitsInStock: new FormControl(
      dataItem.UnitsInStock,
      Validators.compose([
        Validators.required,
        Validators.pattern('^[0-9]{1,3}'),
      ])
    ),
    CategoryID: new FormControl(dataItem.CategoryID, Validators.required),
  });

@Component({
  selector: 'inv-app',
  template: `
    <kendo-grid
      [data]="gridData"
      (edit)="editHandler($event)"
      (cancel)="cancelHandler($event)"
      (save)="saveHandler($event)"
      (remove)="removeHandler($event)"
      (add)="addHandler($event)"
      [height]="410"
    >
      <ng-template kendoGridToolbarTemplate>
        <button kendoGridAddCommand>Add new</button>
      </ng-template>
      <kendo-grid-column field="ProductName" title="Name" [width]="200">
        <ng-template
          kendoGridEditTemplate
          let-column="column"
          let-formGroup="formGroup"
          let-isNew="isNew"
        >
          <input
            #input
            class="k-textbox"
            [formControl]="formGroup.get(column.field)"
          />
          <kendo-popup
            [anchor]="input"
            *ngIf="
              formGroup.get(column.field).invalid &&
              !(isNew && formGroup.get(column.field).untouched)
            "
            popupClass="k-widget k-tooltip k-tooltip-validation k-invalid-msg"
          >
            <span class="k-icon k-i-warning"></span>
            Product name is required
          </kendo-popup>
        </ng-template>
      </kendo-grid-column>
      <kendo-grid-column field="CategoryID" title="Category" [width]="150">
        <ng-template kendoGridCellTemplate let-dataItem>
          {{ category(dataItem.CategoryID)?.CategoryName }}
        </ng-template>
        <ng-template
          kendoGridEditTemplate
          let-dataItem="dataItem"
          let-column="column"
          let-formGroup="formGroup"
        >
          <kendo-dropdownlist
            #ddl="popupAnchor"
            popupAnchor
            [defaultItem]="{ CategoryID: null, CategoryName: 'Test null item' }"
            [data]="categories"
            textField="CategoryName"
            valueField="CategoryID"
            [valuePrimitive]="true"
            [formControl]="formGroup.get('CategoryID')"
          >
          </kendo-dropdownlist>
          <kendo-popup
            [anchor]="ddl.element"
            *ngIf="
              formGroup.get(column.field).invalid &&
              !(isNew && formGroup.get(column.field).untouched)
            "
            popupClass="k-widget k-tooltip k-tooltip-validation k-invalid-msg"
          >
            <span class="k-icon k-i-warning"></span>
            Category is required
          </kendo-popup>
        </ng-template>
      </kendo-grid-column>
      <kendo-grid-column
        field="UnitPrice"
        title="Price"
        format="{0:c}"
        [width]="80"
        editor="numeric"
      >
      </kendo-grid-column>
      <kendo-grid-column field="UnitsInStock" title="In stock" [width]="80">
        <ng-template
          kendoGridEditTemplate
          let-column="column"
          let-formGroup="formGroup"
          let-isNew="isNew"
        >
          <kendo-numerictextbox
            #ntb="popupAnchor"
            popupAnchor
            [formControl]="formGroup.get(column.field)"
          ></kendo-numerictextbox>
          <kendo-popup
            [anchor]="ntb.element"
            *ngIf="
              formGroup.get(column.field).invalid &&
              !(isNew && formGroup.get(column.field).untouched)
            "
            popupClass="k-widget k-tooltip k-tooltip-validation k-invalid-msg"
          >
            <span class="k-icon k-i-warning"></span>
            UnitsInStock must be >= 0
          </kendo-popup>
        </ng-template>
      </kendo-grid-column>
      <kendo-grid-command-column title="command" [width]="220">
        <ng-template kendoGridCellTemplate let-isNew="isNew">
          <button kendoGridEditCommand [primary]="true">Edit</button>
          <button kendoGridRemoveCommand>Remove</button>
          <button kendoGridSaveCommand>
            {{ isNew ? 'Add' : 'Update' }}
          </button>
          <button kendoGridCancelCommand>
            {{ isNew ? 'Discard changes' : 'Cancel' }}
          </button>
        </ng-template>
      </kendo-grid-command-column>
    </kendo-grid>
  `,
})
export class InventoryManagmentComponent implements OnInit {
  public gridData: any[];
  public categories: any[] = categories;
  public formGroup: FormGroup | undefined;
  private editedRowIndex: number | undefined;
  isNew: any;

  constructor(private service: ProductsService) {}

  public ngOnInit(): void {
    this.gridData = this.service.products();
  }

  public category(id: number): any {
    return this.categories.find((x) => x.CategoryID === id);
  }

  public addHandler(sender: any) {
    this.closeEditor(sender);

    this.formGroup = createFormGroup({
      ProductName: '',
      UnitPrice: 0,
      UnitsInStock: '',
      CategoryID: 1,
    });

    sender.addRow(this.formGroup);
  }

  public editHandler({
    sender,
    rowIndex,
    dataItem,
  }: {
    sender: any;
    rowIndex: any;
    dataItem: any;
  }) {
    this.closeEditor(sender);

    this.formGroup = createFormGroup(dataItem);

    this.editedRowIndex = rowIndex;

    sender.editRow(rowIndex, this.formGroup);
  }

  public cancelHandler({ sender, rowIndex }: { sender: any; rowIndex: any }) {
    this.closeEditor(sender, rowIndex);
  }

  public saveHandler({
    sender,
    rowIndex,
    formGroup,
    isNew,
  }: {
    sender: any;
    rowIndex: any;
    formGroup: any;
    isNew: any;
  }): void {
    const product = formGroup.value;

    this.service.save(product, isNew);

    sender.closeRow(rowIndex);
  }

  public removeHandler(dataItem: any): void {
    this.service.remove(dataItem);
  }

  private closeEditor(
    grid: any,
    rowIndex: number | undefined = this.editedRowIndex
  ) {
    grid.closeRow(rowIndex);
    this.editedRowIndex = undefined;
    this.formGroup = undefined;
  }
}
