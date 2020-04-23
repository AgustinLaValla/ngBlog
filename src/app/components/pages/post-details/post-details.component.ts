import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PostI } from 'src/app/shared/model/post.interface';

import { Store } from '@ngrx/store';
import { AppState, getLoadingValue, getSinglePost, getOperationFailed } from 'src/app/app.reducer';
import { deactivateLoading } from '../../shared/ui/loading.actions';
import { Subscription } from 'rxjs';
import { loadSinglePost } from '../../post/post.actions';



@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {

  public loading: boolean = false;
  private ui_subscription = new Subscription();

  public post: PostI;
  private postSubs$ = new Subscription();

  private errorSubs$ = new Subscription();

  constructor(private activatedRoute: ActivatedRoute,
              private store: Store<AppState>) {

    this.loadingSubscription();
    this.getParamsAndLoadPost();
    this.postSubscription();
    this.errorSubscription();
  };

  ngOnInit() { }

  getParamsAndLoadPost() {
    this.activatedRoute.params.subscribe((params: Params) => this.store.dispatch(loadSinglePost({ postsId: params.id })));
  };

  postSubscription() {
    this.postSubs$ = this.store.select(getSinglePost).subscribe((post: PostI) => {
      this.post = post;
      this.store.dispatch(new deactivateLoading())
    });
  };

  loadingSubscription() {
    this.ui_subscription = this.store.select(getLoadingValue).subscribe(loading => this.loading = loading);
  };

  errorSubscription() {
    this.errorSubs$ = this.store.select(getOperationFailed).subscribe(console.log);
  }

  ngOnDestroy(): void {
    this.ui_subscription.unsubscribe();
    this.postSubs$.unsubscribe();
    this.errorSubs$.unsubscribe();
  };

}
