import * as fromPOST from './post.actions';
import { PostI } from 'src/app/shared/model/post.interface';
import { InitialState } from '@ngrx/store/src/models';

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

export function postReducer(state: PostState = initialState, action: fromPOST.actions) {
    switch (action.type) {
        //LOAD ALL POST
        case fromPOST.LOAD_ALL_POSTS_SUCCESS:
            return {
                ...state,
                all_post: [...action.posts.map(post => post)],
                single_post: null
            }
        case fromPOST.LOAD_ALL_POSTS_FAILED:
            return {
                ...state,
                error: { ...action.error }
            }

        //LOAD SINGLEPOST
        case fromPOST.LOAD_SINGLE_POST_SUCCESS:
            return {
                ...state,
                all_post: [],
                single_post: { ...action.post }
            }

        case fromPOST.LOAD_SINGLE_POST_FAILED:
            return {
                ...state,
                error: { ...action.error }
            }


        //LOAD ADD POST
        case fromPOST.LOAD_ADD_POST_SUCCESS: {
            let newPost = { ...action.post };
            if (action.imageUrl) {
                newPost.imagePost = action.imageUrl;
            }
            let newState: PostState = {
                ...state,
                single_post: null,
                all_post: [...state.all_post, newPost]
            }
            return newState
        }


        case fromPOST.LOAD_ADD_POST_FAILED:
            return {
                ...state,
                error: { ...action.error }
            }

        //LOAD EDIT POST
        case fromPOST.LOAD_EDIT_POST_SUCCESS:{
            let new_Post = { ...action.post };
            if (action.imageUrl) {
                new_Post.imagePost = action.imageUrl;
            }
            let new_State: PostState = {
                ...state,
                single_post: null,
                all_post: [...state.all_post, new_Post]
            }
            return new_State
        }


        case fromPOST.LOAD_EDIT_POST_FAILED:
            return {
                ...state,
                error: {  ...action.error}
            }


        case fromPOST.LOAD_DELETE_POST_SUCCESS: 
        return {  
            ...state,
            all_post: [...state.all_post.filter(post => post.id == action.postId)]
        }


        case fromPOST.LOAD_DELETE_POST_FAILED:
            return { 
                ...state,
                error: {...action.error}
            }

        default: return state;

    }
}

export const getAllPostsSelector = (state: PostState) => state.all_post;
export const getSinglePostSelector = (state: PostState) => state.single_post;
export const getOpeationFailedSelector = (state:PostState) => state.error;