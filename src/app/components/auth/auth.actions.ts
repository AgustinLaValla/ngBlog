import {  createAction, props } from '@ngrx/store'
import { UserI } from 'src/app/shared/model/user.interface';
import { HttpErrorResponse } from '@angular/common/http';


//SET & UNSET USER STATE
export const setUserAuth = createAction(
    '[Auth] Set User Auth',
    props<{userData:UserI}>()
);
export const unSetUserAuth = createAction(
    '[Auth] Unset User Auth',
);


//UPDATE USER DATA: DISPLAYNAME
export const loadUpdateDisplayName = createAction(
    '[Auth] Load Update Profile Display Name',
    props<{profile:UserI}>()
);
export const loadUpdateDisplayNameSuccess = createAction(
    '[Auth] Load Update Profile Display Name Success',
    props<{profile:UserI}>()
);
export const loadUpdateDisplayNameFailed  = createAction(
    '[Auth] Load Update Profile Display Name Failed',
    props<{error:HttpErrorResponse}>()
);


//UPDATE USER DATA: PROFILE PICTURE
export const loadUpdateProfile = createAction(
    '[Auth] Load Update Profile',
    props<{profilePic:File}>()
);
export const loadUpdateProfileSuccess = createAction(
    '[Auth] Load Update Profile Success',
    props<{profilePic:string}>()
);
export const loadUpdateProfileFailed = createAction(
    '[Auth] Load Update Profile Failed',
    props<{error:HttpErrorResponse}>()
);
