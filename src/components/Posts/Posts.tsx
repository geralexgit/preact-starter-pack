import {h, FunctionalComponent, Fragment} from "preact";
import {useStoreon} from "storeon/preact";
import {clearPosts} from "../../actions";
import {useState} from "preact/hooks";
import {createPortal} from "preact/compat";
import Modal from "../Modal/Modal";
import { modalContainer } from "../../app";

const Posts: FunctionalComponent = () => {
    const {dispatch, posts} = useStoreon('posts');
    const [modalState, setModalState] = useState({isOpen: false, postId: null});
    const {isOpen, postId} = modalState;
    const {postsContent} = posts;

    const noPosts = JSON.stringify({}) === JSON.stringify(postsContent);
    function handleToggleModal(e: MouseEvent) {
        e.preventDefault();
        e.stopPropagation();
        setModalState({isOpen: !isOpen, postId: modalState.postId})
    }
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
                    {Object.keys(postsContent).map(postId => <tr onClick={() => {
                        setModalState({isOpen: true, postId: postId});
                    }} key={postId}>
                        <td>{postsContent[postId].userId}</td>
                        <td>{postsContent[postId].title}</td>
                    </tr>)}
                    </tbody>
                </table>
                {isOpen && createPortal(<Modal toggleModal={handleToggleModal}>{postsContent[postId].body}</Modal>, modalContainer)}
            </Fragment>
            }
        </div>)
};

export default Posts;
