import { Injectable } from '@angular/core' 
import { Actions, createEffect, ofType } from '@ngrx/effects'; 
import {  UiService } from '../services/Ui.service'; 
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { loadShowHttpErrorSnack } from '../components/shared/ui/snack-error.actions';

@Injectable()
export class UiEffects { 
    constructor(private action$: Actions, private UiService: UiService) { }

    //loadShowHttpErrorSnack Effects
    loadShowHttpErrorSnack$ = createEffect(() =>  this.action$.pipe(
        ofType(loadShowHttpErrorSnack),
        switchMap(({message, action, duration}) => {
            console.log('DISPATCHED');
            return of(this.UiService.showSnack(message,action,duration))
        })
    ),{dispatch:false});
};