import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects'
import { PostService } from 'src/app/services/post.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { of } from 'rxjs';
import { LOAD_ALL_POSTS, loadAllPostsSuccess, loadAllPostsFailed, LOAD_SINGLE_POST, loadSinglePost, loadSinglePostSuccess, 
         loadSinglePostFailed, LOAD_ADD_POST, loadAddPost, loadAddPostSuccess, loadAddPostFailed, LOAD_EDIT_POST, loadEditPost, 
         loadEditPostSuccess, loadEditPostFailed, LOAD_DELETE_POST, loadDeletePost, loadDeletePostSuccess, loadDeletePostFailed 
        } from '../components/post/post.actions';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { PostI } from 'src/app/shared/model/post.interface';

@Injectable()
export class PostEffects {
    constructor(private actions$: Actions,
                private postsService: PostService,
                private store: Store<AppState>) { }

    //ALL POSTS
    @Effect() loadAllPosts$  = this.actions$.pipe(
        ofType(LOAD_ALL_POSTS),
        switchMap(() => this.postsService.getAllPost().pipe(map((resp:PostI[])=>{
            return new loadAllPostsSuccess(resp)
        }), catchError(error => of(new loadAllPostsFailed(error)))
        
        ))
        )
    
    //SINGLE POST
    @Effect() loadSinglePosts$  = this.actions$.pipe(
        ofType(LOAD_SINGLE_POST),
        map((action: loadSinglePost) => action.postsId),
        switchMap((postId) => this.postsService.getSinglePost(postId).pipe(
                map((resp:PostI) => new loadSinglePostSuccess(resp),
                catchError((error) => of( new loadSinglePostFailed(error) ))
            ))
        )
    )

    //ADD POST
    @Effect() loadAddPost$ = this.actions$.pipe(
        ofType(LOAD_ADD_POST),
        map((action:loadAddPost) => action),
        switchMap((action:loadAddPost)=>  of(this.postsService.addPost(action.post,action.imagePost)).pipe(
            map((url:string) => new loadAddPostSuccess(action.post, url)),
            catchError(error => of(new loadAddPostFailed(error)))
        ))
    )

    //EDIT POST
    @Effect() loadEditPost$ = this.actions$.pipe(
        ofType(LOAD_EDIT_POST),
        map((action:loadEditPost) => action),
        switchMap((action:loadEditPost)=>  of(this.postsService.updatePost(action.post,action.imagePost)).pipe(
            map((url:string) => new loadEditPostSuccess(action.post, url)),
            catchError(error => of(new loadEditPostFailed(error)))
        ))
    )

    //DELETE POST
    @Effect() loadDeletePost$ = this.actions$.pipe(
        ofType(LOAD_DELETE_POST),
        map((action:loadDeletePost) => action.post),
        switchMap((action:PostI) =>of(this.postsService.deletePost(action)).pipe(
            map(() => new loadDeletePostSuccess(action.id)),
            catchError(error => of(new loadDeletePostFailed(error)))
        ))
    )

}
