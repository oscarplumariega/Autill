import { Component, inject, Input, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BudgetModalComponent } from '../../../shared/components/budget-modal/budget-modal.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorsComponent } from "../../../shared/components/errors/errors.component";
import { DeleteItemModalComponent } from '../../../shared/components/delete-item-modal/delete-item-modal.component';
import { CommonService } from '../../services/common-service.service';
import { BudgetService } from '../../services/budget.service';
import { PaginatorComponent } from '../../../shared/components/paginator/paginator.component';
import { SearchFiltersComponent } from "../../../shared/components/search-filters/search-filters.component";
import { UserService } from '../../services/user.service';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-budgets',
  standalone: true,
  imports: [ErrorsComponent, PaginatorComponent, SearchFiltersComponent],
  templateUrl: './budgets.component.html',
  styleUrl: './budgets.component.css'
})
export class BudgetsComponent {
  @Input() budgets: any;
  
  dataScreen: string = 'budgets';
  allBudgets: any = [];
  dataBudgets: any = [];
  showModal = false;
  apiService = inject(ApiService);
  budgetService = inject(BudgetService);
  userService = inject(UserService);
  clientService = inject(ClientService);
  errorMessage: string = '';

  constructor(private dialog: MatDialog, public commonService: CommonService) { }

  ngOnInit() {
    this.budgetService.getBudgets(localStorage.getItem('id') || "[]", null, 10, 0).subscribe({
      next: (data: any) => {
        this.allBudgets = data;
        this.dataBudgets = data;
        this.budgets = data;
      },
      error: (err: HttpErrorResponse) => {
        let error = '';
        if (err.status === 500) {
          error = 'Internal server error.'
        } else if (err.status === 401) {
          error = 'No autorizado.'
        } else {
          error = 'Ha ocurrido un error, contacta con el administrador.'
        }
        this.errorMessage = error;
      }
    })
  }

  updateItems(budgets: any){
    this.budgets = budgets;
  }

  updateSearching(formControlValue: any){
    this.budgets = this.dataBudgets;

   if(formControlValue.Date != null){
    formControlValue.Date = this.commonService.transformDate(formControlValue.Date);
   }

    this.budgetService.getBudgets(localStorage.getItem('id') || "[]", formControlValue, 10, 0).subscribe((filterBudgets:any) => {
      this.budgets = filterBudgets;
      this.allBudgets = this.budgets;
    });
  }

  openTaskDialog(action: string, id: number) {
    const dialogRef = this.dialog.open(BudgetModalComponent);
    dialogRef.componentInstance.id = id;
    dialogRef.componentInstance.action = action;

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // do something
      }
    });
  }

  deleteBudget(id: number) {
    const dialogRef = this.dialog.open(DeleteItemModalComponent);
    dialogRef.componentInstance.type = 'el presupuesto'
    dialogRef.componentInstance.id = id;

    dialogRef.afterClosed().subscribe(result => {
      if (result == 'confirm') {
        this.budgetService.deleteBudget(id).subscribe({
        })
      }
    })
  }

  sendEmail(budget:any){
    this.userService.getUserById(localStorage.getItem('id') || "[]").subscribe((user:any) => {
      this.clientService.getClientById(budget.ClientId).subscribe((client:any) => {
        this.budgetService.sendEmail(user, client, budget).subscribe();
      })
    })
  }

  }