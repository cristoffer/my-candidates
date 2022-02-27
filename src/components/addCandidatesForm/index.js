import React, { useState } from "react";

import CandidateService from '../../services/candidateService.js';
import Button from '../button';
import Input from '../input';
import './style.scss';
import { AiOutlineUserAdd, AiOutlineDelete } from "react-icons/ai";
import SingleSelectList from '../../components/singleSelectList';
import types from '../../types'


function getNewId (candidates) {
	const list = CandidateService.sortBy(candidates, 'id');
	const last = list[list.length - 1];
	return last ? last.id + 1 : 1;
}

export default function AddCandidatesForm ({ type = 'large', candidates, addCandidates, editCandidate, useButton = true, cancel }) {
	const [newCandidate, setNewCandidate] = useState({ name: editCandidate ? editCandidate.name : '', address: editCandidate ? editCandidate.address : '', age: editCandidate ? editCandidate.age : '', email: editCandidate ? editCandidate.email : '', progress: editCandidate ? editCandidate.progress : 1});

	const [edit, setEdit] = useState(editCandidate ? true : false);
	const [errors, setErrors] = useState(false);

	const progressOptions = Object.keys(types.candidateProgress).map((key) => {
		return {value: key, label: types.candidateProgress[key]}
	});

	const reset = () => {
		setEdit(false);
		setErrors(false);
		setNewCandidate({ name: '', address: '', age: '', email: '', progress: 1});
	}

	const handleSubmit = (e) => {
	    e.preventDefault();
	    setErrors(false)

	    const form = CandidateService.validate(newCandidate, CandidateService.schema);

	    if (!form.hasErrors) {
	    	if (editCandidate) {
	    		CandidateService.put(candidates, {...newCandidate, id:editCandidate.id})
	    			.then((response) => {
		    			reset();
	    				addCandidates(response);
	    			})
	    			.catch((e) => {
		    			console.error(e)
		    		})
	    	} else {
		    	CandidateService.post(([...candidates, { ...newCandidate, id: getNewId(candidates)}]))
		    		.then((response) => {
		    			reset();
		    			addCandidates(response);
		    		})
		    		.catch((e) => {
		    			console.error(e)
		    		})
	    	}
		} else {
			setErrors(form.errors)
		}
	}

	const handleDelete = () => {
		CandidateService.delete(candidates, editCandidate.id)
			.then((response) => {
    			reset();
				addCandidates(response);
			})
			.catch((e) => {
    			console.error(e)
    		})
	}

	const selectProgressLevel = (value) => {
		setNewCandidate({...newCandidate, progress: value.value});
	}

	const handleChange = (e) => {
		setNewCandidate({...newCandidate, [e.target.name]: e.target.value});
	}

	const handleCancel = () => {
		setEdit(false);
		if (cancel) {
			cancel();
		}
	}

	return (
		<div className="addCandidatesForm">
			{useButton ?
				<div className="addCandidatesForm__addButtonContainer">
					{type === 'large' ?
						<Button label="Add new candidate" addClasses="button__fullWidth" onClick={() => setEdit(true)}/>
					:
						<span className="addCandidatesForm__addButton" onClick={() => setEdit(true)}><AiOutlineUserAdd /></span>
					}
				</div>
			: ''}
			{edit ?
				<div className="addCandidatesForm__formContainerBackdrop">
					<div className="addCandidatesForm__formContainer">
						{editCandidate ?
							<div className="addCandidatesForm__delete">
								<AiOutlineDelete onClick={() => handleDelete()}/>
							</div>
						: ''}
						<div className="addCandidatesForm__formIcon">
							<span><AiOutlineUserAdd /></span>
						</div>
						<form onSubmit={handleSubmit}>
							<div className="addCandidatesForm__formContent">
								<div className="addCandidatesForm__inputContainer">
									<Input type="text" onChange={(e) => handleChange(e)}  name="name" value={newCandidate.name} schema={CandidateService.schema.name} placeholder="Name"/>
								</div>
								<div className="addCandidatesForm__inputContainer">
									<Input type="number" onChange={(e) => handleChange(e)}  name="age" value={newCandidate.age} schema={CandidateService.schema.age} placeholder="Age"/>
								</div>
								<div className="addCandidatesForm__inputContainer">
									<Input type="email" onChange={(e) => handleChange(e)}  name="email" value={newCandidate.email} schema={CandidateService.schema.email} placeholder="Email"/>
								</div>
								<div className="addCandidatesForm__inputContainer">
									<Input type="text" onChange={(e) => handleChange(e)}  name="address" value={newCandidate.address} schema={CandidateService.schema.address} placeholder="Address" />
								</div>
								<div className="addCandidatesForm__inputContainer">
									<SingleSelectList list={progressOptions} label="Progress" onSelect={selectProgressLevel} initValue={{label: types.candidateProgress[newCandidate.progress], value: newCandidate.progress}} />
								</div>

								<div className="addCandidatesForm__buttonContainer">
									<Button type="submit" label="Save" addClasses="button__horizontalPadding button__submit" />
									<Button label="Cancel" addClasses="button__horizontalPadding button__cancel" onClick={() => handleCancel()}/>
								</div>

								{errors && errors.length ?
									<div className="addCandidatesForm__errors">
										{errors.map((error, key) => 
											<div className="addCandidatesForm__error" key={key}>
												{error.message}
											</div>
										)}
									</div>
								: ''}
							</div>
						</form>
					</div>
				</div>
			: ''}
		</div>
	)
}