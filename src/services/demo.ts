import { urls } from './urls';
import { Post, CreatePost } from "../store/types";
const { demo } = urls;

export function apiGetPosts(): Promise<Post[]> {
    return fetch(
        `${demo}/posts`,
    ).then((response) => {
        return response.json();
    })
}

export function apiCreatePost(
    params: CreatePost,
): Promise<Post> {
    return fetch(
        `${demo}/posts`,
        {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(params) // body data type must match "Content-Type" header
        }).then((response) => {
        return response.json();
    })
}
