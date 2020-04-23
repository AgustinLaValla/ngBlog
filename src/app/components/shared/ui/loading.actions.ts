import { Action } from '@ngrx/store';

export const ACTIVATE_LOADING = '[UI] Activate Loading';
export const DEACTIVATE_LOADING = '[Ui] Deactivate Loading';

export class activateLoading implements Action { 
    readonly type = ACTIVATE_LOADING;
}
export class deactivateLoading implements Action {
    readonly type = DEACTIVATE_LOADING;
}

export type actions = activateLoading | deactivateLoading;