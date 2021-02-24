export const appendMessage = (notification) => {
    const output = document.querySelector('.join-element')
    const joinMessage = document.createElement('p')
    joinMessage.classList.add('join-message')
    joinMessage.innerText = notification

    output.append(joinMessage)
}

export const fadeAndRemoveMessage = () => {
    const lastOutput = document.querySelector('.join-message:last-child')
    
    setTimeout(() => {
        if(lastOutput) {
            lastOutput.style.opacity = '0'
        }
    }, 1000);

    setInterval(() => {
            lastOutput.remove()
    }, 5000);
}

export const userList = (users, currentUser) => {
	const userList = document.getElementById('trainer-container')
    console.log('userList', users)
	removeList(userList)

	users.forEach(user => {
		const li = document.createElement('li')
        console.log('test', user)
        li.classList.add('trainer-card')
		li.textContent = user.user
		userList.append(li)

		// if (user.name === currentUser) {
		// 	li.classList.add('current-user')
		// }
	})
}

const removeList = (list) => {
	list.innerHTML = ""
}