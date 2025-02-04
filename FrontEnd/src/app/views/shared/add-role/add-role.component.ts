import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { AssignHomeOwnerRoleData } from '../../../models/AssignHomeOwnerRoleData';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.css'],
})
export class AddRoleComponent {
  form!: FormGroup;
  fileName: string = '';

  loading: boolean = false;

  private _snackBar = inject(MatSnackBar);

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      profilePhoto: ['', Validators.required],
    });
  }

  submit(): void {
    this.showLoading();
    if (this.form.valid) {
      var input = new AssignHomeOwnerRoleData(this.form.value.profilePhoto);
      this.userService.updateUserRoles(input).subscribe(
        (data) => {
          localStorage.removeItem('roles');
          localStorage.setItem('roles', JSON.stringify(data.roles));
          this.router.navigate(['/homeowner/homedevices']);
          this._snackBar.open('Permission added succesfully!', 'Close', {
            duration: 1000,
          });
          this.hideLoading();
        },
        (error) => {
          const errorMessage =
            error.error.errorMessage ||
            'Failed to add permission. Please try again later.';
          this._snackBar.open(errorMessage, 'Close', { duration: 3000 });
          this.hideLoading();
        }
      );
    }
  }

  showLoading(): void {
    this.loading = true;
  }

  hideLoading(): void {
    this.loading = false;
  }
}
