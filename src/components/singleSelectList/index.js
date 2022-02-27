import React, { useEffect, useState } from "react";

export default function SingleSelectList ({list, onSelect, label}) {
	const [selected, setSelected] = useState(list[0]);
	const [toggleDropDown, setToggleDropDown] = useState(false);

	const handleSelect = (item) => {
		console.log('********')
		console.log(item)
		setSelected(item);
		onSelect(item);
	}


	return (
		<div className="singleSelectList">
			<div className="singleSelectList__button" onClick={() => setToggleDropDown.bind(!toggleDropDown)}>
				<span className="singleSelectList__label">{label}: </span><span className="singleSelectList__labelSelected">{selected.label}</span>
			</div>
			<ul className="singleSelectList__list">
				{list.map((item, key) => 
					<li key={key} className="singleSelectList" onClick={() => handleSelect(item)}>
						{item.label}
					</li>
				)}
			</ul>
		</div>
	)
}