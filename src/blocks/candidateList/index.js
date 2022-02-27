import React, { useEffect, useState } from "react";
import Candidate from '../candidate';
import CandidateService from '../../services/candidateService.js';
import LoadingSpinner from '../../components/loadingSpinner';
import SingleSelectList from '../../components/singleSelectList';
import AddCandidatesForm from '../../components/addCandidatesForm';
import './style.scss';



export default function CandidateList () {
	const [isLoading, setIsLoading] = useState(false); 
	const [sortBy, setSortBy] = useState({value: 'name', label: 'Name'});
	const [candidates, setCandidates] = useState([]);
	const [allCandidates, setAllCandidates] = useState([]);
	const [editCandidate, setEditCandidate] = useState(false)
	const [search, setSearch] = useState('');
	const sortList = [{label: 'Name', value: 'name'},{label: 'Age', value: 'age'},{label: 'Progress', value: 'progress'}];

	useEffect(() => {
		setIsLoading(true)
    	
		CandidateService.fetch()
			.then((response) => {
				console.log('response', response);
				setAllCandidates(response.candidates)
			})
			.catch((e) => {
				console.error(e)
			})
			.then(() => {
				setIsLoading(false);
			})
  	}, []);

  	useEffect(() => {
  		setEditCandidate(false)
	  	if (allCandidates && allCandidates.length) {
	  		const list = CandidateService.sortBy(allCandidates, sortBy.value);
	  		setCandidates(CandidateService.filter(list, search));
	  	}
  	}, [sortBy, allCandidates, search]);

  	const handleEdit = (candidate) => {
  		setEditCandidate(candidate);
  	} 

  	const handleCancel = () => {
  		setEditCandidate(false);
  	}

	return (
		<div className="candidateList">
			<div className="candidateList__filterContainer">
				<input type="text" onChange={(e) => setSearch(e.target.value)} value={search} placeholder="Search"/>
				<SingleSelectList list={sortList} label="Sort by" onSelect={setSortBy} />
				<AddCandidatesForm type="small" candidates={allCandidates} addCandidates={setAllCandidates} />
			</div>
			{candidates && candidates.length ?
				<ul className="candidateList__list">
					{candidates.map((item, key) => 
						<Candidate candidate={item} key={key} edit={handleEdit}/>
					)}
				</ul>
			: 
				<div className="candidateList__noResult">
					<div>
						{search && allCandidates.length ?
							<span>No results matching "{search}"</span>
						:
							<span>No candidates</span>
						}
						<AddCandidatesForm type="large" candidates={allCandidates} addCandidates={setAllCandidates} />
					</div>
				</div>
			}
			{editCandidate ?
				<AddCandidatesForm candidates={allCandidates} addCandidates={setAllCandidates} editCandidate={editCandidate} cancel={() => handleCancel()} useButton={false}/>
			: ''}
			<LoadingSpinner isLoading={isLoading} />
		</div>
	);
}