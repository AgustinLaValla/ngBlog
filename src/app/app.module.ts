//Angular modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//Angular material
import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//Custom Modules
import { NewPostModule } from './components/post/new-post/new-post.module';
import { HomeModule } from './components/pages/home/home.module';
import { LoginModule } from './components/auth/login/login.module';
import { AdminModule } from './components/admin/admin.module';
//Routing
import { AppRoutingModule } from './app-routing.module';
//Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule, StorageBucket} from '@angular/fire/storage';
import { AngularFireAuthModule }from '@angular/fire/auth';
//Enviroment
import { environment } from 'src/environments/environment';
//NGRX
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { effectsArray } from './effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
//components
import { AppComponent } from './app.component';
import { NewPostComponent } from './components/post/new-post/new-post.component';
import { ContainerAppComponent } from './components/container-app/container-app.component';
import { ToolbarComponent } from './components/shared/toolbar/toolbar.component';
import { ProfileModule } from './components/admin/profile/profile.module';
import { EditDialogComponent } from './components/edit-dialog/edit-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditPostComponent } from './components/post/edit-post/edit-post.component';
import { appReducer } from './app.reducer';


@NgModule({
  declarations: [
    AppComponent,
    NewPostComponent,
    ContainerAppComponent,
    ToolbarComponent,
    EditDialogComponent,
    EditPostComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    NewPostModule,
    LoginModule,
    BrowserAnimationsModule,
    MaterialModule,
    AdminModule,
    StoreModule.forRoot(appReducer),
    EffectsModule.forRoot(effectsArray),
    AngularFireModule.initializeApp(environment.firebase),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    ProfileModule,
    ReactiveFormsModule,
  ],
  providers: [
    {provide: StorageBucket, useValue: 'ngblog-99594.appspot.com'}
  ],
  entryComponents: [
    EditDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
