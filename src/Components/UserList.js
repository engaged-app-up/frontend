import React, { useEffect, useState, useContext } from "react";
import "./UserList.css";

export default function UserList({
  username,
  photoURL,
  roomName,
  roomMembers,
  activeUsers,
}) {
  console.log(activeUsers, "active users in userList component");
  const [activeUserList, setActiveUserList] = useState([]);
  const activeUserIds = activeUsers.map((user) => user.userId);

  // active & inactiveUsers
  const displayedActive =
    roomMembers &&
    roomMembers.filter((user) => activeUserIds.includes(user.id));
  const inactiveUsers =
    roomMembers &&
    roomMembers.filter((user) => !displayedActive.includes(user));

  useEffect(() => {
    setActiveUserList([...activeUsers]);
  }, [activeUsers]);

  return (
    <div className="flex flex-col py-8 pl-6 pr-2 bg-white flex-shrink-0">
      <div className="flex flex-row items-center justify-center h-12 w-full">
        <div className="ml-2 font-bold justify-center text-2xl">{roomName}</div>
      </div>
      <div className="flex flex-col items-center bg-sky-100 border border-gray-200 mt-4 w-full py-6 px-4 rounded-lg">
        <div className="h-20 w-20 rounded-full border overflow-hidden">
          <img src={photoURL} alt="Avatar" className="h-full w-full" />
        </div>
        <div className="text-sm font-semibold mt-2">{username}</div>
        <div className="text-xs text-gray-500">Status</div>
      </div>
      <div className="flex flex-col mt-8">
        <div className="flex flex-row items-center justify-between text-xs">
          <span className="font-bold">Active Users</span>
          <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">
            {activeUsers && activeUsers.length}
          </span>
        </div>
        <ul className="active-list flex flex-col space-y-1 mt-4 -mx-2 h-auto overflow-y-auto">
          {displayedActive &&
            displayedActive
              .filter((user) => user.displayName !== username)
              .map((user) => {
                return (
                  <li>
                    <button className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2 w-full">
                      <div className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">
                        <img className="active-user" src={photoURL} />
                      </div>
                      <div className="ml-2 text-sm font-semibold">
                        {user.displayName}
                      </div>
                    </button>
                  </li>
                );
              })}
        </ul>
      </div>
      <div className="flex flex-col mt-8">
        <div className="flex flex-row items-center justify-between text-xs">
          <span className="font-bold">Inactive Users</span>
          <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">
            {inactiveUsers && inactiveUsers.length}
          </span>
        </div>
        <ul className="inactive-users flex flex-col space-y-1 mt-4 -mx-2 overflow-y-auto">
          {inactiveUsers &&
            inactiveUsers
              .filter((user) => user.displayName !== username)
              .map((user) => {
                return (
                  <li>
                    <button className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2 w-full">
                      <div className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">
                        <img src={photoURL} />
                      </div>
                      <div className="ml-2 text-sm font-semibold">
                        {user.displayName}
                      </div>
                    </button>
                  </li>
                );
              })}
        </ul>
      </div>
    </div>
  );
}
