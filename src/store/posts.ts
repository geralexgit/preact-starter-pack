import {StoreonModule} from 'storeon'

import {getPosts, getPostsSuccess, getPostsFailure, getPostsRequest} from '../actions'

import { apiGetPosts } from '../services/demo'

type PostStatus = 'pending' | 'success' | 'error'

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
}

const initialState: PostsState = {
    postsStatus: "success",
    postsContent: {},
};

export const posts: StoreonModule<PostsState, PostsEvents> = store => {
    store.on('@init', () => (initialState));
    store.on(getPosts, async () => {
        store.dispatch(getPostsRequest);
        try {
            const { data } = await apiGetPosts();
            store.dispatch(getPostsSuccess, data)
        } catch (e) {
            store.dispatch(getPostsFailure)
        }
    });
    store.on(getPostsRequest, state => ({
        ...state,
        postsStatus: 'pending',
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
            postsStatus: 'success',
            postsContent: newPosts
        });
    });
    store.on(getPostsFailure, state => ({
        ...state,
        postsStatus: 'error'
    }))
};
