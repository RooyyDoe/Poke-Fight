const fetch = require('node-fetch')

const handleResponse = (response) => {
    if (response.ok) {
        return response;
    } 
    else {
        const error = new Error(response.statusText);
        error.response = response;
        throw error;
    }   
}

const parseJSON = res => res.json()

const fetcher = {
    get: (path) =>
        fetch(path)
        .then(handleResponse)
        .then(parseJSON)
}

module.exports = fetcher