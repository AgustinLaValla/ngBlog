import { createReducer, Action, on } from '@ngrx/store';
import { getProfilePic } from './profilepic.actions';

export interface ProfilePicState {
    profilePic: string;
};

const initialState:ProfilePicState = {
    profilePic: ''
};

const reducer = createReducer(
    initialState,
    on(getProfilePic, (state, action) => {
      return {
          ...state,
          profilePic: action.imgUrl
      };  
    })
);

export function profilPicReducer(state:ProfilePicState | undefined, action:Action): ProfilePicState{
    return reducer(state,action);
};




