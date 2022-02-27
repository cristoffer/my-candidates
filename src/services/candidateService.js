
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

	post: function (candidate) {

	},

	put: function (candidate) {

	},

	delete: function (candidate) {

	}
}

export default CandidateService;