import React, { useEffect, useState, useContext } from "react";
import { GlobalContext } from "../Context/GlobalContext/GlobalContext";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { SocketContext } from "../Context/SocketContext/socket";
import Chat from "../Components/Chat";
import UserList from "../Components/UserList";
import Game from "./Game";
import Modal from "./Modal";
import GameHostModalform from "./GameHostModalForm";
import { isRoomOwner } from "./RoomUtil";

import {
  RiLogoutBoxRLine,
  RiSettings3Line,
  RiArrowGoBackFill,
} from "react-icons/ri";

import logo from "../assets/img/engaged.svg";

const Room = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [state, dispatch] = useContext(GlobalContext); // global state.
  const socket = useContext(SocketContext); // global socket instance.
  const [roomDetails, setRoomDetails] = useState({});
  const [activeUsers, setActiveUsers] = useState([]);
  const [isRoomModeGame, setIsRoomModeGame] = useState(false);
  const uuid = useParams().uuid; //uuid of room.
  const username = state.user.displayName;
  const navigate = useNavigate();
  let room;

  const [showHostModal, setShowHostModal] = useState(false); //

  const getRoomDetails = async (uuid) => {
    let room;
    setIsLoading(true);
    let response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/rooms/${uuid}`,
      {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      }
    );

    if (response.ok) {
      room = await response.json();
      room.members = [room.creator, ...room.members];
      setRoomDetails(room);
      console.log(room);
    }
    setIsLoading(false);
    console.log(response);
  };

  const hostMenuHandler = (e) => {
    e.preventDefault();
    if (isRoomOwner(state.user.id, roomDetails.creatorId)) {
      setShowHostModal(true);
    }
  }

  const setRoomToGameMode = () => {
    setIsRoomModeGame(!isRoomModeGame);
  }

  useEffect(() => {
    getRoomDetails(uuid);
    socket.emit("join_room", uuid);
    socket.on("set_room_state", (data) => {
      setIsRoomModeGame(data);
    })
    return () => {
      socket.emit("leave_room", uuid);
    };
  }, []);

  useEffect(() => {
    socket.on("get_active_users", (userList) => {
      console.log(userList, "the user list");
      setActiveUsers([...userList]);
    });
  }, [socket]);

  if (isLoading) {
    return <h1>LOADING</h1>;
  }

  return (
    <>
      <Modal className="w-2/4" show={showHostModal}>
        <GameHostModalform showSetter={setShowHostModal} room={uuid} isRoomModeGame={isRoomModeGame} setIsRoomModeGame={setIsRoomModeGame}/>
      </Modal>
      <aside className="block md:fixed z-1 top-0 pb-3 px-6 flex flex-col justify-between md:h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
        <div>
          <div className="-mx-6 px-6 py-4">
            <a href="#" title="home">
              <img src={logo} className="w-32 mx-auto" alt="tailus logo" />
            </a>
          </div>
          <UserList
            photoURL={state.user.photoURL}
            username={state.user.displayName}
            roomName={roomDetails.name}
            roomMembers={roomDetails.members}
            activeUsers={activeUsers}
          />
        </div>

        <div className=" -mx-6 pt-4 flex justify-between items-center border-t">
          <button
            className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group"
            onClick={(e) => {
              e.preventDefault();
              navigate("/dashboard");
            }}
          >
            <RiArrowGoBackFill className="text-xl" />
            <span className="group-hover:text-gray-700">Dashboard</span>
          </button>
          <button className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group" onClick={(e) => hostMenuHandler(e)}>
            <RiSettings3Line className="text-xl" />
            <span className="group-hover:text-gray-700">Settings</span>
          </button>
        </div>
      </aside>
      <div className="ml-auto lg:w-[75%] xl:w-[80%] 2xl:w-[85%] h-screen px-4">
        <Chat className={`${isRoomModeGame && 'hidden'}`} socket={socket} username={username} room={uuid} />
        <Game className={`${!isRoomModeGame && 'hidden'}`} socket={socket} username={username} room={room} photoURL={state.user.photoURL}/>
      </div>
    </>
  );
};

export default Room;

{
  /* <div className="flex mt-5">
<div className="flex">
    <UserList />
</div>
<div className="flex ml-5 w-9/12">
    <Chat socket={socket} username={username} room={uuid} />{" "}
</div>
</div> */
}
