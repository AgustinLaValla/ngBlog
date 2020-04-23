import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects'
import { PostService } from 'src/app/services/post.service';

import { of } from 'rxjs';
import { switchMap, map, catchError} from 'rxjs/operators';
import { PostI } from 'src/app/shared/model/post.interface';
import { loadAllPosts, loadAllPostsSuccess, loadAllPostsFailed, loadSinglePost, loadSinglePostSuccess, 
    loadSinglePostFailed, loadAddPost, loadAddPostSuccess, loadAddPostFailed, loadEditPost, loadEditPostSuccess, loadEditPostFailed, 
    loadDeletePost, loadDeletePostSuccess, loadDeletePostFailed } 
    from '../components/post/post.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { UiService } from '../services/ui.service';

@Injectable()
export class PostEffects {
    constructor(private actions$: Actions,
                private postsService: PostService,
                private uiService: UiService) { }


    //LoadAllPosts Effect
    loadAllPost$ = createEffect(() => this.actions$.pipe(
        ofType(loadAllPosts),
        switchMap(() => this.postsService.getAllPost().pipe(
            map((posts: PostI[]) => loadAllPostsSuccess({ posts })),
            catchError((error: any) => of(loadAllPostsFailed(error)))
        ))
    ));
    //LoadSinglePost Effect
    loadSinglePost$ = createEffect(() => this.actions$.pipe(
        ofType(loadSinglePost),
        switchMap(({ postsId }) => this.postsService.getSinglePost(postsId).pipe(
            map((post: PostI) => loadSinglePostSuccess({ post })),
            catchError((error: HttpErrorResponse) => of(loadSinglePostFailed(error)))
        ))
    ));

    //LoadAddPost Effect
    loadAddPost$ = createEffect(() => this.actions$.pipe(
        ofType(loadAddPost),
        switchMap(({ post, imagePost }) => of(this.postsService.addPost(post, imagePost)).pipe(
            map((imageUrl: string) => loadAddPostSuccess({ post, imageUrl })),
            catchError((error: HttpErrorResponse) => of(loadAddPostFailed(error)))
        ))
    ));

    //LoadEditPost
    loadEditPost$ = createEffect(() => this.actions$.pipe(
        ofType(loadEditPost),
        switchMap(({ post, imagePost }) => of(this.postsService.updatePost(post, imagePost)).pipe(
            map((imageUrl: string) => loadEditPostSuccess({ post, imageUrl })),
            catchError((error: any) => of(loadEditPostFailed(error)))
        ))
    ));

    //LoadDeletePost
    loadDeletePost$ = createEffect(() => this.actions$.pipe(
        ofType(loadDeletePost),
        switchMap(({post}) => of(this.postsService.deletePost(post)).pipe(
            map(() => loadDeletePostSuccess({postId:post.id})),
            catchError((error: any) => of(loadDeletePostFailed(error)))
        ))
    ));

}
