const fetch = require('node-fetch')

const checkStatus = (response) => {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;    
}

const parseJSON = res => res.json()

const fetcher = {
    get: (path) =>
        fetch(path)
        .then(checkStatus)
        .then(parseJSON)
}

module.exports = fetcher