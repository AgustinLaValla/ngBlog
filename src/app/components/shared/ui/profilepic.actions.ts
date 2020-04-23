import { createAction, props } from '@ngrx/store';

export const getProfilePic = createAction(
    '[PROFILE PIC] Get Profile Pic',
    props<{imgUrl:string}>()
);