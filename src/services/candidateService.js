
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
		console.log('fetch')
		return new Promise((resolve,reject) => {
			const stored = localStorage.getItem('candidates');

			if (stored) {
				resolve(stored);
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
				localStorage.setItem('candidates', {candidates: candidates});
				resolve(candidates);
			}
			catch {
				reject();
			}
		})
	},

	put: function (candidate) {

	},

	delete: function (candidate) {

	},

	sortBy: function (list, sortBy) {
		return [...list].sort((a,b) => {
			if (a[sortBy] > b[sortBy]) {
			    return 1;
			}
			
			if (a[sortBy] < b[sortBy]) {
			    return -1;
			}
			
			return 0;
		})
	},

	filter: function(list, search) {
		if (search) {
			return list.filter((item) => item.name.toLowerCase().indexOf(search.toLowerCase()) > -1 || item.address.toLowerCase().indexOf(search.toLowerCase()) > -1 || item.email.toLowerCase().indexOf(search.toLowerCase()) > -1);
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
		    errors.forEach(function (error) {
		    	console.log(error.message);
			});
			return {hasErrors: true, errors: errors};
		} else {
		    console.log("info is valid");
		    return {hasErrors: false};
		}
	},

	schema: {
	  name: function (value) {
	    return /^([A-Z][a-z\-]* )+[A-Z][a-z\-]*( \w+\.?)?$/.test(value);
	  },
	  age: function (value) {
	    return !isNaN(value) && parseInt(value) === value && value >= 18;
	  },
	  email: function (value) {
	    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
	  },
	  address: function (value) {
	    return /(\d{1,}) [a-zA-Z0-9\s]+(\.)? [a-zA-Z]+(\,)? [A-Z]{2} [0-9]{5,6}/.test(value);
	  }
	}
}

export default CandidateService;