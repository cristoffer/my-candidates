import React, { useEffect, useState } from "react";
import Candidate from '../candidate';
import CandidateService from '../../services/candidateService.js';
import LoadingSpinner from '../../components/loadingSpinner';
//import { CandidateService } from './services/candidateService';

export default function CandidateList () {
	const [isLoading, setIsLoading] = useState(false); 
	const [sortBy, setSortBy] = useState('name')

	useEffect(() => {
		setIsLoading(true)
    	
		CandidateService.fetch()
			.then((response) => {
				console.log('response', response)
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


			</ul>

			<LoadingSpinner isLoading={isLoading} />
		</div>
	);
}