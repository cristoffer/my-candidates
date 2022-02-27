import React, { useState } from "react";
import './style.scss';


export default function SingleSelectList ({list, onSelect, label, initValue}) {
	const [selected, setSelected] = useState(initValue ? initValue : list[0]);
	const [toggleDropDown, setToggleDropDown] = useState(false);

	const handleSelect = (item) => {
		setSelected(item);
		onSelect(item);
	}

	return (
		<div className="singleSelectList">
			<div className="singleSelectList__button" onClick={() => setToggleDropDown.bind(!toggleDropDown)}>
				<span className="singleSelectList__label">{label}: </span><span className="singleSelectList__labelSelected">{selected.label}</span>
			</div>
			<ul className="singleSelectList__list ${toggleDropDown ? 'singleSelectList__list--open' : ''}">
				{list.map((item, key) => 
					<li key={key} className="singleSelectList__listItem" onClick={() => handleSelect(item)}>
						{item.label}
					</li>
				)}
			</ul>
		</div>
	)
}