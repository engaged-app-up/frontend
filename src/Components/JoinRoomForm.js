import React, {useState, useContext} from "react";
import { GlobalContext } from "../Context/GlobalContext/GlobalContext";
import Button from "./Button";

const JoinRoomForm = props => {
    const [joinFormData, setJoinFormData] = useState('');
    const [state, dispatch] = useContext(GlobalContext);

    const onInputChange = (e) => {
        setJoinFormData(e.target.value);
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
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
                        placeholder="ex: abcdefgh-1234-ijklm-5678-nopqrs909tuv" 
                        value={joinFormData}
                        onChange={(e) => {onInputChange(e)}}
                        required 
                        disabled={props.error}
                    />
                </div>
                <div className="flex flex-col gap-2 md:gap-0 md:justify-between md:flex-row">
                            <Button size="small" className="modal-button" onClick={(e) => props.handleJoinRoom(joinFormData, e)}>Submit</Button>
                            <Button size="small" className="modal-button" onClick={(e) => props.closeModal(e)}>Close</Button>
                        </div>
            </form>
        </div>
    )
}

export default JoinRoomForm;