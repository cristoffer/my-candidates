import React from "react";
import './style.scss';

export default function Button ({ onClick, label, type = 'button', addClasses}) {
	return (
		<button className={`button ${addClasses}`} type={type} onClick={onClick}>{label}</button>
	)
}