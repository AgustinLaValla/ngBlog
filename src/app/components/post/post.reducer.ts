import * as fromPOST from './post.actions';
import { PostI } from 'src/app/shared/model/post.interface';
import { createReducer, on, Action } from '@ngrx/store';

export interface PostState {
    all_post: PostI[],
    single_post: PostI;
    error: any
}

const initialState: PostState = {
    all_post: [],
    single_post: null,
    error: null
}

const reducer = createReducer(
    initialState,
    on(fromPOST.loadAllPostsSuccess, (state, action) => {
        //LOAD ALL POST
        return {
            ...state,
            all_post: [...action.posts.map(post => post)],
            single_post: null
        };
    }),
    on(fromPOST.loadAllPostsFailed, (state, action) => {
        return {
            ...state,
            error: { ...action.error }
        };
    }),
    on(fromPOST.loadSinglePostSuccess, (state, action) => {
        return {
            ...state,
            all_post: [],
            single_post: { ...action.post }
        };
    }),
    on(fromPOST.loadSinglePostFailed, (state, action) => {
        return {
            ...state,
            error: { ...action.error }
        }
    }),
    on(fromPOST.loadAddPostSuccess, (state, action) => {
        let newPost = { ...action.post };
        if (action.imageUrl) {
            newPost.imagePost = action.imageUrl;
        }
        let newState: PostState = {
            ...state,
            single_post: null,
            all_post: [...state.all_post, newPost]
        }
        return newState;
    }),
    on(fromPOST.loadAddPostFailed, (state, action) => {
        return {
            ...state,
            error: { ...action.error }
        };
    }),
    on(fromPOST.loadEditPostSuccess, (state, action) => {
        let new_Post = { ...action.post };
        if (action.imageUrl) new_Post.imagePost = action.imageUrl;

        const allPosts = state.all_post.filter((post: PostI) => {
            if (post.id === action.post.id) return new_Post;
            else return post
        });
        let new_State: PostState = {
            ...state,
            single_post: null,
            all_post: allPosts
        }
        return new_State
    }),
    on(fromPOST.loadEditPostFailed, (state, action) => {
        return {
            ...state,
            error: { ...action.error }
        };
    }),
    on(fromPOST.loadDeletePostSuccess, (state, action) => {
        return {
            ...state,
            all_post: [...state.all_post.filter(post => post.id == action.postId)]
        };
    }),
    on(fromPOST.loadDeletePostFailed, (state, action) => {
        return {
            ...state,
            error: { ...action.error }
        };
    })
);

export function postReducer(state: PostState | undefined = initialState, action: Action): PostState {
    return reducer(state, action);
};

export const getAllPostsSelector = (state: PostState) => state.all_post;
export const getSinglePostSelector = (state: PostState) => state.single_post;
export const getOpeationFailedSelector = (state: PostState) => state.error;