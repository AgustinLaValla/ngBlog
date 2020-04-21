import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostDetailsRoutingModule } from './post-details-routing.module';
import { PostDetailsComponent } from './post-details.component';
import { PostComponent } from '../../post/post/post.component';
import { MaterialModule } from 'src/app/material/material.module';


@NgModule({
  declarations: [PostDetailsComponent, PostComponent],
  imports: [
    CommonModule,
    PostDetailsRoutingModule,
    MaterialModule
  ]
})
export class PostDetailsModule { }
