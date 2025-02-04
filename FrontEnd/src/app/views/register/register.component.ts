import { Component, inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RegisterHomeOwnerData } from '../../models/RegisterHomeOwnerData';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {  
  form!: FormGroup;
  selectedFile: File | null = null;
  imagePath: string = '';
  fileName: string = '';

  private _snackBar = inject(MatSnackBar);

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      profilePhoto: ['', Validators.required]
    });
  }

  register(): void {
    if (this.form.valid) {  
      this.registerHomeOwner();
    } else {
      this._snackBar.open('Not valid inputs', 'Close', { duration: 1000 });
    }
  }

  private registerHomeOwner(): void {
    const user = new RegisterHomeOwnerData(
      this.form.value.name,
      this.form.value.surname,
      this.form.value.email,
      this.form.value.password,
      this.form.value.profilePhoto
    );

    this.userService.registerHomeOwner(user).subscribe(
      () => {
        this._snackBar.open('Homeowner registered successfully!', 'Close', { duration: 1000 });
        this.goToLogin();
      },
      (error) => {
        this._snackBar.open(error.error.errorMessage, 'Close', { duration: 1000 });
      }
    );
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
