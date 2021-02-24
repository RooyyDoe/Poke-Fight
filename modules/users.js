const users = [];

// join user into the pokemon lobby

const userJoin = (id, user, gym, gender) => {
    const userInfo = { id, user, gym, gender}

    users.push(userInfo)

    console.log('userList' , userInfo.user)

    return userInfo
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
    userJoin,
    getCurrentUser,
    userLeave,
    getGymUsers,
}