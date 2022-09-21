import io from "socket.io-client";
import { useState, useContext } from "react";
import Chat from "./Chat";
import { GlobalContext } from "../Context/GlobalContext/GlobalContext";
const socket = io("http://localhost:3001");

export default function Channel() {
  
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [state, dispatch] = useContext(GlobalContext);
  const username = state.user.displayName

  const joinRoom = () => {
    if (username !== "" && room !== "") {
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
          {/* <input
            type="text"
            placeholder="user...."
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          /> */}
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
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}