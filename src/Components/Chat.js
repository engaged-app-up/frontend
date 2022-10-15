import { useEffect, useState } from "react";
import UserList from "./UserList";

export default function Chat({ socket, username, room }) {
  // Messages States
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);
  return (
    <>
      <div className="flex justify-center w-full bg-gray-100 text-gray-800">
        <div className="flex flex-col flex-grow ml-6 bg-white shadow-xl rounded-lg ">
          <div className="flex flex-col flex-grow p-4 overflow-auto">
            <div className="flex mt-2 space-x-3 max-w-xs">
              <div className="flex-shrink-0 h-10 w-10 "></div>
              <div>
                {messageList.map((messageContent) => {
                  return (
                    <div>
                      <div className="message-content">
                        <p className="bg-gray-100">{messageContent.message}</p>
                      </div>

                      <p id="time">{messageContent.time}</p>
                      <p id="author">{messageContent.author}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex w-full mt-2 space-x-3 max-w-xs"></div>
          </div>

          <div className="bg-gray-300  p-4 ">
            <input
              className="h-10 w-1/2"
              type="text"
              value={currentMessage}
              placeholder="Hey..."
              onChange={(event) => {
                setCurrentMessage(event.target.value);
              }}
              onKeyPress={(event) => {
                event.key === "Enter" && sendMessage();
              }}
            />
            <button class="  bg-green-500 text-white font-bold py-2 px-4 ml-48 rounded-full">
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
