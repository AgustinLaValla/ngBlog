import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AuthService } from '../services/auth.service';
import { LOAD_UPDATE_PROFILE_PIC, loadUpdateProfile, loadUpdateProfileSuccess, loadUpdateProfileFailed, LOAD_UPDATE_DISPLAYNAME, loadUpdateDisplayNameSuccess, loadUpdateDisplayNameFailed, loadUpdateDisplayName } from '../components/auth/auth.actions';
import { map, switchMap, catchError } from 'rxjs/operators';
import { UserI } from '../shared/model/user.interface';
import { of } from 'rxjs';

@Injectable()
export class AuthEffects {

    constructor(private action$: Actions, private authService:AuthService) { }
    
    @Effect() loadUpdatePic$ = this.action$.pipe(
        ofType(LOAD_UPDATE_PROFILE_PIC),
        map((profilePic: loadUpdateProfile) => profilePic.profilePic),
        switchMap((profilePic: File) => of(this.authService.updateProfilePicture(profilePic)).pipe(
            map((profilePicUrl:string)=> new loadUpdateProfileSuccess(profilePicUrl)),
            catchError((error:any) => of(new loadUpdateProfileFailed(error)))
        ))
    )

    @Effect() loadUpdateDisplayName = this.action$.pipe(
        ofType(LOAD_UPDATE_DISPLAYNAME),
        map((action:loadUpdateDisplayName)=> action.profile),
        switchMap((profile:UserI) => of(this.authService.updateProfile(profile)).pipe(
            map(()=> new loadUpdateDisplayNameSuccess(profile)),
            catchError((error:any) => of( new loadUpdateDisplayNameFailed(error) ))
        ))
    )

}