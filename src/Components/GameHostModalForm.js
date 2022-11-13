import { useEffect } from "react";
import { socket } from "../Context/SocketContext/socket";
import Button from "./Button";
const GameHostModalform = ({ showSetter, isRoomModeGame, room }) => {

    const onClose = (e) => {
        e.preventDefault();
        showSetter(false);
    }

    const onChange = (e) => {
        if (e.target.value == "chat") {
            socket.emit('room_state_change', {room: room, isRoomModeGame: false});
        } else {
            socket.emit('room_state_change', {room: room, isRoomModeGame: true});
        }
    }

    return (
        <>
            <div className="create-room-container w-9/12 mx-auto">
                <form className="p-4 w-100 md:w-10/12 mx-auto">
                    <label for="room-mode"><h1>Select room state.</h1></label>

                    <select value={isRoomModeGame ? "icebreakers" : "chat"} name="room-mode" id="room-mode" onChange={onChange}>
                        <option value="chat">Chat</option>
                        <option value="icebreakers">Icebreakers</option>
                    </select>
                    <div className="flex flex-col gap-2 md:gap-0 md:justify-between md:flex-row">
                        <Button size="small" className="modal-button" onClick={(e) => onClose(e)}>Close</Button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default GameHostModalform;