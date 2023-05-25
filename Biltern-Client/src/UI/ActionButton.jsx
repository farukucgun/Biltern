import React from 'react';


const ActionButton = (props) => {

    const classname = props.className + " actionButton";

    return (
        <button className={props.className} onClick={props.onClick}>{props.text}</button>
    )
}

export default ActionButton;