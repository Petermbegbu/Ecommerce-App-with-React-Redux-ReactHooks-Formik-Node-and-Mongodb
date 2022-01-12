import React from 'react'
import "./Button.css";

const Button = ({className, text, type, onClick}) => {
    return (
        <button type={type} className={className} onClick={onClick}>
            {text.toUpperCase()}
        </button>
    )
}

export default Button;