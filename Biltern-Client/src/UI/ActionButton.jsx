import React from 'react';

import "./ActionButton.css";

const ActionButton = (props) => {

    const classname = props.className + " actionButton";

    return (
        <button 
            className={classname}
            onClick={props.onClick}
        >
            {props.text}
        </button>
    )
}

export default ActionButton;