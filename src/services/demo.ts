import { axiosClient, AxiosPromise } from './apiSettings';
import { urls } from './urls';
import { Post, CreatePost } from "../store/types";
const { demo } = urls;

export function apiGetPosts(): AxiosPromise<Post[]> {
    return axiosClient.get(
        `${demo}/posts`,
    );
}

export function apiCreatePost(
    params: CreatePost,
): AxiosPromise<Post> {
    return axiosClient.post(
        `${demo}/posts`,
        params,
    );
}
