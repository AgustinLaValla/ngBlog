import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PostI } from 'src/app/shared/model/post.interface';

import { Store } from '@ngrx/store';
import { AppState, getLoadingValue, getSinglePost } from 'src/app/app.reducer';
import { deactivateLoading } from '../../shared/loading.actions';
import { Subscription } from 'rxjs';
import { loadSinglePost } from '../../post/post.actions';


@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {

  public post: PostI;
  public loading: boolean = false;
  public ui_subscription = new Subscription();


  constructor(private activatedRoute: ActivatedRoute,
              private store: Store<AppState>) {

    this.ui_subscription = this.store.select(getLoadingValue).subscribe(loading => this.loading = loading);

    this.activatedRoute.params.subscribe((params: Params) => {
      this.store.dispatch(new loadSinglePost(params.id))
    });
    this.store.select(getSinglePost).subscribe((post: PostI) => {
      this.post = post;
      this.store.dispatch(new deactivateLoading())
    })
  }

  ngOnInit() { }

  ngOnDestroy(): void {
    this.ui_subscription.unsubscribe();
  }

}
