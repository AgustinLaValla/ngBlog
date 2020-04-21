import { Action } from '@ngrx/store';
import { PostI } from 'src/app/shared/model/post.interface';

//GET ALL POST
export const LOAD_ALL_POSTS = '[Post] Load All Posts';
export const LOAD_ALL_POSTS_SUCCESS = '[POST] Load All Posts Success';
export  const LOAD_ALL_POSTS_FAILED = '[Post]  Load All Posts Failed';

//GET SINGLE POST
export const LOAD_SINGLE_POST = '[POST] Load Single Post';
export const LOAD_SINGLE_POST_SUCCESS = '[POST] Load Single Post Success';
export const LOAD_SINGLE_POST_FAILED = '[POST] Load Single Post Failed';

//ADD POST
export const LOAD_ADD_POST = '[POST] Load Add Post';
export const LOAD_ADD_POST_SUCCESS = '[POST] Load Add Post Success';
export const LOAD_ADD_POST_FAILED = '[POST] Load Add Post Failed';

//EDIT POST
export const LOAD_EDIT_POST = '[POST] Load Edit Post';
export const LOAD_EDIT_POST_SUCCESS = '[POST] Load Edit Post Success';
export const LOAD_EDIT_POST_FAILED = '[POST] Load Edit Post Failed';

//DELETE POST
export const LOAD_DELETE_POST = '[POST] Load Delete Post';
export const LOAD_DELETE_POST_SUCCESS = '[POST] Load Delete Post Success';
export const LOAD_DELETE_POST_FAILED = '[POST] Load Delete Post Failed';


//GET ALL POSTS
export class loadAllPosts implements Action { 
    readonly type = LOAD_ALL_POSTS;
}

export class loadAllPostsSuccess implements Action { 
    readonly type = LOAD_ALL_POSTS_SUCCESS;
    constructor(public posts: PostI[]) { }
}

export class loadAllPostsFailed implements Action {
    readonly type = LOAD_ALL_POSTS_FAILED;
    constructor(public error: any) { }
} 

//GET SINGLE POST
export class loadSinglePost implements Action { 
    readonly type = LOAD_SINGLE_POST;
    constructor(public postsId: string) { } 
}

export class loadSinglePostSuccess implements Action { 
    readonly type = LOAD_SINGLE_POST_SUCCESS;
    constructor(public post: PostI) { } 
}

export class loadSinglePostFailed implements Action { 
    readonly type = LOAD_SINGLE_POST_FAILED;
    constructor(public error:any) { } 
}

//ADD POST
export class loadAddPost implements Action {
    readonly type = LOAD_ADD_POST;
    constructor(public post:PostI, public imagePost?:any) {  }
}

export class loadAddPostSuccess implements Action {
    readonly type = LOAD_ADD_POST_SUCCESS;
    constructor(public post:PostI, public imageUrl?:string) {  }
}

export class loadAddPostFailed implements Action {
    readonly type = LOAD_ADD_POST_FAILED;
    constructor(public error:any) {  }
}

//EDIT POST
export class loadEditPost implements Action {
    readonly type = LOAD_EDIT_POST;
    constructor(public post:PostI, public imagePost?:any) {  }
}

export class loadEditPostSuccess implements Action {
    readonly type = LOAD_EDIT_POST_SUCCESS;
    constructor(public post:PostI, public imageUrl?:string) {  }
}

export class loadEditPostFailed implements Action {
    readonly type = LOAD_EDIT_POST_FAILED;
    constructor(public error:any) {  }
}

//DELETE POST

export class loadDeletePost implements Action {
    readonly type = LOAD_DELETE_POST;
    constructor(public post:PostI) {  }
}

export class loadDeletePostSuccess implements Action {
    readonly type = LOAD_DELETE_POST_SUCCESS;
    constructor(public postId:string) {  }
}
export class loadDeletePostFailed implements Action { 
    readonly type = LOAD_DELETE_POST_FAILED;
    constructor(public error:any) { } 
}


export type actions =  loadAllPosts | loadAllPostsSuccess | loadAllPostsFailed | 
                       loadSinglePost | loadSinglePostSuccess | loadSinglePostFailed | 
                       loadAddPost | loadAddPostSuccess | loadAddPostFailed |
                       loadEditPost | loadEditPostSuccess | loadEditPostFailed | 
                       loadDeletePost | loadDeletePostSuccess | loadDeletePostFailed
