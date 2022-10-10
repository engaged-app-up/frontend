import React from 'react';
import './Button.css';

const Button = ({label, onClick, styles}) => {
    //todo
    return (
        <>
            <button className={`rounded${styles ? ` ${styles}` : ''}`} onClick={onClick}>{label}</button>
        </>
    )
}

export default Button;