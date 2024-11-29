import { Component, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '../../services/user.service';
import { InfoModalComponent } from '../../../shared/components/info-modal/info-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  emailLogin: string = '';
  userService = inject(UserService);
  dataComplete = false;

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
    if (localStorage.getItem('id') != null) {
      this.userService.getUserById(localStorage.getItem('id') || "[]").subscribe((user: any) => {
        if (user.DataComplete) {
          this.dataComplete = true;
        } else {
          const dialogRef = this.dialog.open(InfoModalComponent);
          dialogRef.componentInstance.message = 'Debe de completar sus datos personales para comenzar a realizar presupuestos.';
        }
      })
    }
  }
}
