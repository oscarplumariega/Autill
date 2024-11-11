import { Component, inject, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { ApiService } from '../../../core/services/api.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AsyncPipe } from '@angular/common';
import { map, Observable, startWith } from 'rxjs';
import { Item } from '../../../core/models/Item';
import { ItemService } from '../../../core/services/item.service';


@Component({
  selector: 'app-budget-details',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatAutocompleteModule, ReactiveFormsModule, AsyncPipe],
  templateUrl: './budget-details.component.html',
  styleUrl: './budget-details.component.css'
})
export class BudgetDetailsComponent {
  items = [{ id: 0, name: '', units: 0, price: 0, totalConcept: 0 }];
  data = [];
  dbItems: any = [];
  apiService = inject(ApiService);
  itemService = inject(ItemService);
  Item = new FormControl<ItemInit | string>('');
  filteredItems!: Observable<Item[]>;
  lastOptionIdSelected: number = 0;
  lasItemAdded: any = {};
  detailsForm!: FormGroup;
  nameDefault: string = '';

  initializeForm() {
    this.detailsForm = new FormGroup({
      Item0: new FormControl(),
      PriceTD0: new FormControl(),
      Units0: new FormControl()
    })
  }

  constructor(public dialogRef: MatDialogRef<BudgetDetailsComponent>) {
    this.initializeForm();
  }

  ngOnInit() {
    if (this.data.length > 0) {
      this.items = this.data;

      for (let i = 0; i < this.items.length; i++) {
        this.newFormControls(i);
      }
    }

    this.itemService.getItems(localStorage.getItem('id') || "[]").subscribe((data: any) => {
      this.dbItems = data;

      this.filteredItems = this.detailsForm.controls['Item0'].valueChanges.pipe(
        startWith(''),
        map(value => {
          const item = value;
          return item ? this._filter(item as string) : this.dbItems || '';
        }),
      );
    })

    for (let i = 0; i < this.items.length; i++) {
      if (i > 0) {
        this.detailsForm.addControl(`Item${i}`, new FormControl());
      }
    }
  }

  ngAfterViewInit() {
    for (let i = 0; i < this.items.length; i++) {
      this.detailsForm.get(`Item${i}`)!.setValue(this.items[i].name);
      this.detailsForm.get(`Units${i}`)!.setValue(this.items[i].units);
      this.detailsForm.get(`PriceTD${i}`)!.setValue(this.items[i].price);
    }
  }

  onClose(): void {
    if (this.items[this.items.length - 1].totalConcept == 0) {
      this.items.pop();
    }
    this.dialogRef.close({ data: this.items });
  }

  addItem(id: number, type:string) {
    console.log(id);
    if(type === 'form'){
      this.newFormControls(id);

      this.items.push({ id: id, name: '', units: 0, price: 0, totalConcept: 0 });
    }else{
      let units = parseFloat(this.detailsForm.controls['Units' + id].value);
  
      this.items[id].name = this.detailsForm.controls['Item' + id].value;
      this.items[id].units = units;
      this.items[id].price = parseFloat(this.lasItemAdded.price);

      this.items[id].totalConcept = Number((units * this.items[id].price).toFixed(2));
  
      this.items.push({ id: id + 1, name: '', units: 0, price: 0, totalConcept: 0 });

      this.filteredItems = this.detailsForm.controls[`Item${id}`].valueChanges.pipe(
        startWith(''),
        map(value => {
          const item = value;
          return item ? this._filter(item as string) : this.dbItems || '';
        }),
      );
    }
  }

  newFormControls(id: number) {
    this.detailsForm.addControl(`Item${id}`, new FormControl());
    this.detailsForm.addControl(`PriceTD${id}`, new FormControl());
    this.detailsForm.addControl(`Units${id}`, new FormControl());
  }

  changeSelection(id: number, name: string, event: any) {
    if (event.isUserInput) {
      this.lastOptionIdSelected = id;
      this._filter(name);
    }
  }

  private _filter(value: any): any[] {
    const filterValue = typeof value === 'string' ? value.toLowerCase() : value.Item.toLowerCase();

    let itemSelected = this.dbItems.find((item: any) => item.name === value)!;

    if (itemSelected !== undefined) {
      let priceElement = document.getElementById(`priceTD${this.lastOptionIdSelected}`)! as HTMLInputElement;
      priceElement.value = itemSelected.price;
    }

    this.lasItemAdded = itemSelected;

    return this.dbItems.filter((option: any) => option.name.toLowerCase().includes(filterValue));
  }

  addItems() {
    this.addItem(this.items.length - 1, 'new');
    //this.items.pop();

    this.onClose();
  }

  unitsChange(idItem: number, event: any) {
    let refreshUnits = (event.target as HTMLInputElement).value

    this.items[idItem].units = parseFloat(refreshUnits);
    this.items[idItem].totalConcept = this.items[idItem].units * this.items[idItem].price;
  }
}

export class ItemInit {
  constructor(public id: number, public name: string, public price: number) {

  }
}