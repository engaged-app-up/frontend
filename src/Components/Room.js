import React, { useEffect, useState, useContext } from "react";
import { GlobalContext } from "../Context/GlobalContext/GlobalContext";
import { useParams, useLocation } from "react-router-dom";
import { SocketContext } from "../Context/SocketContext/socket";
import Channel from "../Components/Channel";
import Chat from "../Components/Chat";
import UserList from "../Components/UserList";

let room;

const Room = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [state, dispatch] = useContext(GlobalContext);
    const socket = useContext(SocketContext);
    const [roomDetails, setRoomDetails] = useState({});
    const uuid = useParams().uuid;
    const roomInfo = useLocation().state;
    const username = state.user.displayName;

    console.log(roomInfo);

    const getRoomDetails = async (uuid) => {
        setIsLoading(true);
        let response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/rooms/${uuid}`, {
            headers: {
                'Authorization': `Bearer ${state.token}`
            }
        })

        if (response.ok) {
            room = await response.json();
            room.members = [room.creator, ...room.members];
            setRoomDetails(room);
        }
        setIsLoading(false);
        console.log(response);
    }

    useEffect(() => {
        socket.emit("join_room", uuid);
        getRoomDetails(uuid);

        return () => {
            //
        }
    }, []);

    if (isLoading) {
        return <h1>LOADING</h1>
    }

    return (
        <div className="flex mt-5">
            <div className="flex">
                <UserList />
            </div>
            <div className="flex ml-5 w-9/12">
                <Chat socket={socket} username={username} room={uuid} />{" "}
            </div>
        </div>
    )
}

export default Room;