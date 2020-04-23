import { Component, OnInit } from '@angular/core';
import { PostI } from 'src/app/shared/model/post.interface';
import { Store } from '@ngrx/store';
import { AppState, getLoadingValue, getAllPosts, getOperationFailed } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';
import * as fromUI from '../../shared/ui/loading.actions';
import { loadAllPosts } from '../../post/post.actions';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private ui_subscription = new Subscription();
  public loading: boolean = false;

  public posts: PostI[] = [];
  private posts_subscription = new Subscription();

  private operationFailedSubscription = new Subscription();

  constructor(private store: Store<AppState>) {
    this.loadingSubscription();
    this.postsSubscription();
    this.errorSubscription();
  };

  ngOnInit() {
    this.store.dispatch(loadAllPosts());
  };

  loadingSubscription() {
    this.ui_subscription = this.store.select(getLoadingValue).subscribe(loading => this.loading = loading);
  };

  postsSubscription() {
    this.posts_subscription = this.store.select(getAllPosts).subscribe((posts: PostI[]) => {
      this.posts = posts;
      this.store.dispatch(new fromUI.deactivateLoading());
    });
  }

  errorSubscription() {
    this.operationFailedSubscription = this.store.select(getOperationFailed).subscribe((error: any) => {
      if (error) {
        this.onError(error);
      };
    });
  }

  onError(error: any) {
    Swal.fire('Error!', error.message, 'error');
  };


  ngOnDestroy(): void {
    this.ui_subscription.unsubscribe();
    this.posts_subscription.unsubscribe();
    this.operationFailedSubscription.unsubscribe();
  };

}
