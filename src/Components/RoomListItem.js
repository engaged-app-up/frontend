import React from "react";

import './RoomListItem.css';
import { RiVipCrownLine, RiMenuLine, RiGroupLine } from 'react-icons/ri';

const RoomListItem = props => {
    return <li className="room-list-item rounded py-4 px-4">
        <div className="content-wrap justify-between flex items-center gap-5 flex-col sm:flex-row">
            <div className="flex flex-row items-center gap-5 grow justify-center">
                <div className="flex items-center gap-5 mr-auto">
                    <RiVipCrownLine />
                    <div className="room-indicator"></div>
                </div>
                <div>
                    <p className="room-title">{props.roomName}</p>
                </div>
                <div className="w-4/12 flex items-center gap-2 justify-center">
                    {/* room members plus 1, this is including the room creator/host becuase they are not stored in normal members. should we change this? */}
                    <RiGroupLine />
                    <p>{props.roomMemberCount + 1}</p>
                </div>
            </div>
            <div className="w-4/12 flex justify-center hidden sm:block">
                <RiMenuLine className="ml-auto" />
            </div>
        </div>
        <p className="sm:text-left text-center py-4 break-all">{props.roomDescription}</p>
        <div className="w-full flex justify-center block sm:hidden">
            <div><RiMenuLine /></div>
        </div>
    </li>
}

export default RoomListItem;