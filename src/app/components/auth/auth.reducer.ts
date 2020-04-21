import * as fromAuth from './auth.actions';
import { UserI } from 'src/app/shared/model/user.interface';
import { state } from '@angular/animations';

export interface AuthState { 
    state: boolean;
    userData? : UserI;
    error: any
}

const initialState:AuthState = {
    state: false,
    userData: null,
    error:null
}

export function authReducer(state:AuthState = initialState, action:fromAuth.actions): AuthState {
    switch(action.type) { 
        case fromAuth.SET_USER_AUTH:
            return {
                ...state,
                state:true,
                userData: {...action.userData}
            }
        case fromAuth.UNSET_USER_AUTH:
            return {
                ...state
            }

        case fromAuth.LOAD_UPDATE_PROFILE_PIC_SUCCESS: {
            if(action.profilePic) { 
                return {
                    ...state,
                    userData: {...state.userData,
                                photoURL: action.profilePic}
                }
            }else{
                return { ...state }
            }
         }

        case fromAuth.LOAD_UPDATE_PROFILE_PIC_FAILED:
            return {
                ...state,
                error: {...action.error}
            }

        case fromAuth.LOAD_UPDATE_DISPLAYNAME_SUCCESS: {
            return { 
                ...state,
                userData: {...state.userData,
                              displayName: action.profile.displayName
                }
            }
        }

        case fromAuth.LOAD_UPDATE_PROFILE_PIC_FAILED: 
            return { 
                ...state,
                error: {...action.error}
            }

        default: return state;
    }
 }

export const getUserData = (state:AuthState) => state.userData;
export const getCurrentState = (state:AuthState) => state.state;