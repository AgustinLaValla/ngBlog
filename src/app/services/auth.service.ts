import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserI } from '../shared/model/user.interface';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { isNullOrUndefined } from 'util';
import { AngularFireStorage } from '@angular/fire/storage';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { setUserAuth, unSetUserAuth } from '../components/auth/auth.actions';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public authState: firebase.User;
  public defaultUserPic: string;
  private uid:string;
  private userColl: AngularFirestoreCollection<UserI>;
  public profilePicUrl:string;

  constructor(private afa: AngularFireAuth,
              private router: Router,
              private storage: AngularFireStorage,
              private afs: AngularFirestore,
              private store: Store<AppState>) {

    this.afa.authState.subscribe((state) => this.authState = state);
    this.defaultUserPic = `https://firebasestorage.googleapis.com/v0/b/ngblog-99594.appspot.com
                           /o/defaultUserPic%2Fuse.png?alt=media&token=52f6ea23-f5d2-47f1-b563-b1a82f740c5f`;
    this.userColl = this.afs.collection<UserI>('users');
  }

  singIn(user: UserI) {
    const { email, password } = user;
    this.afa.auth.signInWithEmailAndPassword(email, password).then((resp) => {
      this.authState = resp.user;
      this.uid = resp.user.uid
      this.router.navigate(['/']);
      if (isNullOrUndefined(this.afa.auth.currentUser.photoURL)) {
        this.afa.auth.currentUser.updateProfile({
          photoURL: this.defaultUserPic
        })
      }
      this.userColl.doc(this.uid).get().subscribe(docRef => {
        if(!docRef.exists){ 
          this.afs.collection('users').doc(this.afa.auth.currentUser.uid).set({
            displayName: resp.user.displayName,
            email:resp.user.email,
            photoURL:resp.user.photoURL
          }).then(() => this.userColl.doc(this.uid).valueChanges().subscribe((userData:UserI) => 
                        this.store.dispatch(new setUserAuth(userData))))
        }else{
          this.userColl.doc(this.uid).valueChanges().subscribe((userData:UserI) => 
                        this.store.dispatch(new setUserAuth(userData)));
        }
      })
    }).catch((error) => console.log(error));

  }

  singOut() {
    this.afa.auth.signOut().then(() => {
      this.store.dispatch(new unSetUserAuth())
      this.router.navigate(['/login']);
    });
  }


  public updateProfile(profile: UserI) {
    this.afa.auth.currentUser.updateProfile({
      displayName: profile.displayName
    }).then(() => {
      this.afs.collection('users').doc(this.afa.auth.currentUser.uid).update({
        displayName:profile.displayName
      }).then(docRef => {
        this.userColl.doc<UserI>(this.uid).valueChanges().subscribe(userData => {
          this.store.dispatch(new setUserAuth(userData));
          Swal.fire('Profile Username Updated', 'Your profile has been updated', 'success')
        })
      })
      
    }).catch((Error) => Swal.fire('Error', 'Something was wrong :(', 'error'));
  }

  public updateProfilePicture(image: File):string {
    this.storage.upload('profileUserPics/' + this.afa.auth.currentUser.uid, image).then(() => {
      this.storage.ref('profileUserPics/' + this.afa.auth.currentUser.uid).getDownloadURL().subscribe((profilePicURL) => {
        this.profilePicUrl = profilePicURL
        this.afa.auth.currentUser.updateProfile({
          photoURL: profilePicURL
        }).then(() => {
          this.userColl.doc(this.afa.auth.currentUser.uid).update({
            image:profilePicURL
          }).then(()=> {
            this.userColl.doc<UserI>(this.uid).valueChanges().subscribe(userData => {
              this.store.dispatch(new setUserAuth(userData))
              Swal.fire('Profile Picture Updated', 'Your profile picture has been updated', 'success')
            })
          })
      })
          .catch((Error) => Swal.fire('Fatal Error', 'Something has been very wrong :(', 'error'));
      })
    })
    return this.profilePicUrl; 
  }
}
