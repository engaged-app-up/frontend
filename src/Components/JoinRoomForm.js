import React, {useState, useContext} from "react";
import { GlobalContext } from "../Context/GlobalContext/GlobalContext";
import Button from "./Button";

const JoinRoomForm = props => {

    const [joinFormData, setJoinFormData] = useState('');
    const [state, dispatch] = useContext(GlobalContext);

    const onClose = (e) => {
        e.preventDefault();
        setJoinFormData('');
        props.closeModal();
        props.setModalError('');
    }

    const onSubmit = async (e) => {
        const body = {roomUuid: joinFormData};
        e.preventDefault();
        let response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/rooms/join`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${state.user.accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            response = await response.json();
            onError(response.error);
        }
        window.location.reload();
    }

    const onInputChange = (e) => {
        setJoinFormData(e.target.value);
    }

    const onError = async (error) => {
        props.setModalError(error);
        setTimeout(() => {
            props.setModalError('');
        }, 2000);
    }

    return (
        <div className="create-room-container w-9/12 mx-auto">
            <form className="p-4 w-100 md:w-10/12 mx-auto">
                <h2 className="text-center p-4">Enter your room join code!</h2>
                <div className="mb-2 pb-4">
                    <label htmlFor="room-name" hidden>Join Code</label>
                    <input 
                        type="text" 
                        id="join-code"
                        name="join-code"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        placeholder="ex: abcdefgh-1234-ijklm-5678-nopqrs909tuv" 
                        value={joinFormData}
                        onChange={(e) => {onInputChange(e)}}
                        required 
                        disabled={props.error}
                    />
                </div>
                <div className="flex flex-col gap-2 md:gap-0 md:justify-between md:flex-row">
                            <Button size="small" className="modal-button" onClick={(e) => onSubmit(e)}>Submit</Button>
                            <Button size="small" className="modal-button" onClick={(e) => onClose(e)}>Close</Button>
                        </div>
            </form>
        </div>
    )
}

export default JoinRoomForm;