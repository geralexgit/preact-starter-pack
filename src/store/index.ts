import { createStoreon, StoreonModule } from 'storeon'
import { storeonDevtools } from 'storeon/devtools';

import { posts as postsStore, PostsState } from './posts'

const initDevTools = process.env.NODE_ENV !== 'production' && storeonDevtools;

export interface AppState {
    posts: PostsState,
}

const appStore = {
    posts: postsStore
}

export const store = createStoreon([postsStore, initDevTools]);
