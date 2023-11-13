import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-search-dialog',
  templateUrl: './search-dialog.component.html',
  styleUrls: ['./search-dialog.component.css']
})
export class SearchDialogComponent {

  search: FormControl = new FormControl();

  constructor(
    public dialogRef: MatDialogRef<SearchDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: any,
  ){}

  onCloseDialog() {
    this.dialogRef.close(null);
  }

  searchSubmit() {
    this.dialogRef.close(this.search.value);
  }
}
