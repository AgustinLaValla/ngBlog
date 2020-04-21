import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { UserI } from '../../../shared/model/user.interface'
import { AppState, getOperationFailed } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import { getUserData } from '../../auth/auth.reducer';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { loadUpdateProfile, loadUpdateDisplayName } from '../../auth/auth.actions';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  public profile = new FormGroup({
    displayName: new FormControl('', Validators.required),
    email: new FormControl({value: '', disabled:true}, Validators.required),
    photoURL: new FormControl('', Validators.required),
  });
  public photoURL:string;
  private operationFailedSubscription = new Subscription();
  

  constructor(private store:Store<AppState>) { }

  ngOnInit() {
      this.store.select('auth').subscribe((authState) => {
      this.initValueForm(authState.userData);
    })
    this.operationFailedSubscription = this.store.select(getOperationFailed).subscribe((error:any) =>{ 
      if(error) { 
        this.onError(error)
      }
    });
  }

  private initValueForm(user:UserI): void { 

    this.profile.patchValue({
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
    });
    
  }

  public onSaveUser(profile:UserI) {
    this.store.dispatch(new loadUpdateDisplayName(profile));
   }

   updateProfileImage(event) { 
     this.store.dispatch(new loadUpdateProfile(event.target.files[0]))
   }

   onError(error:any) { 
    Swal.fire('Error!', error.message, 'error');
  }

   ngOnDestroy(): void {
    //  this.authSubscription.unsubscribe();
     this.operationFailedSubscription.unsubscribe();
   }

}
