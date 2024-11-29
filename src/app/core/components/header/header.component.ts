import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { InfoModalComponent } from '../../../shared/components/info-modal/info-modal.component';
import { CommonService } from '../../services/common-service.service';
import { BehaviorSubject, map } from 'rxjs';

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
  dataComplete = false;

  public dataComplete$ = new BehaviorSubject(false);

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
    console.log(this.dataComplete$.getValue());
  }

  logout(){
    localStorage.clear();
  }
}
