
async function loadFakeData() {
  	const response = await fetch(
    	`/defaultData.json`, {
      		method: 'GET',
      		headers: {
        		Accept: 'application/json',
     	 	}
    	},
  	);

  	const result = await response.json();
  	return result;
}

const CandidateService = {

	fetch: function () {
		return new Promise((resolve,reject) => {
			const stored = localStorage.getItem('candidates');

			if (stored) {
				resolve(JSON.parse(stored));
			} else {
				loadFakeData()
					.then(data => resolve(data))
					.catch((e) => reject(e))
			}
		})

		
	},

	post: function (candidates) {
		return new Promise((resolve,reject) => {
			try {
				localStorage.setItem('candidates', JSON.stringify({candidates: candidates}));
				resolve(candidates);
			}
			catch {
				reject();
			}
		})
	},

	put: function (candidates, candidate) {
		return new Promise((resolve,reject) => {
			try {
				const list = candidates.filter((item) => item.id !== candidate.id);
				list.push(candidate);

				localStorage.setItem('candidates', JSON.stringify({candidates: list}));
				resolve(list);
			}
			catch {
				reject();
			}
		})
	},

	delete: function (candidates, candidateId) {
		const list = candidates.filter((item) => item.id !== candidateId);
		return new Promise((resolve,reject) => {
			try {
				localStorage.setItem('candidates', JSON.stringify({candidates: list}));
				resolve(list);
			}
			catch {
				reject();
			}
		})
	},

	sortBy: function (list, sortBy) {
		if (list && list.length) { 
			return [...list].sort((a,b) => {
				if (a[sortBy] > b[sortBy]) {
				    return 1;
				}
				
				if (a[sortBy] < b[sortBy]) {
				    return -1;
				}
				
				return 0;
			})
		} else {
			return [];
		}
	},

	filter: function(list, search) {
		if (search) {
			return list.filter((item) => item.name.toLowerCase().indexOf(search.toLowerCase()) > -1 || item.email.toLowerCase().indexOf(search.toLowerCase()) > -1);
		}
		return list;
	},

	validate: function (candidate, schema) {
		var errors = Object.keys(schema).filter(function (key) {
		    return !schema[key](candidate[key]);
		}).map(function (key) {
		    return new Error(key + " is invalid.");
		});

		if (errors.length > 0) {
			return {hasErrors: true, errors: errors};
		} else {
		    return {hasErrors: false};
		}
	},

	schema: {
	  name: function (value) {
	    return /^([A-ZA-ZÅÄÖ][a-za-zåäö\-]* )+[A-ZA-ZÅÄÖ][a-za-zåäö\-]*( \w+\.?)?$/.test(value);
	  },
	  age: function (value) {
	    return !isNaN(value) && value >= 18;
	  },
	  email: function (value) {
	    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
	  },
	  address: function (value) {
	    return value && value.length > 3 ? true : false;
	  }
	}
}

export default CandidateService;