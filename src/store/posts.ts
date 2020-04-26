import {StoreonModule} from 'storeon'

import {
    getPosts,
    getPostsSuccess,
    getPostsFailure,
    getPostsRequest,
    clearPosts,
    createPost,
    createPostSuccess
} from '../actions'

import {apiCreatePost, apiGetPosts} from '../services/demo'
import {PostsEvents, PostsStore} from './types'

const initialState: PostsStore = {
    posts: {
        postsStatus: "success",
        postsContent: {},
    }
};

export const posts: StoreonModule<PostsStore, PostsEvents> = store => {
    store.on('@init', () => (initialState));
    store.on(getPosts, async () => {
        store.dispatch(getPostsRequest);
        try {
            const data = await apiGetPosts();
            console.log(data);
            store.dispatch(getPostsSuccess, data)
        } catch (e) {
            store.dispatch(getPostsFailure)
        }
    });
    store.on(createPost, async (state, payload) => {
        store.dispatch(getPostsRequest);
        try {
            const data = await apiCreatePost(payload);
            store.dispatch(createPostSuccess, data)
        } catch (e) {
            store.dispatch(getPostsFailure)
        }
    });
    store.on(clearPosts, state => ({
        posts: {
            ...state.posts,
            postsContent: {}
        }
    }));
    store.on(getPostsRequest, state => ({
        posts: {
            ...state.posts,
            postsStatus: 'pending'
        }
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
            posts: {
                postsStatus: 'success',
                postsContent: newPosts
            }
        });
    });
    store.on(createPostSuccess, (state, payload) => {
        return ({
            ...state,
            posts: {
                ...state.posts,
                postsStatus: 'success',
                postsContent: {
                    ...state.posts.postsContent,
                    [payload.id]: payload
                }
            }
        });
    });
    store.on(getPostsFailure, state => ({
        ...state,
        posts: {
            ...state.posts,
            postsStatus: 'error'
        }
    }))
};
