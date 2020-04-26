import {h, FunctionalComponent} from 'preact'
import * as styles from '../Modal/Modal.css';

interface Props {
    toggleModal: (e: MouseEvent) => void
}

const Modal: FunctionalComponent<Props> = (props) => {
    return (
        <div className={styles.modalWrapper}>
            <div className={styles.modalContent}>
                {props.children}
                <div className={styles.modalControls}>
                    <button className={styles.closeModalBtn} onClick={props.toggleModal}>close</button>
                </div>
            </div>
        </div>
    );
};

export default Modal
