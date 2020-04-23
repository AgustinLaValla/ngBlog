import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { UserI } from '../../../shared/model/user.interface'
import { AppState, getAuthError, getUserData, getProfilePic } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
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


  constructor(private store:Store<AppState>) {
    this.store.select(getProfilePic).subscribe((photoURL) => {
      console.log(photoURL);
      this.photoURL = photoURL;
    })
   }

  ngOnInit() {
      this.store.select(getUserData).subscribe((userData) => {
        if(userData) {
          this.photoURL = userData.photoURL;
          console.log();
      }
      this.initValueForm(userData);
    })
    this.operationFailedSubscription = this.store.select(getAuthError).subscribe((error:any) =>{ 
      console.log(error);
      if(error) { 
        this.onError(error)
      };
  
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
    console.log(profile)
    this.store.dispatch(loadUpdateDisplayName({profile:profile}));
   }

   updateProfileImage(event) { 
     this.store.dispatch(loadUpdateProfile({profilePic:event.target.files[0]}))
   }

   onError(error:any) { 
    Swal.fire('Error!', error.message, 'error');
  }

   ngOnDestroy(): void {
    //  this.authSubscription.unsubscribe();
     this.operationFailedSubscription.unsubscribe();
   }

}
