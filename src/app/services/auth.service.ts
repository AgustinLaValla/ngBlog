import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserI } from '../shared/model/user.interface';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { isNullOrUndefined } from 'util';
import { AngularFireStorage } from '@angular/fire/storage';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { getProfilePic } from '../components/shared/ui/profilepic.actions'
import { setUserAuth, unSetUserAuth, loadUpdateDisplayNameSuccess } from '../components/auth/auth.actions';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { UiService } from './ui.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public authState: firebase.User;
  public defaultUserPic: string;
  private uid: string;
  private userColl: AngularFirestoreCollection<UserI>;
  public profilePicUrl: string;
  private userData: UserI;

  constructor(private afa: AngularFireAuth,
    private router: Router,
    private storage: AngularFireStorage,
    private afs: AngularFirestore,
    private store: Store<AppState>,
    private uiService: UiService) {

    this.afa.authState.subscribe((state) => { this.authState = state });
    this.defaultUserPic = `https://firebasestorage.googleapis.com/v0/b/ngblog-99594.appspot.com
                           /o/defaultUserPic%2Fuse.png?alt=media&token=52f6ea23-f5d2-47f1-b563-b1a82f740c5f`;
    this.userColl = this.afs.collection<UserI>('users');
  }

  async signIn(user: UserI) {
    try {
      const { email, password } = user;
      const resp = await this.afa.auth.signInWithEmailAndPassword(email, password); //Send request and retrieve response
      this.authState = resp.user; //authoritation state
      this.uid = resp.user.uid // User Id
      this.router.navigate(['/']); // Render to dashboard
      if (isNullOrUndefined(this.afa.auth.currentUser.photoURL)) { //If the isn't picture set standar image
        this.afa.auth.currentUser.updateProfile({ photoURL: this.defaultUserPic });
      };
      const docRef = await this.userColl.doc(this.uid).get().toPromise();
      if (!docRef.exists) {
        await this.afs.collection('users').doc(this.afa.auth.currentUser.uid).set({
          displayName: resp.user.displayName,
          email: resp.user.email,
          photoURL: resp.user.photoURL
        });
      };
      const userData = await this.userColl.doc<UserI>(this.uid).valueChanges().toPromise();
      this.store.dispatch(setUserAuth({ userData }));
    } catch (error) {
      this.uiService.showSnack(error.message, 'OK', 3500);
    }
  };


  singOut() {
    this.afa.auth.signOut().then(() => {
      this.store.dispatch(unSetUserAuth())
      this.router.navigate(['/login']);
    });
  }


  async  updateProfile(profile: UserI): Promise<void> {
    try {
      await this.afa.auth.currentUser.updateProfile({ displayName: profile.displayName });
      await this.afs.collection('users').doc(this.afa.auth.currentUser.uid).update({ displayName: profile.displayName });
      Swal.fire('Profile Username Updated', 'Your profile has been updated', 'success');
      this.store.dispatch(loadUpdateDisplayNameSuccess({ profile }));
      const userData = await this.userColl.doc<UserI>(this.uid).valueChanges().toPromise();
      this.store.dispatch(setUserAuth({ userData }));
    } catch (error) {
      Swal.fire('Error', 'Se produjo un error al actualizar datoss', 'error');
    }
  };


  async updateProfilePicture(image: File) {
    try {
      await this.storage.upload('profileUserPics/' + this.afa.auth.currentUser.uid, image);
      const profilePicURL = await this.storage.ref('profileUserPics/' + this.afa.auth.currentUser.uid).getDownloadURL().toPromise();
      await this.afa.auth.currentUser.updateProfile({ photoURL: profilePicURL });
      await this.userColl.doc(this.afa.auth.currentUser.uid).update({ image: profilePicURL });
      this.store.dispatch(getProfilePic({ imgUrl: profilePicURL }))
      Swal.fire('Profile Picture Updated', 'Your profile picture has been updated', 'success')
      const userData = await this.userColl.doc<UserI>(this.uid).valueChanges().toPromise();
      this.store.dispatch(setUserAuth({ userData }));

    } catch (error) {
      Swal.fire('Fatal Error', 'Something has been very wrong :(', 'error')
    }
  }

};


