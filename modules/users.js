const users = [];

// join user into the pokemon lobby

const joinGymLobby = (id, username, gym, gender) => {
    const userObj = { id, username, gym, gender}

    users.push(userObj)

    console.log('userList' , userObj)

    return userObj
}

// get current user

const getCurrentUser = (id) => {
    return users.find(user => user.id === id)
}

// get users count

const getNumberOfUserInAllGyms = () => {
    const gyms = {
        pewter_gym: 0,
        cerulean_gym: 0,
        celadon_gym: 0,
        cinnabar_gym: 0,
        fuchsia_gym: 0,
        saffron_gym: 0,
        vermilion_gym: 0,
        viridian_gym: 0,
    }

    return users.reduce((acc, user) => {
        console.log('first test', user.gym)
        acc[user.gym]++
        console.log('second test', user.gym)
        return acc
    }, gyms)

}

// remove the user on leave

const userLeave = (id) => {
    const index = users.findIndex(user => user.id === id)

    if (index !== -1) {
        return users.splice(index, 1)[0]
    }
}

// Get all users that are in the specific gym.

const getUsersInGym = (gym) => {
    return users.filter(user => user.gym === gym)
}

module.exports = {
    joinGymLobby,
    getCurrentUser,
    getNumberOfUserInAllGyms,
    userLeave,
    getUsersInGym,
}
