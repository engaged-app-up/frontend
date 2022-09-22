import { useEffect, useState } from "react";

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
    <body class="flex flex-col items-center justify-center w-screen min-h-screen bg-gray-100 text-gray-800 p-10">
      <div class="flex flex-col flex-grow w-full max-w-xl bg-white shadow-xl rounded-lg overflow-hidden">
        <div class="flex flex-col flex-grow h-0 p-4 overflow-auto">
          <div class="flex w-full mt-2 space-x-3 max-w-xs">
            <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
            <div rounded-full bg-gray-300>
              {messageList.map((messageContent) => {
                return (
                  <div>
                    <div className="message-content">
                      <p>{messageContent.message}</p>
                    </div>

                    <p id="time">{messageContent.time}</p>
                    <p id="author">{messageContent.author}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div class="flex w-full mt-2 space-x-3 max-w-xs"></div>
        </div>

        <div class="bg-gray-300 p-4">
          <input
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
          <button class="pl-5" onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </body>
  );
}
