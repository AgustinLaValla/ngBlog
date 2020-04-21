import * as fromAuth from './components/auth/auth.reducer';
import * as fromUI from './components/shared/loading.reducer';
import * as fromPosts from './components/post/post.reducer';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store'

export interface AppState {
    ui: fromUI.UI_State,
    auth: fromAuth.AuthState,
    posts: fromPosts.PostState
}

export const appReducer: ActionReducerMap<AppState> = {
    auth: fromAuth.authReducer,
    ui: fromUI.uiReducer,
    posts: fromPosts.postReducer
}

//SELECTORS

//auth selectors
export const getUserState = createFeatureSelector<fromAuth.AuthState>('auth');
export const getUserDataState = createSelector(getUserState, fromAuth.getUserData)
export const getCurrentUserState = createSelector(getUserState, fromAuth.getCurrentState);

//ui selectors
export const getLoadingState = createFeatureSelector<fromUI.UI_State>('ui');
export const getLoadingValue = createSelector(getLoadingState, fromUI.getLoading);

//posts selectors
export const getPostsState = createFeatureSelector<fromPosts.PostState>('posts');
export const getAllPosts = createSelector(getPostsState, fromPosts.getAllPostsSelector);
export const getSinglePost = createSelector(getPostsState, fromPosts.getSinglePostSelector)
export  const getOperationFailed = createSelector(getPostsState, fromPosts.getOpeationFailedSelector);