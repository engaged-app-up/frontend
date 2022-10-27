import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../Context/GlobalContext/GlobalContext";

import Button from "./Button";
import RoomListItem from "./RoomListItem";
import Modal from "./Modal";
import CreateRoomForm from "./CreateRoomForm";
import JoinRoomForm from "./JoinRoomForm";

import './DashBoard.css'
const DashBoard = props => {
  const [state, dispatch] = useContext(GlobalContext);
  const { uid, displayName, photoURL, email } = state.user;
  const first = displayName.split(' ')[0];

  // state
  const [userRooms, setUserRooms] = useState([]);
  const [isRoomsLoading, setIsRoomsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({}); //what we want to display in the modal component
  const [modalError, setModalError] = useState('');

  const closeModal = () => {
    setShowModal(false);
    setModalContent({});
  }

  //initial function to fetch user rooms.
  const getUsersRooms = async () => {
    let fetchedRooms;
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/rooms/user/${uid}/rooms`, {
      headers: {
        'Authorization': `Bearer ${state.user.accessToken}`
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

  useEffect(() => {
    console.log('useEffect to get userRooms');
    setUserRooms(getUsersRooms());
  }, []);

  return (
    <>
      <div className="mt-3">
        <Modal className="w-11/12 md:w-5/12" closeModal={closeModal} show={showModal} modalError={modalError} setModalError={setModalError}>
          {modalContent.createRoom && <CreateRoomForm closeModal={closeModal} />}
          {modalContent.joinRoom && <JoinRoomForm closeModal={closeModal} error={modalError} setModalError={setModalError} />}
        </Modal>
        <div className="dashboard container mx-auto rounded px-4">
          <div className="dashboard-header-wrapper bg-white rounded max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between relative p-4">
            <div className="dashboard-header-bg absolute bg-black"></div>
            <div className="dashboard-avatar pt-7 mb-2 w-1/3 px-7">
              <img className="mx-auto rounded-full" src={photoURL} alt="user avatar" />
            </div>
            <div className="dashboard-header text-center mb-2 w-1/3 px7">
              <h1 className="text-1xl md:text-2xl">{first}</h1>
            </div>
            <div className="dashboard-buttons flex flex-col w-1/3 px-7">
              <Button className="dashboard-btns" size="small" onClick={() => {
                setModalContent({ createRoom: true });
                setShowModal(!showModal);
              }}>+ Create Room</Button>
              <Button className="dashboard-btns" size="small" onClick={() => {
                setModalContent({ joinRoom: true })
                setShowModal(!showModal);
              }}>Join Room</Button>
            </div>
          </div>
          <div className="dashboard-rooms mt-2 max-w-2xl mx-auto py-4">
            <h3 className="text-2xl md:text-4xl text-center py-6">Rooms</h3>
            <ul>
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
    </>

  )
}

export default DashBoard;