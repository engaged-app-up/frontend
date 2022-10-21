import React from "react";
const RoomMenuPill = (props) => {
    return (
        <div className={`${props.className} room-menu-pill flex items-center gap-1 rounded-full text-sm px-4 py-1`}>{props.children}</div>
    )
}

export default RoomMenuPill;