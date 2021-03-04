(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var utils = _interopRequireWildcard(require("./utils/utils.mjs"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var socket = io();
var infoElement = document.getElementById('user-info');
var userInfo = {
  username: infoElement.getAttribute('user-name'),
  gym: infoElement.getAttribute('gym-name'),
  gender: infoElement.getAttribute('gender'),
  pokemon: {
    name: 'ditto',
    health: 200,
    type: 'normal'
  }
};

if (userInfo) {
  var lobby = document.querySelector('.lobby-container-leftside');
  var battle = document.querySelector('.container-leftside-battle');
  var startButton = document.querySelector('.start-button');
  startButton.addEventListener('click', function (event) {
    event.preventDefault();
    lobby.classList.add('fade-out');
    battle.classList.add('fade-in');
    socket.emit('battle', userInfo);
  });
}

var renderTurnMessage = function renderTurnMessage(playerOneTurn) {
  if (playerOneTurn) {
    document.querySelector(".battle-message").textContent = "Your opponent's turn";
    document.querySelector(".attack-button").disabled = true;
  } else {
    document.querySelector(".battle-message").textContent = "Your turn";
    document.querySelector(".attack-button").removeAttribute("disabled");
  }
};

var attackButton = document.querySelector('.attack-button');
attackButton.addEventListener('click', function (event) {
  event.preventDefault();
  utils.clearMessages();
  socket.emit('attack', userInfo);
});
var search_bar = document.getElementById('search');
var search_button = document.getElementById('search-button');
search_button.addEventListener("click", function () {
  socket.emit('search-results', search_bar.value);
});
socket.emit('join-lobby', userInfo); // get gym and users

socket.on('gym-users', function (users) {
  return utils.userList(users, userInfo.username);
});
socket.on('notification', function (notification) {
  utils.appendLobbyMessage(notification); // utils.fadeAndRemoveMessage()
});
socket.on('message', function (message) {
  // if(message) {
  //     document.querySelector(".battle-message").textContent = message;
  // }
  utils.appendGameMessage(message); // utils.clearMessages()
});
socket.on('game-over', function () {
  utils.clearMessages();
  document.querySelector(".attack-button").disabled = true;
});

},{"./utils/utils.mjs":2}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userList = exports.clearMessages = exports.fadeAndRemoveMessage = exports.appendGameMessage = exports.appendLobbyMessage = void 0;

var appendLobbyMessage = function appendLobbyMessage(notification) {
  var output = document.querySelector('.join-element');
  var joinMessage = document.createElement('p');
  joinMessage.classList.add('join-message');
  joinMessage.innerText = notification;
  output.append(joinMessage);
};

exports.appendLobbyMessage = appendLobbyMessage;

var appendGameMessage = function appendGameMessage(message) {
  var output = document.querySelector('.battle-element');
  var battleMessage = document.createElement('p');
  battleMessage.classList.add('battle-message');
  battleMessage.innerText = message;
  output.append(battleMessage);
};

exports.appendGameMessage = appendGameMessage;

var fadeAndRemoveMessage = function fadeAndRemoveMessage() {
  var lastOutput = document.querySelector('.join-message:last-child');
  setTimeout(function () {
    if (lastOutput) {
      lastOutput.style.opacity = '0';
    }
  }, 1000);
  setInterval(function () {
    lastOutput.remove();
  }, 5000);
};

exports.fadeAndRemoveMessage = fadeAndRemoveMessage;

var clearMessages = function clearMessages() {
  var battleMessage = document.querySelectorAll('.battle-message');
  battleMessage.forEach(function (message) {
    message.remove();
  });
};

exports.clearMessages = clearMessages;

var userList = function userList(users, currentUser) {
  var userList = document.getElementById('trainer-list');
  var startButton = document.querySelector('.start-button');
  removeUserList(userList);
  users.forEach(function (user) {
    var list = document.createElement('li');
    var img = document.createElement('img');
    var p = document.createElement('p');
    list.classList.add('trainer-card');

    if (user.gender === "boy") {
      img.src = "/images/".concat(user.gender, ".png");
      p.textContent = user.username;
    }

    img.src = "/images/".concat(user.gender, ".png");
    p.textContent = user.username;
    userList.append(list);
    list.append(img);
    list.append(p);
  });

  if (users.length === 2) {
    startButton.disabled = false;
  } else {
    startButton.disabled = true;
  }
};

exports.userList = userList;

var removeUserList = function removeUserList(list) {
  list.innerHTML = "";
};

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwdWJsaWMvanMvbWFpbi5qcyIsInB1YmxpYy9qcy91dGlscy91dGlscy5tanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7O0FDQUE7Ozs7OztBQUVBLElBQU0sTUFBTSxHQUFHLEVBQUUsRUFBakI7QUFFQSxJQUFNLFdBQVcsR0FBRyxRQUFRLENBQUMsY0FBVCxDQUF3QixXQUF4QixDQUFwQjtBQUNBLElBQU0sUUFBUSxHQUFHO0FBQ2IsRUFBQSxRQUFRLEVBQUUsV0FBVyxDQUFDLFlBQVosQ0FBeUIsV0FBekIsQ0FERztBQUViLEVBQUEsR0FBRyxFQUFFLFdBQVcsQ0FBQyxZQUFaLENBQXlCLFVBQXpCLENBRlE7QUFHYixFQUFBLE1BQU0sRUFBRSxXQUFXLENBQUMsWUFBWixDQUF5QixRQUF6QixDQUhLO0FBSWIsRUFBQSxPQUFPLEVBQUU7QUFDTCxJQUFBLElBQUksRUFBRSxPQUREO0FBRUwsSUFBQSxNQUFNLEVBQUUsR0FGSDtBQUdMLElBQUEsSUFBSSxFQUFFO0FBSEQ7QUFKSSxDQUFqQjs7QUFXQSxJQUFJLFFBQUosRUFBYztBQUVWLE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLDJCQUF2QixDQUFkO0FBQ0EsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsNEJBQXZCLENBQWY7QUFDQSxNQUFNLFdBQVcsR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1QixlQUF2QixDQUFwQjtBQUVBLEVBQUEsV0FBVyxDQUFDLGdCQUFaLENBQTZCLE9BQTdCLEVBQXNDLFVBQUMsS0FBRCxFQUFXO0FBQzdDLElBQUEsS0FBSyxDQUFDLGNBQU47QUFFQSxJQUFBLEtBQUssQ0FBQyxTQUFOLENBQWdCLEdBQWhCLENBQW9CLFVBQXBCO0FBQ0EsSUFBQSxNQUFNLENBQUMsU0FBUCxDQUFpQixHQUFqQixDQUFxQixTQUFyQjtBQUVBLElBQUEsTUFBTSxD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QUNyQixRQUFNLElBQUksR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1QixJQUF2QixDQUFiO0FBQ00sUUFBTSxHQUFHLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBWjtBQUNBLFFBQU0sQ0FBQyxHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLEdBQXZCLENBQVY7QUFDQSxJQUFBLElBQUksQ0FBQyxTQUFMLENBQWUsR0FBZixDQUFtQixjQUFuQjs7QUFFQSxRQUFHLElBQUksQ0FBQyxNQUFMLEtBQWdCLEtBQW5CLEVBQTBCO0FBQ3RCLE1BQUEsR0FBRyxDQUFDLEdBQUoscUJBQXFCLElBQUksQ0FBQyxNQUExQjtBQUNBLE1BQUEsQ0FBQyxDQUFDLFdBQUYsR0FBZ0IsSUFBSSxDQUFDLFFBQXJCO0FBQ0g7O0FBRUQsSUFBQSxHQUFHLENBQUMsR0FBSixxQkFBcUIsSUFBSSxDQUFDLE1BQTFCO0FBQ0EsSUFBQSxDQUFDLENBQUMsV0FBRixHQUFnQixJQUFJLENBQUMsUUFBckI7QUFFQSxJQUFBLFFBQVEsQ0FBQyxNQUFULENBQWdCLElBQWhCO0FBQ0EsSUFBQSxJQUFJLENBQUMsTUFBTCxDQUFZLEdBQVo7QUFDQSxJQUFBLElBQUksQ0FBQyxNQUFMLENBQVksQ0FBWjtBQUNOLEdBakJEOztBQW1CRyxNQUFJLEtBQUssQ0FBQyxNQUFOLEtBQWlCLENBQXJCLEVBQXdCO0FBQ3BCLElBQUEsV0FBVyxDQUFDLFFBQVosR0FBdUIsS0FBdkI7QUFDSCxHQUZELE1BRU87QUFDSCxJQUFBLFdBQVcsQ0FBQyxRQUFaLEdBQXVCLElBQXZCO0FBQ0g7QUFDSixDQTlCTTs7OztBQWdDUCxJQUFNLGNBQWMsR0FBRyxTQUFqQixjQUFpQixDQUFDLElBQUQsRUFBVTtBQUNoQyxFQUFBLElBQUksQ0FBQyxTQUFMLEdBQWlCLEVBQWpCO0FBQ0EsQ0FGRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImltcG9ydCAqIGFzIHV0aWxzIGZyb20gJy4vdXRpbHMvdXRpbHMubWpzJ1xuXG5jb25zdCBzb2NrZXQgPSBpbygpXG5cbmNvbnN0IGluZm9FbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZXItaW5mbycpXG5jb25zdCB1c2VySW5mbyA9IHtcbiAgICB1c2VybmFtZTogaW5mb0VsZW1lbnQuZ2V0QXR0cmlidXRlKCd1c2VyLW5hbWUnKSxcbiAgICBneW06IGluZm9FbGVtZW50LmdldEF0dHJpYnV0ZSgnZ3ltLW5hbWUnKSxcbiAgICBnZW5kZXI6IGluZm9FbGVtZW50LmdldEF0dHJpYnV0ZSgnZ2VuZGVyJyksXG4gICAgcG9rZW1vbjoge1xuICAgICAgICBuYW1lOiAnZGl0dG8nLFxuICAgICAgICBoZWFsdGg6IDIwMCxcbiAgICAgICAgdHlwZTogJ25vcm1hbCdcbiAgICB9XG59IFxuXG5pZiAodXNlckluZm8pIHtcblxuICAgIGNvbnN0IGxvYmJ5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxvYmJ5LWNvbnRhaW5lci1sZWZ0c2lkZScpXG4gICAgY29uc3QgYmF0dGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRhaW5lci1sZWZ0c2lkZS1iYXR0bGUnKVxuICAgIGNvbnN0IHN0YXJ0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN0YXJ0LWJ1dHRvbicpXG5cbiAgICBzdGFydEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIGxvYmJ5LmNsYXNzTGlzdC5hZGQoJ2ZhZGUtb3V0JylcbiAgICAgICAgYmF0dGxlLmNsYXNzTGlzdC5hZGQoJ2ZhZGUtaW4nKVxuXG4gICAgICAgIHNvY2tldC5lbWl0KCdiYXR0bGUnLCB1c2VySW5mbylcbiAgICB9KTtcblxufVxuXG5jb25zdCByZW5kZXJUdXJuTWVzc2FnZSA9IChwbGF5ZXJPbmVUdXJuKSA9PiB7XG4gICAgaWYgKHBsYXllck9uZVR1cm4pIHtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5iYXR0bGUtbWVzc2FnZVwiKS50ZXh0Q29udGVudCA9IFwiWW91ciBvcHBvbmVudCdzIHR1cm5cIjtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hdHRhY2stYnV0dG9uXCIpLmRpc2FibGVkID0gdHJ1ZVxuICAgIH0gZWxzZSB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYmF0dGxlLW1lc3NhZ2VcIikudGV4dENvbnRlbnQgPSBcIllvdXIgdHVyblwiO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmF0dGFjay1idXR0b25cIikucmVtb3ZlQXR0cmlidXRlKFwiZGlzYWJsZWRcIilcbiAgICB9XG59XG5cbmNvbnN0IGF0dGFja0J1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hdHRhY2stYnV0dG9uJylcblxuYXR0YWNrQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgIHV0aWxzLmNsZWFyTWVzc2FnZXMoKVxuICAgIHNvY2tldC5lbWl0KCdhdHRhY2snLCB1c2VySW5mbylcbn0pXG5cbmNvbnN0IHNlYXJjaF9iYXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2VhcmNoJylcbmNvbnN0IHNlYXJjaF9idXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2VhcmNoLWJ1dHRvbicpXG5cbnNlYXJjaF9idXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBzb2NrZXQuZW1pdCgnc2VhcmNoLXJlc3VsdHMnLCBzZWFyY2hfYmFyLnZhbHVlKVxufSlcblxuc29ja2V0LmVtaXQoJ2pvaW4tbG9iYnknLCB1c2VySW5mbylcblxuLy8gZ2V0IGd5bSBhbmQgdXNlcnNcblxuc29ja2V0Lm9uKCdneW0tdXNlcnMnLCB1c2VycyA9PiB1dGlscy51c2VyTGlzdCh1c2VycywgdXNlckluZm8udXNlcm5hbWUpKVxuXG5zb2NrZXQub24oJ25vdGlmaWNhdGlvbicsIG5vdGlmaWNhdGlvbiA9PiB7XG4gICAgdXRpbHMuYXBwZW5kTG9iYnlNZXNzYWdlKG5vdGlmaWNhdGlvbikgIFxuICAgIC8vIHV0aWxzLmZhZGVBbmRSZW1vdmVNZXNzYWdlKClcbn0pXG5cbnNvY2tldC5vbignbWVzc2FnZScsIG1lc3NhZ2UgPT4ge1xuICAgIC8vIGlmKG1lc3NhZ2UpIHtcbiAgICAvLyAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5iYXR0bGUtbWVzc2FnZVwiKS50ZXh0Q29udGVudCA9IG1lc3NhZ2U7XG4gICAgLy8gfVxuICAgIHV0aWxzLmFwcGVuZEdhbWVNZXNzYWdlKG1lc3NhZ2UpICBcbiAgICAvLyB1dGlscy5jbGVhck1lc3NhZ2VzKClcbn0pXG5cbnNvY2tldC5vbignZ2FtZS1vdmVyJywgKCkgPT4ge1xuICAgIHV0aWxzLmNsZWFyTWVzc2FnZXMoKVxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYXR0YWNrLWJ1dHRvblwiKS5kaXNhYmxlZCA9IHRydWVcbn0pXG4iLCJleHBvcnQgY29uc3QgYXBwZW5kTG9iYnlNZXNzYWdlID0gKG5vdGlmaWNhdGlvbikgPT4ge1xuICAgIGNvbnN0IG91dHB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qb2luLWVsZW1lbnQnKVxuICAgIGNvbnN0IGpvaW5NZXNzYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpXG4gICAgam9pbk1lc3NhZ2UuY2xhc3NMaXN0LmFkZCgnam9pbi1tZXNzYWdlJylcbiAgICBqb2luTWVzc2FnZS5pbm5lclRleHQgPSBub3RpZmljYXRpb25cblxuICAgIG91dHB1dC5hcHBlbmQoam9pbk1lc3NhZ2UpXG59XG5cbmV4cG9ydCBjb25zdCBhcHBlbmRHYW1lTWVzc2FnZSA9IChtZXNzYWdlKSA9PiB7XG4gICAgY29uc3Qgb3V0cHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJhdHRsZS1lbGVtZW50JylcbiAgICBjb25zdCBiYXR0bGVNZXNzYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpXG4gICAgYmF0dGxlTWVzc2FnZS5jbGFzc0xpc3QuYWRkKCdiYXR0bGUtbWVzc2FnZScpXG4gICAgYmF0dGxlTWVzc2FnZS5pbm5lclRleHQgPSBtZXNzYWdlXG5cbiAgICBvdXRwdXQuYXBwZW5kKGJhdHRsZU1lc3NhZ2UpXG59XG5cblxuZXhwb3J0IGNvbnN0IGZhZGVBbmRSZW1vdmVNZXNzYWdlID0gKCkgPT4ge1xuICAgIGNvbnN0IGxhc3RPdXRwdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuam9pbi1tZXNzYWdlOmxhc3QtY2hpbGQnKVxuICAgIFxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBpZihsYXN0T3V0cHV0KSB7XG4gICAgICAgICAgICBsYXN0T3V0cHV0LnN0eWxlLm9wYWNpdHkgPSAnMCdcbiAgICAgICAgfVxuICAgIH0sIDEwMDApO1xuXG4gICAgc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgICAgbGFzdE91dHB1dC5yZW1vdmUoKVxuICAgIH0sIDUwMDApO1xufVxuXG5leHBvcnQgY29uc3QgY2xlYXJNZXNzYWdlcyA9ICgpID0+IHtcbiAgICBjb25zdCBiYXR0bGVNZXNzYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmJhdHRsZS1tZXNzYWdlJylcbiAgICBcbiAgICBiYXR0bGVNZXNzYWdlLmZvckVhY2gobWVzc2FnZSA9PntcbiAgICAgICAgbWVzc2FnZS5yZW1vdmUoKVxuICAgIH0pXG59XG5cblxuZXhwb3J0IGNvbnN0IHVzZXJMaXN0ID0gKHVzZXJzLCBjdXJyZW50VXNlcikgPT4ge1xuXHRjb25zdCB1c2VyTGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0cmFpbmVyLWxpc3QnKVxuICAgIGNvbnN0IHN0YXJ0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN0YXJ0LWJ1dHRvbicpXG5cblx0cmVtb3ZlVXNlckxpc3QodXNlckxpc3QpXG5cblx0dXNlcnMuZm9yRWFjaCh1c2VyID0+IHtcblx0XHRjb25zdCBsaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKVxuICAgICAgICBjb25zdCBpbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKVxuICAgICAgICBjb25zdCBwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpXG4gICAgICAgIGxpc3QuY2xhc3NMaXN0LmFkZCgndHJhaW5lci1jYXJkJylcblxuICAgICAgICBpZih1c2VyLmdlbmRlciA9PT0gXCJib3lcIikge1xuICAgICAgICAgICAgaW1nLnNyYyA9IGAvaW1hZ2VzLyR7dXNlci5nZW5kZXJ9LnBuZ2BcbiAgICAgICAgICAgIHAudGV4dENvbnRlbnQgPSB1c2VyLnVzZXJuYW1lXG4gICAgICAgIH1cblxuICAgICAgICBpbWcuc3JjID0gYC9pbWFnZXMvJHt1c2VyLmdlbmRlcn0ucG5nYFxuICAgICAgICBwLnRleHRDb250ZW50ID0gdXNlci51c2VybmFtZVxuXG4gICAgICAgIHVzZXJMaXN0LmFwcGVuZChsaXN0KVxuICAgICAgICBsaXN0LmFwcGVuZChpbWcpXG4gICAgICAgIGxpc3QuYXBwZW5kKHApXG5cdH0pXG5cbiAgICBpZiAodXNlcnMubGVuZ3RoID09PSAyKSB7XG4gICAgICAgIHN0YXJ0QnV0dG9uLmRpc2FibGVkID0gZmFsc2VcbiAgICB9IGVsc2Uge1xuICAgICAgICBzdGFydEJ1dHRvbi5kaXNhYmxlZCA9IHRydWVcbiAgICB9XG59XG5cbmNvbnN0IHJlbW92ZVVzZXJMaXN0ID0gKGxpc3QpID0+IHtcblx0bGlzdC5pbm5lckhUTUwgPSBcIlwiXG59XG5cbiJdfQ==
