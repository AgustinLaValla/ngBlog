import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { getCurrentUserState } from '../../app.reducer'
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private strore: Store<AppState>, private router:Router) {  }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.strore.select(getCurrentUserState).pipe(map((isGuard:boolean) => {
      if(isGuard){
        return true;
      }else{
        this.router.navigate(['/login']);
        return false;
      }
    }))
  }
  
}
