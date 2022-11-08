import { useState } from "react";

export default function Game(socket, username, room, photoURL) {
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendAnswer = async () => {
    if (currentAnswer !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentAnswer,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
    }
  };

  return (
    <>
      <div className="flex justify-center w-full h-full text-gray-800">
        <div className="flex flex-col flex-grow ml-6 bg-white shadow-xl rounded-lg ">
          <div className="flex flex-col flex-grow p-4 overflow-auto">
            <div className="flex mt-6 justify-center ">
              <div className="flex flex-col justify-center ">
                <h1 className="mt-20 text-4xl font-bold"> Ice Breakers </h1>

                <p className="mt-20 text-blue-800 text-lg">Here is a question </p>

                <div className="flex mt-20 h-20 w-20 rounded-full border overflow-hidden">
                  <img src={photoURL} alt="Avatar" className="h-full w-full" />
                </div>
                
                <div className="flex flex-row mt-20">
                  <button className="bg-green-500 text-white font-bold h-12 w-32 rounded-full">
                    Response1
                  </button>
                  <button className="  bg-green-500 text-white font-bold h-12 w-32 ml-6 rounded-full">
                    Response2
                  </button>
                  <button className="  bg-green-500 text-white font-bold h-12 w-32 ml-6 rounded-full">
                    Response3
                  </button>
                </div>
                </div>
              
            </div>

            <div className="flex w-full mt-2 max-w-xs"></div>
          </div>

          <div className="bg-gray-300  p-4 ">
            <input
              className="pl-5 h-10 w-5/6 h-12 rounded-full"
              type="text"
              value={currentAnswer}
              placeholder="Hey..."
              onChange={(event) => {
                setCurrentAnswer(event.target.value);
              }}
              onKeyPress={(event) => {
                event.key === "Enter" && sendAnswer();
              }}
            />
            <button className="  bg-green-500 text-white font-bold h-12 w-20 ml-8 rounded-full">
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
