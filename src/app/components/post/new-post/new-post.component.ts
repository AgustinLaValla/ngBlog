import { Component, OnInit,EventEmitter, Output } from '@angular/core';
import { PostI } from 'src/app/shared/model/post.interface';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { loadAddPost } from '../post.actions';


@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  public newPostForm = new FormGroup({
    'titlePost': new FormControl('', Validators.required),
    'imagePost': new FormControl('',Validators.required),
    'tagsPost': new FormControl('',Validators.required),
    'contentPost': new FormControl('',Validators.required)
  });
  private postImage: any;
  @Output() public closeModal = new EventEmitter<boolean>();

  constructor(private store:Store<AppState>) { }

  ngOnInit() {
  }

  addNewPost(newPostForm:PostI) {
    
    if(this.postImage) { 
      this.store.dispatch( new loadAddPost(newPostForm, this.postImage) );
      this.closeModal.emit(true);
    }else{
      this.store.dispatch(new loadAddPost(newPostForm));
      this.closeModal.emit(true);
    }

   }

  addImage(event) {
    this.postImage = event.target.files[0];
    console.log(this.postImage)
  }

}
