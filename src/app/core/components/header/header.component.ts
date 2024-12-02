import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { InfoModalComponent } from '../../../shared/components/info-modal/info-modal.component';
import { CommonService } from '../../services/common-service.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  userService = inject(UserService);
  commonService = inject(CommonService);
  dataComplete:any;

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
    this.commonService.getDataComplete().subscribe({
      next: dataComplete => {
        this.dataComplete = dataComplete;
      }
    });
  }

  logout(){
    this.commonService.setDataComplete(false);
    localStorage.clear();
  }
}
