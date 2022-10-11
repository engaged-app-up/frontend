import React from 'react';
import './Button.css';

const Button = (props) => {
    //todo
    return (
        <>
            <button className={`rounded button button-${props.size || 'default'}`} onClick={props.onClick}>{props.children}</button>
        </>
    )
}

export default Button;