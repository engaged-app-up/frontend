import React from "react";

import Button from "./Button";

const CreateRoomForm = props => {
    return (
        <div className="create-room-container w-9/12 mx-auto">
            <form className="p-4">
                <h2 className="text-center">Create a room, share with friends!</h2>
                <div>
                    <input type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required />
                </div>
                <div className="flex flex-col gap-2 md:gap-0 md:justify-between md:flex-row">
                            <Button size="small" className="modal-button">Submit</Button>
                            <Button size="small" className="modal-button" onClick={props.closeModal}>Close</Button>
                        </div>
            </form>
        </div>
    )
}

export default CreateRoomForm;