(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
},{"node-fetch":3}],2:[function(require,module,exports){
const fetcher = require('./fetcher')

const pokemon = async (query) => {
    const pokemonList = await fetcher.get(`https://pokeapi.co/api/v2/pokemon/${query}`)
    console.log(pokemonList)
    return pokemonList
}

module.exports = pokemon
},{"./fetcher":1}],3:[function(require,module,exports){
(function (global){(function (){
"use strict";

// ref: https://github.com/tc39/proposal-global
var getGlobal = function () {
	// the only reliable means to get the global object is
	// `Function('return this')()`
	// However, this causes CSP violations in Chrome apps.
	if (typeof self !== 'undefined') { return self; }
	if (typeof window !== 'undefined') { return window; }
	if (typeof global !== 'undefined') { return global; }
	throw new Error('unable to locate global object');
}

var global = getGlobal();

module.exports = exports = global.fetch;

// Needed for TypeScript and Webpack.
if (global.fetch) {
	exports.default = global.fetch.bind(global);
}

exports.Headers = global.Headers;
exports.Request = global.Request;
exports.Response = global.Response;
}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],4:[function(require,module,exports){
const pokemon = require('../../modules/pokemonData')

const search_bar = document.getElementById('search-bar')
const search_button = document.getElementById('search-button')

console.log('test')

search_button.addEventListener("click", () => pokemon(search_bar.value))
},{"../../modules/pokemonData":2}]},{},[4]);
