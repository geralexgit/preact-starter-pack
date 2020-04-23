import {h, FunctionalComponent} from "preact";
import {useStoreon} from "storeon/preact";
import {getPosts, clearPosts} from "../../actions";

const GetPosts: FunctionalComponent = () => {
    const {dispatch, posts} = useStoreon('posts');
    const { postsStatus } = posts;
    return (<div>
        <button className="button-primary" onClick={() => dispatch(getPosts)}>get posts</button>
        postsStatus: {postsStatus}
    </div>)
};


export default GetPosts
