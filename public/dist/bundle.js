(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

// const get = require('./pokemonData')
module.exports = function (io) {
  io.on("connect", function (socket) {
    // Welcome current user
    socket.emit('message', 'Welcome to poke fight'); // Broadcast when a user connects

    socket.broadcast.emit('message', 'A user has joined the gym'); // Runs when client disconnects

    socket.on('disconnect', function () {
      io.emit('message', 'A user has left the chat');
    });
  });
};

},{}],2:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var run = _interopRequireWildcard(require("./socket-io/socket"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var socket = io();
run.sockets(socket); // const pokemon = require('../../modules/pokemonData')
// const search_bar = document.getElementById('search-bar')
// const search_button = document.getElementById('search-button')
// console.log('test')
// search_button.addEventListener("click", () => pokemon(search_bar.value))

},{"./socket-io/socket":6}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default(io) {};

exports["default"] = _default;

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default(io) {};

exports["default"] = _default;

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _socket = _interopRequireDefault(require("../../../modules/socket"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = function _default(io) {
  io.on('message', function (message) {
    console.log(message);
  });
};

exports["default"] = _default;

},{"../../../modules/socket":1}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sockets = void 0;

var _battle = _interopRequireDefault(require("./_battle"));

var _login = _interopRequireDefault(require("./_login"));

var _lobby = _interopRequireDefault(require("./_lobby"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var sockets = function sockets(io) {
  (0, _battle["default"])(io);
  (0, _login["default"])(io);
  (0, _lobby["default"])(io);
};

exports.sockets = sockets;

},{"./_battle":3,"./_lobby":4,"./_login":5}]},{},[2]);
