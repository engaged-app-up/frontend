import React from "react";
import { Dialog } from '@headlessui/react'

import Backdrop from "./Backdrop";
import './Modal.css'
import Button from "./Button";

const ModalError = props => {
    return (
        <div className={`text-center p-4 modal-error rounded-lg ${props.className}`}>
            {props.children}
        </div>
    )
}

const Modal = props => {
    if (props.show) {
        return (
            <>
                <Backdrop onClick={props.closeModal}/>
                <Dialog className={`modal ${props.className}`}open={props.show} onClose={() => console.log('close')}>
                    <Dialog.Panel className="modal-container bg-white px-4 py-4 rounded">
                        {props.modalError && <ModalError className="text-center">{props.modalError}</ModalError>}
                        {props.children}
                    </Dialog.Panel>
                </Dialog>
            </>
        )
    }
}

export default Modal;