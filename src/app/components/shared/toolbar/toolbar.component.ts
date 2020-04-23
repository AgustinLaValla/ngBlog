import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service'
import { AppState, getCurrentUserState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  public appName:string = 'NgBlog';
  public isAuth:boolean = false;

  constructor(public authService:AuthService, store:Store<AppState>) { 
    store.select(getCurrentUserState).subscribe((isAuth:boolean)=> {
      console.log(isAuth);
      this.isAuth = isAuth
    });
  }

  ngOnInit() { }

  logout() { 
    this.authService.singOut();
  }

}
