import {getPosts, getPostsFailure, getPostsRequest, getPostsSuccess, clearPosts} from "../actions";

export type PostStatus = 'pending' | 'success' | 'error'

export interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

export interface PostsState {
    postsStatus: PostStatus;
    postsContent: Record<string, Post>
}

export interface PostsEvents {
    [getPosts]: string
    [getPostsSuccess]: Post[]
    [getPostsFailure]: undefined
    [getPostsRequest]: undefined
    [clearPosts]: undefined
}

export interface PostsStore {
    posts: PostsState
}
