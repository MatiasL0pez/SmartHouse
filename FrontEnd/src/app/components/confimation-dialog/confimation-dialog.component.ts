import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';

interface ConfirmationDialog {
  title: string;
  message: string;
}

@Component({
  selector: 'app-confimation-dialog',
  templateUrl: './confimation-dialog.component.html',
  styleUrls: ['./confimation-dialog.component.css']
})
export class ConfimationDialogComponent {
  title: string;
  message: string;

  constructor(
    public dialogRef: MatDialogRef<ConfimationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; message: string }
  ) {
    this.title = data.title;
    this.message = data.message;
  }

  onConfirm(): void {
      this.dialogRef.close(true);
  }

  onDismiss(): void {
      this.dialogRef.close(false);
  }
}
