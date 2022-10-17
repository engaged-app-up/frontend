import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../Context/GlobalContext/GlobalContext";

import Button from "./Button";
import RoomListItem from "./RoomListItem";
import Modal from "./Modal";
import CreateRoomForm from "./CreateRoomForm";

import './DashBoard.css'
const DashBoard = props => {
  const [state, dispatch] = useContext(GlobalContext);
  const { uid, displayName, photoURL, email } = state.user;
  const first = displayName.split(' ')[0];
  const [userRooms, setUserRooms] = useState([]);
  const [isRoomsLoading, setIsRoomsLoading] = useState(true); 
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({}); //what we want to display in the modal component

  const closeModal = () => {
    setShowModal(false);
    setModalContent({});
  }

  const getUsersRooms = async () => {
    let fetchedRooms;
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/rooms/user/${uid}/rooms`, {
      headers: {
        'Authorization': `Bearer ${state.user.accessToken}`
      }
    });
    console.log(response);

    if (response.ok) {
      fetchedRooms = await response.json();
      setUserRooms(fetchedRooms);
      setIsRoomsLoading(false);
    }
  }

  useEffect(() => {
    console.log('useEffect to get userRooms');
    setUserRooms(getUsersRooms());
  }, []);

  return (
    <>
      <div className="">
      <Modal className="w-11/12 md:w-5/12" closeModal={closeModal} show={showModal}>
        {modalContent.createRoom && <CreateRoomForm closeModal={closeModal}/>}
        {modalContent.joinRoom && <p>Hello World</p>}
      </Modal>
        <div className="dashboard container mx-auto rounded px-4">
          <div className="dashboard-header pt-7 text-center">
            <h1 className=" text-2xl md:text-5xl">Hello, {first}</h1>
          </div>
          <div className="dashboard-avatar pt-7 pb-7">
            <img className="mx-auto rounded-full" src={photoURL} alt="user avatar" />
          </div>
          <div className="dashboard-buttons flex flex-col max-w-xs mx-auto mt-5">
            <Button onClick={() => {
              setModalContent({createRoom: true});
              setShowModal(!showModal);
            }}>Create Room</Button>
            <Button onClick={() => {
              setModalContent({joinRoom: true})
              setShowModal(!showModal);
            }}>Join Room</Button>
          </div>
          <div className="dashboard-rooms mt-2 max-w-2xl mx-auto py-4">
            <h3 className="text-2xl md:text-4xl text-center py-6">Rooms</h3>
            <ul>
              {isRoomsLoading ? 'LOADING...' : userRooms.length > 0 ? userRooms.map(room => <RoomListItem key={room.id} roomName={room.name} roomDescription={room.description} roomMemberCount={room.memberIds.length} />) : 'No rooms.'}
            </ul>
          </div>
        </div>
      </div>
    </>

  )
}

export default DashBoard;