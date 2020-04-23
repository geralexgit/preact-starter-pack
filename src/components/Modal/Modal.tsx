import {h, FunctionalComponent} from 'preact'
import * as styles from '../Modal/Modal.css';

interface Props {
    toggleModal: (e: MouseEvent) => void
}

const Modal: FunctionalComponent<Props> = (props) => (
    <div className={styles.modalWrapper}>
        <div className={styles.modalContent}>
            {props.children}
            <button onClick={props.toggleModal}>close</button>
        </div>
    </div>
);

export default Modal
