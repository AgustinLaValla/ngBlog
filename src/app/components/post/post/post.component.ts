import { Component,  Input } from '@angular/core';
import { PostI } from 'src/app/shared/model/post.interface';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {

  @Input() public post: PostI;
 
  constructor() { }


}
