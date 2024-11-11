import { AsyncPipe } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { map, Observable, startWith } from 'rxjs';
import { Client } from '../../../core/models/Client';
import { ClientService } from '../../../core/services/client.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatDatepickerModule } from '@angular/material/datepicker';

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL'
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY'
  }
};

@Component({
  selector: 'app-search-filters',
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule, MatAutocompleteModule, AsyncPipe, MatDatepickerModule],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ],
  templateUrl: './search-filters.component.html',
  styleUrl: './search-filters.component.css'
})
export class SearchFiltersComponent {
  @Input() dataScreen: string = '';
  @Output() updateSearching = new EventEmitter<any>();
  
  searchForm!: FormGroup
  clientService = inject(ClientService);
  clients: any = [];
  filteredClients!: Observable<Client[]>;

  initializeForm() {
    this.searchForm = new FormGroup({
      name: new FormControl(),
      clientId: new FormControl(),
      date: new FormControl(),
      status: new FormControl(),
      price: new FormControl(),
      nif: new FormControl(),
      phoneNumber: new FormControl()
    })
  }

  constructor(){
    this.initializeForm();
  }

  ngOnInit() {
    this.clientService.getClients(localStorage.getItem('id') || "[]").subscribe((clients: any) => {
      this.clients = clients;

      this.filteredClients = this.searchForm.controls['clientId'].valueChanges.pipe(
        startWith(''),
        map(value => {
          const item = value;
          return item ? this._filter(item as string) : clients || '';
        }),
      );
    })
  }

  search(){
    this.updateSearching.emit(this.searchForm.value); 
  }

  reset(){
    this.updateSearching.emit("");
  }

  private _filter(value: any): any[] {
    let filterValue = '';

    return this.clients.filter((option:any) => option.name.toLowerCase().includes(filterValue));
  }
}
