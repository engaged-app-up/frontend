import React, {useState, useContext} from "react";

import { GlobalContext } from "../Context/GlobalContext/GlobalContext";
import Button from "./Button";

const CreateRoomForm = props => {
    const [roomForm, setRoomForm] = useState({roomName: '', roomDescription: ''});
    const [state, dispatch] = useContext(GlobalContext);

    const onClose = (e) => {
        e.preventDefault();
        setRoomForm({roomName: '', roomDescription: ''});
        props.closeModal();
    }

    const onInputChange = (e) => {
        setRoomForm({...roomForm, [e.target.name]: e.target.value});
    }

    return (
        <div className="create-room-container w-9/12 mx-auto">
            <form className="p-4 w-100 md:w-10/12 mx-auto">
                <h2 className="text-center p-4">Create a room, share with friends!</h2>
                <div className="mb-2 pb-4">
                    <label htmlFor="room-name" hidden>Room Name</label>
                    <input 
                        type="text" 
                        id="room-name"
                        name="roomName"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        placeholder="Room Name" 
                        value={roomForm.roomName}
                        onChange={(e) => {onInputChange(e)}}
                        required 
                    />
                </div>
                <div className="mb-2 pb-4">
                    <label htmlFor="room-name" hidden>Room Name</label>
                    <textarea 
                        id="room-description" 
                        name="roomDescription"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        placeholder="Room Description" 
                        value={roomForm.roomDescription}
                        onChange={(e) => {onInputChange(e)}}
                        required 
                    />
                </div>
                <div className="flex flex-col gap-2 md:gap-0 md:justify-between md:flex-row">
                            <Button size="small" className="modal-button" onClick={(e) => props.handleCreateRoom(e, roomForm.roomName, roomForm.roomDescription)}>Submit</Button>
                            <Button size="small" className="modal-button" onClick={(e) => onClose(e)}>Close</Button>
                        </div>
            </form>
        </div>
    )
}

export default CreateRoomForm;