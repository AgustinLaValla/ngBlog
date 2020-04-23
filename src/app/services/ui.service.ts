import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  constructor(private snack: MatSnackBar) { }

  showSnack(message:string, action:string, duration:number) {
    this.snack.open(message, action, {duration})
   };

};
