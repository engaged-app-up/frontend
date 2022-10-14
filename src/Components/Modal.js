import React, { useState } from "react";
import { Dialog } from '@headlessui/react'

import Backdrop from "./Backdrop";
import './Modal.css'
import Button from "./Button";

const Modal = props => {
    if (props.show) {
        return (
            <>
                <Backdrop onClick={props.closeModal}/>
                <Dialog className="modal" open={props.show} onClose={() => console.log('close')}>
                    <Dialog.Panel className="modal-container bg-white px-4 py-4 rounded">
                        {props.children}
                        <Button size="small" className="modal-button">Submit</Button>
                        <Button size="small" className="modal-button" onClick={props.closeModal}>Close</Button>
                    </Dialog.Panel>
                </Dialog>
            </>
        )
    }
}

export default Modal;