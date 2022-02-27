import React, { useEffect, useState } from "react";
import Candidate from '../candidate';
import CandidateService from '../../services/candidateService.js';
import LoadingSpinner from '../../components/loadingSpinner';
import SingleSelectList from '../../components/singleSelectList';
import './style.scss';

export default function CandidateList () {
	const [isLoading, setIsLoading] = useState(false); 
	const [sortBy, setSortBy] = useState({value: 'name'});
	const [candidates, setCandidates] = useState([]);
	const [allCandidates, setAllCandidates] = useState([]);
	const sortList = [{label: 'Name', value: 'name'},{label: 'Age', value: 'age'},{label: 'Progress', value: 'progress'}]

	useEffect(() => {
		setIsLoading(true)
    	
		CandidateService.fetch()
			.then((response) => {
				console.log('response', response);
				setAllCandidates(response.candidates)
			})
			.catch((e) => {
				console.log('catch')
				console.error(e)
			})
			.then(() => {
				console.log('last')
				setIsLoading(false);
			})
  	}, []);

  	useEffect(() => {
	  	if (allCandidates && allCandidates.length) {
	  		setCandidates(CandidateService.sortBy(allCandidates,sortBy.value));
	  	}
  	}, [sortBy, allCandidates])

	return (
		<div className="candidateList">
			<div className="candidateList__filterContainer">
				<SingleSelectList list={sortList} label="Sort by" onSelect={setSortBy} />
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