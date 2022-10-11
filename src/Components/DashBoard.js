import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../Context/GlobalContext/GlobalContext";

import Button from "./Button";
import RoomListItem from "./RoomListItem";

import './DashBoard.css'
const DashBoard = props => {
  const [state, dispatch] = useContext(GlobalContext);
  const {uid, displayName, photoURL, email} = state.user;
  const first = displayName.split(' ')[0];
  const [userRooms, setUserRooms] = useState([]);
  const [isRoomsLoading, setIsRoomsLoading] = useState(true);
  console.log(state.user.accessToken);

  const getUsersRooms = async () => {
    let fetchedRooms;
    const response =  await fetch(`http://localhost:3001/api/rooms/user/${uid}/rooms`, {
      headers: {
        'Authorization': `Bearer ${state.user.accessToken}`
      }
    });
    console.log(response);

    if (response.ok) {
      fetchedRooms = await response.json();
    }

    setUserRooms(fetchedRooms);
    setIsRoomsLoading(false);
  }
  useEffect(() => {
    console.log('useEffect to get userRooms');
    setUserRooms(getUsersRooms());
  }, []);

  // return (<div><h1>{`Hello ${displayName}! UID: ${uid} email: ${email} ${photoURL}`}</h1></div>);
  return (
    <div className="">
      <div className="dashboard container mx-auto rounded px-4">
        <div className="dashboard-header pt-7 text-center">
          <h1 className=" text-2xl md:text-5xl">Hello, {first}</h1>
        </div>
        <div className="dashboard-avatar pt-7 pb-7">
          <img className="mx-auto rounded-full" src={photoURL} alt="user avatar"/>
        </div>
        <div className="dashboard-buttons flex flex-col max-w-xs mx-auto mt-5">
          <Button>Create Room</Button>
          <Button>Join Room</Button>
        </div>
        <div className="dashboard-rooms mt-2 max-w-2xl mx-auto py-4">
          <h3 className="text-2xl md:text-4xl text-center py-6">Rooms</h3>
          <ul>
            {isRoomsLoading ? 'LOADING...' : userRooms.length > 0 ? userRooms.map(room => <RoomListItem key={room.id} roomName={room.name} roomDescription={room.description} roomMemberCount={room.memberIds.length}/>) : 'No rooms.'}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default DashBoard;