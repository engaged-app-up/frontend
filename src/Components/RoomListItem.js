import React from "react";

import './RoomListItem.css';
import { RiVipCrownLine } from 'react-icons/ri';

const RoomListItem = props => {
    return <li className="room-list-item rounded py-4 px-2 flex items-center gap-5">
            <RiVipCrownLine />
            <div className="room-indicator"></div>
            <div>
                <span className="room-title">Room Name</span>
                <p>A Room Description</p>
            </div>
        </li>
}

export default RoomListItem;