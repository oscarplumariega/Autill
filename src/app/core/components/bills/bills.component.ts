import { Component, inject, Input } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DeleteItemModalComponent } from '../../../shared/components/delete-item-modal/delete-item-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { CommonService } from '../../services/common-service.service';
import { BillService } from '../../services/bill.service';
import { ClientService } from '../../services/client.service';
import { PaginatorComponent } from '../../../shared/components/paginator/paginator.component';
import { SearchFiltersComponent } from '../../../shared/components/search-filters/search-filters.component';

@Component({
  selector: 'app-bills',
  standalone: true,
  imports: [PaginatorComponent, SearchFiltersComponent],
  templateUrl: './bills.component.html',
  styleUrl: './bills.component.css'
})
export class BillsComponent {
  @Input() bills: any;
  
  dataScreen: string = 'bills';
  allBills: any = [];
  billService = inject(BillService);
  clientService = inject(ClientService);
  errorMessage: string = "";
  dataBills: any = [];

  constructor(private dialog: MatDialog, public commonService: CommonService) {}

  ngOnInit() {
    this.billService.getBills(localStorage.getItem('id') || "[]", null, 10, 0).subscribe({
      next: (data:any) => {
        for (let i = 0; i < data.length; i++) {
          this.clientService.getAllClients(localStorage.getItem('id') || "[]").subscribe((clients:any) =>{
            for (let x = 0; x < clients.length; x++) {
              if(clients[x].id === data[i].clientId) {
                data[i].clientName = clients[x].name;
              }
            }
          })
        }
        this.allBills = data.data;
        this.dataBills = data.data;
        this.bills = data.data;
      }, 
      error: (err: HttpErrorResponse) => {
        let error = '';
        if(err.status === 500){
          error = 'Internal server error.'
        }else if(err.status === 401){
          error = 'No autorizado.'
        }else{
          error = 'Ha ocurrido un error, contacta con el administrador.'
        }
        this.errorMessage = error;
      }
    })
  }

  updateItems(bills: any){
    this.bills = bills;
  }

  updateSearching(formControlValue: any){
    this.bills = this.dataBills;

    for(let k in formControlValue){
      if(formControlValue[k] !== null && formControlValue[k] !== ''){
        if(k === 'name'){
          this.bills = this.bills.filter((item:any) => item.name.includes(formControlValue[k]));
        }else if(k === 'clientId'){
          this.bills = this.bills.filter((item:any) => item.clientName === formControlValue[k]);
        }else if(k === 'date'){
          this.bills = this.bills.filter((item:any) => item.date === this.commonService.transformDate(formControlValue[k]));
        }else if(k === 'status'){
          this.bills = this.bills.filter((item:any) => item.closeIt === formControlValue[k]);
        }
      }
    }

    this.allBills = this.bills;
  }

  openTaskDialog(n:string, id:number){

  }

  deleteBill(id: number) {
    const dialogRef = this.dialog.open(DeleteItemModalComponent);
    dialogRef.componentInstance.type = 'la factura'
    dialogRef.componentInstance.id = id;

    dialogRef.afterClosed().subscribe(result => {
    })
  }

}
