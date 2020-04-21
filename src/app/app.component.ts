import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './app.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ngBlog'
  constructor(private store:Store<AppState>) { 
    this.store.select('auth').subscribe(); 
  }
}
