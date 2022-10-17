import React from "react";

import './RoomListItem.css';
import { RiVipCrownLine, RiMenuLine } from 'react-icons/ri';

const RoomListItem = props => {
    return <li className="room-list-item rounded py-4 px-4 justify-between flex items-center gap-5">
            <div className="flex items-center gap-5">
            <RiVipCrownLine />
            <div className="room-indicator"></div>
            <div>
                <span className="room-title">{props.roomName}</span>
                <p>{props.roomDescription}</p>
            </div>
            </div>
            <div>
                {/* room members plus 1, this is including the room creator/host becuase they are not stored in normal members. should we change this? */}
                {props.roomMemberCount + 1} Participants
            </div>
            <div>
                <RiMenuLine />
            </div>
        </li>
}

export default RoomListItem;