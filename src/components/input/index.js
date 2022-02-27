import React, { useState } from "react";
import './style.scss';

export default function Input ({type, value, name, onChange, schema, min, max, step}) {
	const [hasBlurred, setHasBlurred] = useState(false);
	const [hasErrors, setHasErrors] = useState(true);

	const handleChange = (e) => {
		onChange(e);

		if (schema) {
			const er = schema(e.target.value);
			setHasErrors(!e.target.value || !schema(e.target.value) ? true : false);
		} else {
			setHasErrors(!e.target.value)
		}
	}

	const handleBlur = (e) => {
		setHasBlurred(true);
		handleChange(e);
	}

	return (
		<div className={`input ${hasErrors && hasBlurred ? 'input--error':''} ${hasBlurred ? 'input--blurred' : ''} ${hasBlurred && !hasErrors ? 'input--valid': ''}`}>
			<input 
				className="input__field" 
				type={type} 
				value={value} 
				name={name} 
				onChange={(e) => handleChange(e)} 
				onBlur={(e) => handleBlur(e)} 
				min={min}
				max={max}
				step={step}/>
			{hasErrors && hasBlurred ?
				<span className="input__errormsg">Something is not right</span>
			: ''}
		</div>
	)
}