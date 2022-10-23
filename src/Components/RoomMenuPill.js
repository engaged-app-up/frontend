import React from "react";
const RoomMenuPill = (props) => {
    return (
        <button className={`${props.className} block room-menu-pill flex items-center gap-1 rounded-full text-sm px-4 py-1`} onClick={props.onClick}>{props.children}</button>
    )
}

export default RoomMenuPill;