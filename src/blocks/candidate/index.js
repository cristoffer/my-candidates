import React, { useEffect, useState } from "react";
import types from '../../types'
import './style.scss';
import Button from '../../components/button';
import { BiCctv } from "react-icons/bi";
import AddCandidatesForm from '../../components/addCandidatesForm';


export default function Candidate({ candidate, edit }) {
	const { candidateProgress } = types;

	const handleClick = () => {
		edit(candidate)
	}

	return (
		<li className={`candidate candidate--progress${candidate.progress}`} onClick={() => handleClick()}>
			<div className="candidate__initial">
				<span>{candidate.name[0]}</span>
			</div>
			
			<div className="candidate__name">
				<span>{candidate.name} {candidate.age}</span>
				<span className="candidate__email">{candidate.email}</span>
				<span className="candidate__address">{candidate.address}</span>
			</div>
			
			<div className="candidate__property candidate__property--progress">
				<span className="candidate__icon--cctv"><BiCctv /></span><span>{candidateProgress[candidate.progress]}</span>
			</div>
		</li>
	)
}