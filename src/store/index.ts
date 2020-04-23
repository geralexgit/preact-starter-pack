import { createStoreon } from 'storeon';
import { storeonDevtools } from 'storeon/devtools';

import { posts as postsStore } from './posts';
import {PostsStore, PostsEvents} from "./types";

const initDevTools = process.env.NODE_ENV !== 'production' && storeonDevtools;

interface State extends PostsStore {}
interface Events extends PostsEvents {}

export const store = createStoreon<State, Events>([postsStore, initDevTools]);
