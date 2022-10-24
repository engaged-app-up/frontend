import React, {useEffect, useState, useContext} from "react";
import { GlobalContext } from "../Context/GlobalContext/GlobalContext";
import { useParams } from "react-router-dom";

let room;

const Room = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [state, dispatch] = useContext(GlobalContext);
    const [roomDetails, setRoomDetails] = useState({});
    const uuid = useParams().uuid;

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
        getRoomDetails(uuid);
    }, []);

    if (isLoading) {
        return <h1>LOADING</h1>
    }

    return(
        <div>
            <p>Room Name: {roomDetails.name}</p>
            <p>Room description: {roomDetails.description}</p>
            <h1>Members</h1>
            <ul>
                {!isLoading && roomDetails.members && roomDetails.members.map(member => <li>{member.displayName}</li>)}
            </ul>
        </div>
    )
}

export default Room;