import { axiosClient, AxiosPromise } from './apiSettings';
import { urls } from './urls';
import { Post } from "../store/posts";
const { demo } = urls;

export function apiGetPosts(): AxiosPromise<Post[]> {
    return axiosClient.get(
        `${demo}/posts`,
    );
}
