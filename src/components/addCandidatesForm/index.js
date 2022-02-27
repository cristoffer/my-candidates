import React, { useEffect, useState } from "react";

import CandidateService from '../../services/candidateService.js';
import Button from '../button';
import Input from '../input';
import './style.scss';

export default function AddCandidatesForm ({ type, candidates, addCandidates }) {
	const [newCandidate, setNewCandidate] = useState({ name: '', address: '', age: '', email: '', progress: 1});
	const [edit, setEdit] = useState(false);
	const [errors, setErrors] = useState(false);

	const handleSubmit = e => {
	    e.preventDefault();
	    setErrors(false)

	    const form = CandidateService.validate(newCandidate, CandidateService.schema);

	    console.log(form)

	    if (!form.hasErrors) {
	    	CandidateService.post(([...candidates, newCandidate]))
	    		.then((response) => {
	    			console.log('response',response);
	    			addCandidates(response);
	    		})
	    		.catch((e) => {
	    			console.error(e)
	    		})
		} else {
			setErrors(form.errors)
		}
	}

	const handleChange = (e) => {
		setNewCandidate({...newCandidate, [e.target.name]: e.target.value});
	}

	return (
		<div className="addCandidatesForm">
			<div className="addCandidatesForm__buttonContainer">
				<Button label="Add new candidate" addClasses="button__fullWidth" onClick={() => setEdit(true)}/>
			</div>
			{edit ?
				<div className="addCandidatesForm__formContainerBackdrop">
					<div className="addCandidatesForm__formContainer">
						<form onSubmit={handleSubmit}>
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

							<Button type="submit" label="Save" addClasses="button__fullWidth" />
							<Button label="Cancel" addClasses="button__fullWidth" onClick={() => setEdit(false)}/>
						
							{errors && errors.length ?
								<div className="addCandidatesForm__errors">
									{errors.map((error, key) => 
										<div className="addCandidatesForm__error" key={key}>
											{error.message}
										</div>
									)}
								</div>
							: ''}
						</form>
					</div>
				</div>
			: ''}
		</div>
	)
}