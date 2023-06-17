import React from 'react';

import "./ActionButton.css";

/**
 * @author Faruk Uçgun
 * @date 25.05.2023
 * @abstract: This is a custom button component
 */

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