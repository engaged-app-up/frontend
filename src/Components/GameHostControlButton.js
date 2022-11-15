import Button from "./Button";

import './GameHostControlButton.css';
const GameHostControlButton = ({children, popoverText}) => {

    return (
        <div className="host-control relative">
            <p className="hidden px-4 whitespace-nowrap game-button-popover centered-axis-x z-10 text-sm rounded-xl text-white bg-gradient-to-r from-sky-600 to-cyan-400">{popoverText}</p>
            <Button>{children}</Button>
        </div>
    )
}

export default GameHostControlButton;