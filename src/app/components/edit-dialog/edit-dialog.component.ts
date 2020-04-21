import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PostI } from 'src/app/shared/model/post.interface';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent implements OnInit {

  public postEdit:PostI;

  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {message:string, content?: PostI}
  ) {  }

  ngOnInit() {
  }

  onClose(event) { 
    if(event){
      this.dialogRef.close();
    }
  }




}
