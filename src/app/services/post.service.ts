import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { PostI } from '../shared/model/post.interface';
import { AngularFireStorage } from '@angular/fire/storage';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import { activateLoading } from '../components/shared/ui/loading.actions';
import { resolve } from 'url';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private postColl: AngularFirestoreCollection<PostI>;
  // public postSubject = new BehaviorSubject<PostI>();
  public imgURL:string


  constructor(private afs: AngularFirestore, 
              private storage: AngularFireStorage,
              private store:Store<AppState>) {
    this.postColl = this.afs.collection<PostI>('posts');
  };

  public getAllPost(): Observable<PostI[]> {
    this.store.dispatch( new activateLoading() );
    return this.postColl.snapshotChanges().pipe(map(action => action.map(ac => {
      const post = ac.payload.doc.data() as PostI;
      post.id = ac.payload.doc.id;
      return { ...post };
    })));
  };

  public getSinglePost(id: string): Observable<PostI> {
    this.store.dispatch( new activateLoading() )
    return this.afs.doc<PostI>(`posts/${id}`).valueChanges()
  };

  //ADD POST
  public addPost(post: PostI, imagePost?:File) {
    console.log(post, this.postColl, imagePost),
    this.postColl.add(post).then(docRef => {
      const postId = docRef.id;
      if(imagePost) {
       this.addOrUpdateImage(postId, imagePost)
      };
    });
    return this.imgURL  
  };
  
  //UPDATE POST
  public updatePost(post: PostI,imagePost?:File):string {
      this.postColl.doc(post.id).update(post).then(() => {
        const postId = post.id
        if(imagePost) {
          this.addOrUpdateImage(postId, imagePost);
        };
      });
    return this.imgURL;
  };
  //DELETE POST
  public deletePost(post:PostI) {
    if(post.imagePost != null && post.imagePost != undefined && post.imagePost != ''){
      this.storage.ref(`postImages/${post.id}`).delete();
    };
    return this.postColl.doc(post.id).delete();
  };

  //ADD OR UPDATE IMAGE
  public addOrUpdateImage(postId:string, imagePost) {
    this.storage.upload(`postImages/${postId}`, imagePost).then(() => {
      this.storage.ref(`postImages/${postId}`).getDownloadURL().subscribe((imageURL: string) => {
          this.postColl.doc(postId).update({imagePost: imageURL});
          this.imgURL = imageURL;
      });
    });
    // return this.imgURL;
  };

};
