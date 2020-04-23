import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { AuthService } from '../services/auth.service';
import { switchMap, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { loadUpdateProfile, loadUpdateProfileFailed, loadUpdateDisplayName } from '../components/auth/auth.actions';
import { UiService } from '../services/ui.service';

@Injectable()
export class AuthEffects {

    constructor(private action$: Actions, 
                private authService:AuthService) { }
    
    //loadUpdatePic Effect
    loadUpdatePic$$ = createEffect(() => this.action$.pipe(
        ofType(loadUpdateProfile),
        switchMap(({profilePic}) => of(this.authService.updateProfilePicture(profilePic)).pipe(
            catchError((error:any) => of(loadUpdateProfileFailed(error)))
        ))
    ), {dispatch:false});

    //loadUpdateName Effect
    loadUpdateDisplayName$ = createEffect(() => this.action$.pipe(
        tap(() => console.log('Por acá pasó')),
        ofType(loadUpdateDisplayName),
        switchMap(({profile}) => of(this.authService.updateProfile(profile)))
    ),{dispatch:false});

}