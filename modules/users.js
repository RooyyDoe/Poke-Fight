const users = [];

// join user into the pokemon lobby

const joinGymLobby = (id, user, gym, gender) => {
    const userObj = { id, user, gym, gender}

    users.push(userObj)

    console.log('userList' , userObj)

    return userObj
}

// get current user

const getCurrentUser = (id) => {
    return users.find(user => user.id === id)
}

// remove the user on leave

const userLeave = (id) => {
    const index = users.findIndex(user => user.id === id)

    if (index !== -1) {
        return users.splice(index, 1)[0]
    }
}

// Get all users that are in the specific gym.

const getGymUsers = (gym) => {
    return users.filter(user => user.gym === gym)
}

module.exports = {
    joinGymLobby,
    getCurrentUser,
    userLeave,
    getGymUsers,
}