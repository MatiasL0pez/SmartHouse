import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-photos-dialog',
  templateUrl: './view-photos-dialog.component.html',
  styleUrls: ['./view-photos-dialog.component.css']
})
export class ViewPhotosDialogComponent {
  currentIndex: number = 0;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { deviceName: string; photos: string[] }) {
    if (!data.photos || data.photos.length === 0) {
      console.warn('No photos provided for the dialog');
      this.data.photos = [];
    }
  }

  prevImage(): void {
    if (this.data.photos.length > 0) {
      this.currentIndex =
        (this.currentIndex > 0) ? this.currentIndex - 1 : this.data.photos.length - 1;
    }
  }

  nextImage(): void {
    if (this.data.photos.length > 0) {
      this.currentIndex =
        (this.currentIndex < this.data.photos.length - 1) ? this.currentIndex + 1 : 0;
    }
  }
}