import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3001");

export default function Chat() {
  // Messages States
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");

  const sendMessage = () => {
    socket.emit("send_message", { message });
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      alert(data.message)
      setMessageReceived(data.message);
      
    });
  }, [socket]);
  return (
    <form>
      <label>
         
        <input
          type="textarea"
          placeholder="Message..."
          onChange={(event) => {
            setMessage(event.target.value);
          }}
        />
      </label>
      <button  onClick={sendMessage}>Send Message</button>
      <h1>Message:</h1>
      <h2>{messageReceived}</h2>
    </form>
  );
}
