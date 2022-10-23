import React, { useState, useContext } from "react";
import RoomMenuPill from "./RoomMenuPill";
import './RoomListItem.css';
import { RiVipCrownLine, RiMenuLine, RiGroupLine, RiDeleteBin5Line, RiShareBoxLine } from 'react-icons/ri';
import { BsFillPersonFill } from 'react-icons/bs';
import { TbDoorEnter, TbDoorExit } from 'react-icons/tb';
import { GlobalContext } from "../Context/GlobalContext/GlobalContext";

const RoomListItem = props => {
    const [state] = useContext(GlobalContext);
    const [showRoomMenu, setShowRoomMenu] = useState(false);

    const userId = state.id;
    const creatorId = props.roomCreatorId;

    const roomMenuButtonHandler = (e) => {
        e.preventDefault();
        setShowRoomMenu(!showRoomMenu);
    }

    const getRoomShareCode = () => {
        navigator.clipboard.writeText(props.uuid);
    }

    return <li className="room-list-item rounded py-4 px-4">
        <div className="content-wrap justify-between flex items-center gap-5 flex-col sm:flex-row">
            <div className="flex flex-row items-center gap-5 grow justify-center">
                <div className="flex items-center gap-5 mr-auto basis-1/3">
                    {userId === creatorId ? <RiVipCrownLine /> : <BsFillPersonFill />}
                    <div className="room-indicator"></div>
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
                <button className="block ml-auto" onClick={(e) => roomMenuButtonHandler(e)}><RiMenuLine /></button>
                {/* <RiMenuLine className="ml-auto" /> */}
            </div>
        </div>
        <p className="sm:text-left text-center py-4 break-all">{props.roomDescription}</p>
        <div className="w-full flex justify-center block sm:hidden mb-4">
            <button onClick={(e) => roomMenuButtonHandler(e)}><RiMenuLine /></button>
        </div>
        <div className={`rooms-menu mx-auto flex flex-col sm:flex-row justify-between gap-2 ${showRoomMenu ? 'block' : 'hidden'}`}>
            <RoomMenuPill className="room-enter">
                <TbDoorEnter /> <span>Enter Room</span>
            </RoomMenuPill>
            <RoomMenuPill className="room-exit">
                <TbDoorExit /> <span>Leave Room</span>
            </RoomMenuPill>
            {userId === creatorId && (
                <RoomMenuPill className="room-delete">
                    <RiDeleteBin5Line /> <span>Delete Room</span>
                </RoomMenuPill>
            )}
            {userId === creatorId && (
                <RoomMenuPill className="room-enter" onClick={getRoomShareCode}>
                    <RiShareBoxLine /> <span>Invite Link</span>
                </RoomMenuPill>
            )
            }
        </div>
    </li>
}

export default RoomListItem;