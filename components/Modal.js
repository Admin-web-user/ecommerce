import { Button } from 'react-bootstrap';
import ModalStyles from '../styles/modal.module.css';

export default function Modal({ show = false, body, head, handleClose }) {
    const handleClick = (e) => {
        if (e.target.id == "modal_wrapper") {
            handleClose();
        }
    }
    if (show) {
        return (
            <>
                <div className={ModalStyles._modal_wrapper} id="modal_wrapper" onClick={(e) => handleClick(e)} >
                    <div className={ModalStyles._modal}>
                        <div className="_modal-head py-2">
                            <div className="fs-4 fw-bold">{head}</div>
                        </div>
                        <div className="_modal-body  py-2"><b>{body}</b></div>
                        <div className="py-2 text-end">
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                        </div>
                    </div>
                </div>
            </>
        )
    }
    return null
}
