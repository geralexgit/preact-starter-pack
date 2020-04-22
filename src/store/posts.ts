import {StoreonModule} from 'storeon'

import {getPosts, getPostsSuccess, getPostsFailure, getPostsRequest} from '../actions'

type PostStatus = 'pending' | 'success' | 'error'

export interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

export interface PostsState {
    status: PostStatus;
    counter: number,
    posts: Record<string, Post>
}

export interface PostsEvents {
    [getPosts]: string
    [getPostsFailure]: undefined
    [getPostsSuccess]: Post[]
    [getPostsRequest]: undefined
}

const initialState: PostsState = {
    status: "success",
    counter: 0,
    posts: {},
};

export const posts: StoreonModule<PostsState, PostsEvents> = store => {
    store.on('@init', () => (initialState));
    store.on(getPosts, async (state, user) => {
        store.dispatch(getPostsRequest)
        try {
            const data = await fetch('https://jsonplaceholder.typicode.com/posts').then(response => response.json());
            store.dispatch(getPostsSuccess, data)
        } catch (e) {
            store.dispatch(getPostsFailure)
        }
    });
    store.on(getPostsRequest, state => ({
        ...state,
        status: 'pending'
    }));
    store.on(getPostsSuccess, state => ({
        ...state,
        status: 'success'
    }));
    store.on(getPostsFailure, state => ({
        ...state,
        status: 'error'
    }))
};
