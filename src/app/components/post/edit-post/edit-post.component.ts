import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { PostI } from 'src/app/shared/model/post.interface';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { loadEditPost } from '../post.actions';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {

  private image:any;
  private originalImage:any;
  @Output() public closeModal = new EventEmitter<boolean>();

  @Input() post:PostI;
  public editPostForm = new FormGroup({
    'titlePost':  new FormControl('', Validators.required),
    'contentPost':  new FormControl('', Validators.required),
    'imagePost':  new FormControl('', Validators.required),
    'tagsPost':  new FormControl('', Validators.required),
    'id': new FormControl('', Validators.required)
  });

  constructor(private store:Store<AppState>) { }

  ngOnInit() {
    this.image = this.post.imagePost
    this.originalImage = this.post.imagePost;
    this.initValueForm();
  }

  editPost() { 
    if(this.image === this.originalImage) {
      this.editPostForm.value.imagePost = this.originalImage;
      this.store.dispatch(loadEditPost({post:this.editPostForm.value}));
      this.closeModal.emit(true);
    }else{
      this.store.dispatch(loadEditPost({post:this.editPostForm.value, imagePost:this.image}));
      this.closeModal.emit(true);
    }
   }
 
  handleImage(event) { 
    this.image = event.target.files[0];
   }

   private initValueForm(): void { 
     this.editPostForm.patchValue({
       id: this.post.id,
       titlePost: this.post.titlePost,
       contentPost: this.post.contentPost,
       tagsPost:this.post.tagsPost 
     })
   }

}
