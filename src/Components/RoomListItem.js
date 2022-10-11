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
                {props.roomMemberCount} Participants
            </div>
            <div>
                <RiMenuLine />
            </div>
        </li>
}

export default RoomListItem;