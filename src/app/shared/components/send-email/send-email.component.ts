import { Component, inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SpinnerLoadingComponent } from '../spinner-loading/spinner-loading.component';
import { BudgetService } from '../../../core/services/budget.service';
import { InfoModalComponent } from '../info-modal/info-modal.component';
import { Messages } from '../../../core/services/common-service.service';

@Component({
  selector: 'app-send-email',
  standalone: true,
  imports: [SpinnerLoadingComponent],
  templateUrl: './send-email.component.html',
  styleUrl: './send-email.component.css'
})
export class SendEmailComponent {
  message: string = '';
  loading: boolean = false;
  client: any;
  user: any;
  budget: any;
  budgetService = inject(BudgetService);

  constructor(private dialog: MatDialog, public dialogRef: MatDialogRef<SendEmailComponent>) {}

  onClose(): void {
    this.dialogRef.close();
  }
  confirm(){
    this.loading = true;

    setTimeout(() => {
      this.budgetService.sendEmail(this.user, this.client, this.budget).subscribe(() => {
        const dialogRef = this.dialog.open(InfoModalComponent);
        dialogRef.componentInstance.message = Messages.EMAIL_OK;
      });

      window.location.reload();
    }, 2000)

    //this.dialogRef.close('confirm');
  }
}
