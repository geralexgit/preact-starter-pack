import {h, FunctionalComponent, Fragment} from "preact";
import {useStoreon} from "storeon/preact";
import {clearPosts} from "../../actions";

const Posts: FunctionalComponent = () => {
    const {dispatch, posts} = useStoreon('posts');
    const {postsContent} = posts;
    const noPosts = JSON.stringify({}) === JSON.stringify(postsContent);
    return (
        <div>
            {noPosts && <span>no posts</span>}
            {!noPosts &&
            <Fragment>
                <button className="button-primary" onClick={() => dispatch(clearPosts)}>clear posts</button>
                <table>
                    <thead>
                    <tr>
                        <th>usr</th>
                        <th>title</th>
                    </tr>
                    </thead>
                    <tbody>
                    {Object.keys(postsContent).map(postId => <tr key={postId}>
                        <td>{postsContent[postId].userId}</td>
                        <td>{postsContent[postId].title}</td>
                    </tr>)}
                    </tbody>
                </table>

            </Fragment>
            }
        </div>)
}

export default Posts;
