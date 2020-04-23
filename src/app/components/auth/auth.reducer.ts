import * as fromAuth from './auth.actions';
import { UserI } from 'src/app/shared/model/user.interface';
import { createReducer, on, Action } from '@ngrx/store';

export interface AuthState {
    state: boolean;
    userData?: UserI;
    error: any
}

const initialState: AuthState = {
    state: false,
    userData: null,
    error: null
}

const reducer = createReducer(
    initialState,
    on(fromAuth.setUserAuth, (state, action) => {
        return {
            ...state,
            state: true,
            userData: { ...action.userData }
        };
    }),
    on(fromAuth.unSetUserAuth, (state) => {
        return {
            ...state
        };
    }),
    on(fromAuth.loadUpdateProfileSuccess, (state, action) => {
        if (action.profilePic) {
            return {
                ...state,
                userData: {
                    ...state.userData,
                    photoURL: action.profilePic
                }
            };
        } else {
            return { ...state }
        };
    }),
    on(fromAuth.loadUpdateProfileFailed, (state, action) => {
        return {
            ...state,
            error: { ...action.error }
        };
    }),
    on(fromAuth.loadUpdateDisplayNameSuccess, (state, action) => {
        return {
            ...state,
            userData: {
                ...state.userData,
                displayName: action.profile.displayName
            }
        };
    }),
    on(fromAuth.loadUpdateProfileFailed, (state, action) => {
        return {
            ...state,
            error: { ...action.error }
        };
    })

);

export function authReducer(state: AuthState | undefined = initialState, action: Action): AuthState {
    return reducer(state, action);
};

export const getUserData = (state: AuthState) => state.userData;
export const getCurrentState = (state: AuthState) => state.state;
