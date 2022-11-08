import io from "socket.io-client";
import { useState, useContext } from "react";
import Chat from "./Chat";
import { GlobalContext } from "../Context/GlobalContext/GlobalContext";
import { SocketContext } from "../Context/SocketContext/socket";
import UserList from "./UserList";
import Game from "./Game";

export default function Channel() {
  const [room, setRoom] = useState("");
  const socket = useContext(SocketContext);
  const [showChat, setShowChat] = useState(false);
  const [state, dispatch] = useContext(GlobalContext);
  const username = state.user.displayName;

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <div className="App">
      {!showChat ? (
        <div>
          <h3>Join A Chat</h3>
          <h4>Hello {username}</h4>

          <input
            type="text"
            placeholder="Room ID..."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : (
        <>
          <div className="flex mt-5">
            <div className="flex">
              <UserList />
            </div>
            <div className="flex ml-5 w-9/12">
              <Chat socket={socket} username={username} room={room} />{" "}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
