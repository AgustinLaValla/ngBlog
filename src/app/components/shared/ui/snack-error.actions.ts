import { props, createAction } from '@ngrx/store';

export const loadShowHttpErrorSnack = createAction(
    '[UI] Load Show Http Error Snack',
    props<{message:string, action:string, duration:number}>()
);