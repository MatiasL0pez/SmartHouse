import { Component, inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RegisterCompanyOwnerAndAdminData } from '../../../../models/RegisterCompanyOwnerAndAdminData';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-register',
  templateUrl: './register-admin.component.html',
  styleUrls: ['./register-admin.component.css']
})
export class RegisterAdminComponent {  
  form!: FormGroup;
  selectedFile: File | null = null;
  imagePath: string = '';
  fileName: string = '';

  private _snackBar = inject(MatSnackBar);
  private dialogRef = inject(MatDialogRef<RegisterAdminComponent>);


  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.form.addControl('role', this.fb.control('', Validators.required));
  }

  register(): void {
    if (this.form.valid) {
      const selectedRole = this.form.value.role;
      if (selectedRole === 'companyOwner') {
        this.registerCompanyOwner();
      } else if (selectedRole === 'administrator') {
        this.registerAdministrator();
      }
    } else {
      this._snackBar.open('Not valid inputs', 'Close', { duration: 1000 });
    }
  }

  private registerCompanyOwner(): void {
    const user = new RegisterCompanyOwnerAndAdminData(
      this.form.value.name,
      this.form.value.surname,
      this.form.value.email,
      this.form.value.password
    );

    this.userService.registerCompanyOwner(user).subscribe(
      () => {
        this._snackBar.open('Company Owner registered successfully!', 'Close', { duration: 1000 });
        this.closeAndRedirect();
      },
      (error) => {
        this._snackBar.open(error.error.errorMessage, 'Close', { duration: 1000 });
      }
    );
  }

  private registerAdministrator(): void {
    const user = new RegisterCompanyOwnerAndAdminData(
      this.form.value.name,
      this.form.value.surname,
      this.form.value.email,
      this.form.value.password
    );

    this.userService.registerAdministrator(user).subscribe(
      () => {
        this._snackBar.open('Administrator registered successfully!', 'Close', { duration: 1000 });
        this.closeAndRedirect();
      },
      (error) => {
        this._snackBar.open(error.error.errorMessage, 'Close', { duration: 1000 });
      }
    );
  }

  private closeAndRedirect(): void {
    this.dialogRef.close(true);
    this.router.navigate(['/administrator/users']);
  }
}
