import { Observable } from 'rxjs';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

import {
  GridComponent,
  GridDataResult,
  CancelEvent,
  EditEvent,
  RemoveEvent,
  SaveEvent,
  AddEvent,
} from '@progress/kendo-angular-grid';
import { State, process } from '@progress/kendo-data-query';
import { Product } from './model';
import { EditService } from './edit.service';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-logistics-managment',
  templateUrl: './logistics-managment.component.html',
  styleUrl: './logistics-managment.component.css',
})
export class LogisticsManagmentComponent implements OnInit {
  public view: Observable<GridDataResult>;
  public gridState: State = {
    sort: [],
    skip: 0,
    take: 5,
  };
  public formGroup: FormGroup | undefined;
  public formGroups: FormGroup = new FormGroup({ items: new FormArray([]) });

  private editService: EditService;
  private editedRowIndex: number | undefined;

  constructor(@Inject(EditService) editServiceFactory: () => EditService) {
    this.editService = editServiceFactory();
  }

  public ngOnInit(): void {
    this.view = this.editService.pipe(
      tap((data) => {
        // generate the FormGroups per each Grid row
        if ((this.formGroups.get('items') as FormArray).controls.length === 0) {
          data.forEach((i) => {
            const formGroup = new FormGroup({
              ProductID: new FormControl(i.ProductID),
              ProductName: new FormControl(i.ProductName),
              UnitPrice: new FormControl(i.UnitPrice),
              Discontinued: new FormControl(i.Discontinued),
              UnitsInStock: new FormControl(i.UnitsInStock),
            });

            (this.formGroups.get('items') as FormArray).push(formGroup);
          });
        }
      }),
      map((data) => process(data, this.gridState))
    );
    this.editService.read();
  }

  public getFormControl(dataItem: Product, field: string): FormControl {
    // return the FormControl for the respective column editor
    return <FormControl>(
      (this.formGroups.get('items') as FormArray).controls
        .find((i) => i.value.ProductID === dataItem.ProductID)
        ?.get(field)
    );
  }
  public onStateChange(state: State): void {
    this.gridState = state;

    this.editService.read();
  }

  public addHandler(args: AddEvent): void {
    this.closeEditor(args.sender);
    // define all editable fields validators and default values
    this.formGroup = new FormGroup({
      ProductID: new FormControl(),
      ProductName: new FormControl('', Validators.required),
      UnitPrice: new FormControl(0),
      UnitsInStock: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[0-9]{1,3}'),
        ])
      ),
      Discontinued: new FormControl(false),
    });
    // show the new row editor, with the `FormGroup` build above
    args.sender.addRow(this.formGroup);
  }

  public editHandler(args: EditEvent): void {
    // define all editable fields validators and default values
    const { dataItem } = args;
    this.closeEditor(args.sender);

    this.formGroup = new FormGroup({
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
    });

    this.editedRowIndex = args.rowIndex;
    // put the row in edit mode, with the `FormGroup` build above
    args.sender.editRow(args.rowIndex, this.formGroup);
  }

  public cancelHandler(args: CancelEvent): void {
    // close the editor for the given row
    this.closeEditor(args.sender, args.rowIndex);
  }

  public saveHandler({ sender, rowIndex, formGroup, isNew }: SaveEvent): void {
    const product: Product[] = formGroup.value;

    this.editService.save(product, isNew);

    sender.closeRow(rowIndex);
  }

  public removeHandler(args: RemoveEvent): void {
    // remove the current dataItem from the current data source,
    // `editService` in this example
    this.editService.remove(args.dataItem);
  }

  private closeEditor(
    grid: GridComponent,
    rowIndex: number | undefined = this.editedRowIndex
  ) {
    // close the editor
    grid.closeRow(rowIndex);
    // reset the helpers
    this.editedRowIndex = undefined;
    this.formGroup = undefined;
  }

  public onDiscontinueChange(dataItem: Product, field: string, e: any): void {
    const discontinued = dataItem.Discontinued === false ? true : false;
  }
}
