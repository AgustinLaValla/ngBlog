import { Component, OnInit, Input } from '@angular/core';
import { PostI } from 'src/app/shared/model/post.interface';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  @Input() public posts:PostI[]

  constructor() { }

  ngOnInit() {
  }

}
