import React, { useEffect, useState } from "react";
import Candidate from '../candidate';
import CandidateService from '../../services/candidateService.js';
import LoadingSpinner from '../../components/loadingSpinner';
import './style.scss';

export default function CandidateList () {
	const [isLoading, setIsLoading] = useState(false); 
	const [sortBy, setSortBy] = useState('name');
	const [candidates, setCandidates] = useState([]);

	useEffect(() => {
		setIsLoading(true)
    	
		CandidateService.fetch()
			.then((response) => {
				console.log('response', response);
				setCandidates(response.candidates)
			})
			.catch((e) => {
				console.log('catch')
				console.error(e)
			})
			.then(() => {
				console.log('last')
				setIsLoading(false);
			})
  	}, [sortBy]);

	return (
		<div className="candidateList">
			<div className="candidateList__filterContainer">

			</div>
			<ul className="candidateList__list">
				{candidates.map((item, key) => 
					<Candidate candidate={item} key={key} />
				)}

			</ul>

			<LoadingSpinner isLoading={isLoading} />
		</div>
	);
}