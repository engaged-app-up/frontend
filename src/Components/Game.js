import { useState, useContext } from "react";
import { GlobalContext } from "../Context/GlobalContext/GlobalContext";
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';
import Button from "./Button";

import './Game.css';

export default function Game({socket, username, room, photoURL, className}) {
  const [state, dispatch] = useContext(GlobalContext);

  return (
    <>
      <div className={`${className} flex justify-center w-full h-full text-gray-800`}>
        <div className="flex flex-col flex-grow ml-6 bg-white shadow-xl rounded-lg ">
          <div className="flex flex-col flex-grow p-4 overflow-auto">
            <div className="flex mt-6 justify-center ">
              <div className="flex flex-col justify-center items-center">
                <h1 className="text-xl font-semibold text-gray-600 md:text-4xl text-center py-6"><span>🧊</span>Ice Breakers<span>🧊</span></h1>
                <h2 className="text-xl font-semibold text-gray-600 md:text-3xl text-center py-6">A really interesting question?</h2>
                <div className="selected-user flex flex-col">
                  <div className="selected-user-header flex gap-2 justify-center items-center">
                    <span className="inline-block text-2xl">🎉</span>
                    <h3 className="text-xl font-semibold text-gray-600 md:text-2xl text-center py-6">Selected Username</h3>
                    <span className="inline-block text-2xl">🎉</span>
                  </div>
                  <div className="selected-avatar m-auto">
                    <img className="w-full" src={state.user.photoURL} />
                  </div>
                </div>
              </div>
            </div>
            <div className="reactions mx-auto flex justify-between items-center mt-16">
              <div className="w-1/4">
                <RiArrowLeftSLine className="text-2xl"/>
              </div>
              <div className="reaction-buttons w-2/4 flex justify-between">
                <Button className><span className="text-2xl mr-2">🤣</span> Funny</Button>
                <Button><span className="text-2xl mr-2">💡</span> Interesting</Button>
                <Button><span className="text-2xl mr-2">🤯</span> Woah!</Button>
              </div>
              <div className="w-1/4">
                <RiArrowRightSLine className="ml-auto text-2xl"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
