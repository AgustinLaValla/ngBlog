import { Action } from '@ngrx/store'
import { UserI } from 'src/app/shared/model/user.interface';

//SET & UNSET USER STATE
export const SET_USER_AUTH = '[Auth] Set User Auth';
export const UNSET_USER_AUTH = '[Auth] Unset User Auth';

//UPDATE USER DATA: DISPLAYNAME
export const LOAD_UPDATE_DISPLAYNAME = '[Auth] Load Update Profile Display Name';
export const LOAD_UPDATE_DISPLAYNAME_SUCCESS = '[Auth] Load Update Profile Display Name Success';
export const LOAD_UPDATE_DISPLAYNAME_FAILED = '[Auth] Load Update Profile Display Name Failed';


//UPDATE USER DATA: PROFILE PICTURE
export const LOAD_UPDATE_PROFILE_PIC = '[Auth] Load Update Profile';
export const LOAD_UPDATE_PROFILE_PIC_SUCCESS = '[Auth] Load Update Profile Success';
export const LOAD_UPDATE_PROFILE_PIC_FAILED = '[Auth] Load Update Profile Failed';


//SET & UNSET USER STATE
export class setUserAuth implements Action { 
    readonly type = SET_USER_AUTH;
    constructor(public userData:UserI) { }
}

export class unSetUserAuth implements Action { 
    readonly type = UNSET_USER_AUTH;    
}


//UPDATE USER DATA: DISPLAYNAME
export class loadUpdateDisplayName implements Action { 
    readonly type = LOAD_UPDATE_DISPLAYNAME;
    constructor(public profile:UserI) { }
}
export class loadUpdateDisplayNameSuccess implements Action { 
    readonly type = LOAD_UPDATE_DISPLAYNAME_SUCCESS;
    constructor(public profile: UserI) { }
}
export class loadUpdateDisplayNameFailed implements Action { 
    readonly type = LOAD_UPDATE_DISPLAYNAME_FAILED;
    constructor(public error:any) { }
}



//UPDATE USER DATA: PROFILE PICTURE
export class loadUpdateProfile implements Action { 
    readonly type = LOAD_UPDATE_PROFILE_PIC;
    constructor(public profilePic:File) {  }
}
export class loadUpdateProfileSuccess implements Action { 
    readonly type = LOAD_UPDATE_PROFILE_PIC_SUCCESS;
    constructor(public profilePic:string) {  }
}
export class loadUpdateProfileFailed implements Action { 
    readonly type = LOAD_UPDATE_PROFILE_PIC_FAILED;
    constructor(public error:any) {  }
}

export type actions = setUserAuth  | unSetUserAuth | 
                      loadUpdateProfile | loadUpdateProfileSuccess | loadUpdateProfileFailed | 
                      loadUpdateDisplayName | loadUpdateDisplayNameSuccess | loadUpdateDisplayNameFailed
