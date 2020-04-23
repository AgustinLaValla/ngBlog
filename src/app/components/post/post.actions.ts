import { Action, createAction, props } from '@ngrx/store';
import { PostI } from 'src/app/shared/model/post.interface';

//GET ALL POSTS
export const loadAllPosts = createAction(
    '[Post] Load All Posts',
);
export const loadAllPostsSuccess = createAction(
    '[POST] Load All Posts Success',
    props<{posts: PostI[]}>()
);
export const loadAllPostsFailed = createAction(
    '[Post]  Load All Posts Failed',
    props<{error: any}>()
);

//GET SINGLE POST
export const loadSinglePost = createAction(
    '[POST] Load Single Post',
    props<{postsId: string}>()
);
export const loadSinglePostSuccess = createAction(
    '[POST] Load Single Post Success',
    props<{post: PostI}>()
);

export const loadSinglePostFailed = createAction(
    '[POST] Load Single Post Failed',
    props<{error:any}>()
);

//ADD POST
export const loadAddPost = createAction(
    '[POST] Load Add Post',
    props<{ post:PostI, imagePost?:any}>()
);
export const loadAddPostSuccess = createAction(
    '[POST] Load Add Post Success',
    props<{ post:PostI, imageUrl?:string}>()
);
export const loadAddPostFailed = createAction(
    '[POST] Load Add Post Failed',
    props<{error:any}>()
);

//EDIT POST
export const loadEditPost  = createAction(
    '[POST] Load Edit Post',
    props<{post:PostI, imagePost?:any}>()
);

export const loadEditPostSuccess  = createAction(
    '[POST] Load Edit Post Success',
    props<{post:PostI, imageUrl?:string}>()
);
export const loadEditPostFailed = createAction(
    '[POST] Load Edit Post Failed',
    props<{error:any}>()
);

//DELETE POST
export const loadDeletePost = createAction(
    '[POST] Load Delete Post',
    props<{post:PostI}>()
);
export const loadDeletePostSuccess = createAction(
    '[POST] Load Delete Post Success',
    props<{postId:string}>()
);
export const loadDeletePostFailed = createAction(
    '[POST] Load Delete Post Failed',
    props<{error:any}>()
);
