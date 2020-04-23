import {h, FunctionalComponent} from 'preact'
import {useState} from "preact/hooks";
import {createPortal} from 'preact/compat';
import {useStoreon} from 'storeon/preact'
import Modal from '../Modal/Modal';

import style from '../Start/Start.css';
import {getPosts} from "../../actions";

const Start: FunctionalComponent = () => {
    const {dispatch, postsContent} = useStoreon('postsContent');
    const [modalIsOpen, toggleModal] = useState(false);
    function handleToggleModal(e: MouseEvent) {
        e.preventDefault();
        e.stopPropagation();
        toggleModal(!modalIsOpen);
    }
    const container = document.getElementById('modals');
    return (
        <div class={style.wrapper}>
            <pre>
                <button className="button-primary" onClick={handleToggleModal}>open modal</button>
            </pre>
            <pre>
                <button className="button-primary" onClick={() => dispatch(getPosts)}>get posts</button>
            </pre>
            {modalIsOpen && createPortal(<Modal toggleModal={handleToggleModal}/>, container)}
        </div>
    );
};

export default Start
