import { Component, EventEmitter, inject, Output } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Router } from '@angular/router';
import { SpinnerLoadingComponent } from '../../../shared/components/spinner-loading/spinner-loading.component';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, SpinnerLoadingComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  animations: [
    trigger('openClose', [
      state(
        'open',
        style({
          height: '200px',
          opacity: 1,
          backgroundColor: 'yellow',
        }),
      ),
      state(
        'closed',
        style({
          height: '100px',
          opacity: 0.8,
          backgroundColor: 'blue',
        }),
      ),
      transition('open => closed', [animate('1s')]),
      transition('closed => open', [animate('0.5s')]),
    ])
  ]
})
export class LoginComponent {
  registerForm!: FormGroup
  register_option = false;
  err:any | null;
  loading:boolean = false;
  apiService = inject(ApiService);
  userService = inject(UserService);

  initializeForm(){
    this.registerForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    })
  }
  
  constructor(private formBuilder: FormBuilder, private router: Router){
    this.initializeForm();
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      Email: ['', [Validators.required, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/)]],
      Password: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]]
    });
  }

  authUser(action: string){
    this.loading = true;
    if (this.registerForm.valid) {
      if(action === 'register') {
        this.apiService.auth(this.registerForm.value, action).subscribe({
          error: (err) => {
            let errObj = err.error.errors;
            this.err = Object.values(errObj);
          },
          complete: () => {
            this.register_option = false;
            this.loading = false;
          }
        });
      }else{
        this.apiService.auth(this.registerForm.value, action).subscribe({
          complete: () => {
            setTimeout(() => {
              localStorage.setItem('email',this.registerForm.controls['Email'].value);
              this.userService.getUserByEmail( localStorage.getItem('email') || "[]").subscribe((data:any) => {
                localStorage.setItem('id',data.Id);
              })

              this.router.navigate(['/home']);
            }, 1000)
          }
        });
      }
    }
  }

  changeForm(){
    this.register_option = !this.register_option;
  }
}
