import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { LoginData } from '../../models/LoginData';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  form!: FormGroup;
  private _snackBar = inject(MatSnackBar);

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  login() {
    if (this.form.valid) {
      const loginData = new LoginData(
        this.form.value.email,
        this.form.value.password
      );
      this.userService.login(loginData).subscribe(
        (data) => {
          localStorage.setItem('token', data.token);
          localStorage.setItem('roles', JSON.stringify(data.roles));
          localStorage.setItem('userPhoto', data.photo || '');

          this._snackBar.open('Logged in successfully!', 'Close', {
            duration: 1000,
          });

          this.navigate(data.roles);
        },
        (error) => {
          this._snackBar.open(error.error.errorMessage, 'Close', {
            duration: 1000,
          });
        }
      );
    } else {
      this._snackBar.open('Email and password must be valid.', 'Close', {
        duration: 1000,
      });
    }
  }

  navigate(roles: string[]) {
    if (roles.length === 1) {
      switch (roles[0]) {
        case 'HomeOwner':
          this.router.navigate(['/homeowner/homedevices']);
          break;
        case 'Administrator':
          this.router.navigate(['/administrator']);
          break;
        case 'CompanyOwner':
          this.router.navigate(['/companyowner']);
          break;
        default:
          this.router.navigate(['/']);
      }
    } else if (roles.length === 2) {
      const nonHomeownerRole = roles.find((role) => role !== 'HomeOwner');
      switch (nonHomeownerRole) {
        case 'Administrator':
          this.router.navigate(['/administrator']);
          break;
        case 'CompanyOwner':
          this.router.navigate(['/companyowner']);
          break;
        default:
          this.router.navigate(['/']);
      }
    } else {
      this.router.navigate(['/']);
    }
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
