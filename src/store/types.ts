import {getPosts, getPostsFailure, getPostsRequest, getPostsSuccess, clearPosts, createPost, createPostSuccess} from "../actions";

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

export interface PostsStore {
    posts: PostsState
}

export interface CreatePost extends Omit<Post, 'id'> {}

export interface PostsEvents {
    [getPosts]: string
    [getPostsSuccess]: Post[]
    [getPostsFailure]: undefined
    [getPostsRequest]: undefined
    [clearPosts]: undefined
    [createPost]: CreatePost
    [createPostSuccess]: Post
}
