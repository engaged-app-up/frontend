import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../Context/GlobalContext/GlobalContext";
import { getAuth, signOut } from "firebase/auth";

import {RiLogoutBoxRLine, RiSettings3Line} from "react-icons/ri";
import Button from "./Button";
import RoomListItem from "./RoomListItem";
import Modal from "./Modal";
import CreateRoomForm from "./CreateRoomForm";
import JoinRoomForm from "./JoinRoomForm";
import logo from "../assets/img/engaged.svg";

import './DashBoard.css'
const DashBoard = props => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [state, dispatch] = useContext(GlobalContext);
  const { uid, displayName, photoURL, email } = state.user;
  const first = displayName.split(' ')[0];

  // state
  const [userRooms, setUserRooms] = useState([]);
  const [isRoomsLoading, setIsRoomsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({}); //what we want to display in the modal component
  const [modalError, setModalError] = useState('');

  console.log(state.token);
  const closeModal = () => {
    setShowModal(false);
    setModalContent({});
  }

  const onModalError = async (error) => {
    setModalError(error);
    setTimeout(() => {
      setModalError('');
    }, 2000);
  }

  const handleSignout = async (e) => {
    e.preventDefault();
    if (state.user) {
      try {
        await signOut(auth);
        // await dispatch({type: 'LOGOUT'})
      } catch (err) {
        console.log(err);
      }
    } else {
      // navigate('/');
    }
  }

  //initial function to fetch user rooms.
  const getUsersRooms = async () => {
    let fetchedRooms;
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/rooms/user/${uid}/rooms`, {
      headers: {
        'Authorization': `Bearer ${state.token}`
      }
    });

    if (response.ok) {
      fetchedRooms = await response.json();
      setUserRooms(fetchedRooms);
      setIsRoomsLoading(false);
    } else {
      setIsRoomsLoading(false);
    }
  }

  /* 
    handleJoinRoom is used in the JoinRoomForm.
    attempts to join a user created room and if successful updates the
    room list with the newly joined room or displays an error in the modal.
  */

  const handleJoinRoom = async (roomCode, event) => {
    const body = { roomUuid: roomCode };
    event.preventDefault();
    let response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/rooms/join`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${state.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      response = await response.json();
      onModalError(response.error);
    }

    if (response.ok) {
      let room = await response.json();
      setUserRooms([...userRooms, room]);
      closeModal();
    }
  }

    /* 
      handleCreateRoom is used in the CreateRoomForm.
      attempts to create a new room and will display a
      any errors in the modal if unable to. 
    */

  const handleCreateRoom = async (event, roomName, roomDescription) => {
    event.preventDefault();
    const body = { name: roomName, description: roomDescription };
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/rooms/create`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${state.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    if (!res.ok) {
      let error = await res.json();
      onModalError(error.error);
    }

    if (res.ok) {
      let newRoom = await res.json();
      let ownedRooms = userRooms.filter(room => room.creatorId === state.user.id);
      let otherRooms = userRooms.filter(room => room.creatorId !== state.user.id);
      ownedRooms.push(newRoom);
      setUserRooms([...ownedRooms, ...otherRooms]);
      closeModal();
    }
  }

  useEffect(() => {
    console.log('useEffect to get userRooms');
    setUserRooms(getUsersRooms());
  }, []);

  return (
    <>
      <Modal className="w-11/12 md:w-5/12" closeModal={closeModal} show={showModal} modalError={modalError} setModalError={setModalError} handleCreateRoom={handleCreateRoom}>
        {modalContent.createRoom && <CreateRoomForm closeModal={closeModal} handleCreateRoom={handleCreateRoom} />}
        {modalContent.joinRoom && <JoinRoomForm closeModal={closeModal} error={modalError} setModalError={setModalError} handleJoinRoom={handleJoinRoom} />}
      </Modal>
      <aside className="block md:fixed z-1 top-0 pb-3 px-6 flex flex-col justify-between md:h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
        <div>
          <div className="-mx-6 px-6 py-4">
            <a href="#" title="home">
              <img src={logo} className="w-32 mx-auto" alt="tailus logo" />
            </a>
          </div>

          <div className="mt-8 text-center">
            <img src={photoURL} alt="" className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28" />
            <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block"><span className="px-1">🎉</span>{displayName}<span className="px-1">🎉</span></h5>
          </div>

          <ul className="space-y-2 tracking-wide mt-8">
            <li>
              <Button className="w-full" onClick={() => {
                setModalContent({ createRoom: true });
                setShowModal(!showModal);
              }}>+ Create Room</Button>
            </li>
            <li>
              <Button className="w-full" onClick={() => {
                setModalContent({ joinRoom: true })
                setShowModal(!showModal);
              }}>Join Room</Button>
            </li>
          </ul>
        </div>

        <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
          <button className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group" onClick={(e) => handleSignout(e)}>
            <RiLogoutBoxRLine className="text-xl"/>
            <span className="group-hover:text-gray-700">Logout</span>
          </button>
          <button className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
              <RiSettings3Line className="text-xl"/>
              <span className="group-hover:text-gray-700">Settings</span>
          </button>
        </div>
      </aside>
      <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
        <div className="px-6 pt-6 2xl:container">
          <div className="">
            <div className="md:col-span-2 lg:col-span-1" >
              <div className="py-8 px-6 rounded-xl">
                <h3 className="text-xl font-semibold text-gray-600 md:text-4xl text-center py-6">Rooms</h3>
                <ul className="flex flex-col gap-2">
                  {isRoomsLoading ? 'LOADING...' : userRooms.length > 0 ?
                    userRooms.map(room => <RoomListItem key={room.id}
                      roomName={room.name}
                      roomDescription={room.description}
                      roomMemberCount={room.memberIds.length}
                      roomCreatorId={room.creatorId}
                      uuid={room.uuid}
                    />) : 'No rooms.'}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>

  )
}

export default DashBoard;