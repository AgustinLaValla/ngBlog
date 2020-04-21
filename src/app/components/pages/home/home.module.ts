import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from 'src/app/material/material.module';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { PostsComponent } from '../../post/posts/posts.component';


@NgModule({
  declarations: [HomeComponent, PostsComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule
  ],
  exports:[MaterialModule]
})
export class HomeModule { }
