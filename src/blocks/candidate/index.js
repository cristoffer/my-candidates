import React, { useEffect, useState } from "react";
import types from '../../types'
import './style.scss';
import Button from '../../components/button';


const handleEditClick = function () {
	console.log('click')
}

export default function Candidate({ candidate }) {
	const { candidateProgress } = types;
	const [edit, setEdit] = useState();

	return (
		<li className="candidate">
			<div className="candidate__property">
				<span>{candidate.name}</span>
			</div>
			<div className="candidate__property">
				<span>{candidate.age}</span>
			</div>
			<div className="candidate__property">
				<span>{candidate.email}</span>
			</div>
			<div className="candidate__property">
				<span>{candidate.address}</span>
			</div>
			<div className="candidate__property">
				<span>{candidateProgress[candidate.progress]}</span>
			</div>
			<div className="candidate__property">
				<Button onClick={handleEditClick} label="Edit" addClasses="button__fullWidth"/>
			</div>
		</li>
	)
}