import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RoomMenuPill from "./RoomMenuPill";
import './RoomListItem.css';
import { RiVipCrownLine, RiMenuLine, RiGroupLine, RiDeleteBin5Line, RiShareBoxLine, RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri';
import { BsFillPersonFill } from 'react-icons/bs';
import { TbDoorEnter, TbDoorExit } from 'react-icons/tb';
import { GlobalContext } from "../Context/GlobalContext/GlobalContext";
import { SocketContext } from "../Context/SocketContext/socket";
import { getAuth } from "firebase/auth";


const RoomListItem = props => {
    const auth = getAuth();
    const navigate = useNavigate();
    const [state] = useContext(GlobalContext);
    const [showRoomMenu, setShowRoomMenu] = useState(false);
    const socket = useContext(SocketContext);
    console.log(socket.userId);
    const [isRoomActive, setIsRoomActive] = useState(false);

    const userId = state.user.id;
    const creatorId = props.roomCreatorId;

    const roomMenuButtonHandler = (e) => {
        e.preventDefault();
        setShowRoomMenu(!showRoomMenu);
    }

    const getRoomShareCode = () => {
        navigator.clipboard.writeText(props.uuid);
        props.inviteToasthandler();
    }

    const roomEnterHandler = async (e) => {
        e.preventDefault();
        await socket.emit('set_user_id', state.user.id);
        navigate(`/room/${props.uuid}`, {
            state: {
                name: props.roomName,
                description: props.roomDescription,
                uuid: props.uuid
            }
        });
    }

    useEffect(() => {
        socket.emit('is_room_active', props.uuid);
        socket.on('room_set_active', async (data) => {
            if (data.room == props.uuid && data.count > 0) {
                setIsRoomActive(true);
            }
        })
        socket.on('room_set_inactive', async (data) => {
            if (data == props.uuid) {
                setIsRoomActive(false);
            }
        })

        return () => {
            socket.removeAllListeners();
        }
    }, []);

    return <li className="room-list-item rounded py-4 px-4">
        <div className="content-wrap justify-between flex items-center gap-5 flex-col sm:flex-row">
            <div className="flex flex-row items-center gap-5 grow justify-center">
                <div className="flex items-center gap-5 mr-auto basis-1/3">
                    {userId === creatorId ? <RiVipCrownLine /> : <BsFillPersonFill />}
                    <div className={`room-indicator ${isRoomActive ? 'room-active' : 'room-inactive'}`}></div>
                </div>
                <div className="basis-1/3">
                    <p className="room-title">{props.roomName}</p>
                </div>
                <div className="w-4/12 flex items-center gap-2 justify-center basis-1/3">
                    {/* room members plus 1, this is including the room creator/host becuase they are not stored in normal members. should we change this? */}
                    <RiGroupLine />
                    <p>{props.roomMemberCount + 1}</p>
                </div>
            </div>
            <div className="w-4/12 flex justify-center hidden sm:block">
                <button className="block ml-auto" onClick={(e) => roomMenuButtonHandler(e)}>{!showRoomMenu ? <RiArrowDownSLine /> : <RiArrowUpSLine />}</button>
                {/* <RiMenuLine className="ml-auto" /> */}
            </div>
        </div>
        <p className="sm:text-left text-center py-4 break-all">{props.roomDescription}</p>
        <div className="w-full flex justify-center block sm:hidden mb-4">
            <button onClick={(e) => roomMenuButtonHandler(e)}>{!showRoomMenu ? <RiArrowDownSLine /> : <RiArrowUpSLine />}</button>
        </div>
        <div className={`rooms-menu mx-auto flex flex-col sm:flex-row justify-between gap-2 ${showRoomMenu ? 'block' : 'hidden'}`}>
            <RoomMenuPill className="room-enter" onClick={(e) => roomEnterHandler(e)}>
                <TbDoorEnter /> <span>Enter Room</span>
            </RoomMenuPill>
            {userId !== creatorId && (
                <RoomMenuPill className="room-exit" onClick={async () => {
                    let response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/rooms/leave/${props.uuid}`, {
                        method: 'PUT',
                        headers: {
                            'Authorization': `Bearer ${await auth.currentUser.getIdToken(true)}`
                        }
                    });
                    if (response.ok) {
                        window.location.reload();
                    }
                }}>
                    <TbDoorExit /> <span>Leave Room</span>
                </RoomMenuPill>
            )}
            {userId === creatorId && (
                <RoomMenuPill className="room-delete">
                    <RiDeleteBin5Line /> <span>Delete Room</span>
                </RoomMenuPill>
            )}
            {userId === creatorId && (
                <RoomMenuPill className="room-invite" onClick={getRoomShareCode}>
                    <RiShareBoxLine /> <span>Invite Code</span>
                </RoomMenuPill>
            )
            }
        </div>
    </li>
}

export default RoomListItem;