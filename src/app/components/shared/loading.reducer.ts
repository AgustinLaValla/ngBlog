import * as fromUI from './loading.actions'

export interface UI_State { 
    loading: boolean;
}
const initialState: UI_State = {
    loading: false
};

export function uiReducer(state:UI_State = initialState, action:fromUI.actions) { 
    switch(action.type) { 
        case fromUI.ACTIVATE_LOADING:
            return {
                loading:true
            };
        case fromUI.DEACTIVATE_LOADING:
            return {
                loading: false
            } ;
        default: return state;
    }
}

export const getLoading = (state:UI_State) => state.loading;