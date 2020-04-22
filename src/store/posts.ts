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
    [getPostsSuccess]: Post[]
    [getPostsFailure]: undefined
    [getPostsRequest]: undefined
}

const initialState: PostsState = {
    status: "success",
    counter: 0,
    posts: {},
};

export const posts: StoreonModule<PostsState, PostsEvents> = store => {
    store.on('@init', () => (initialState));
    store.on(getPosts, async () => {
        store.dispatch(getPostsRequest);
        try {
            const data: Post[] = await fetch('https://jsonplaceholder.typicode.com/posts').then(response => response.json());
            store.dispatch(getPostsSuccess, data)
        } catch (e) {
            store.dispatch(getPostsFailure)
        }
    });
    store.on(getPostsRequest, state => ({
            ...state,
            status: 'pending',
        }));
    store.on(getPostsSuccess, (state, payload) => {
        const newPosts = payload.reduce((acc, next) => {
            return {
                ...acc,
                [next.id]: next
            }
        }, {});
        return ({
            ...state,
            status: 'success',
            posts: newPosts
        });
    });
    store.on(getPostsFailure, state => ({
        ...state,
        status: 'error'
    }))
};
