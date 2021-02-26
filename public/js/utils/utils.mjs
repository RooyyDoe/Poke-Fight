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
    console.log(users.gender)
	removeUserList(userList)

	users.forEach(user => {
		const list = document.createElement('li')
        const img = document.createElement('img')
        const p = document.createElement('p')
        list.classList.add('trainer-card')

        if(user.gender === "boy") {
            img.src = `/images/${user.gender}.png`
            p.textContent = user.user
        }

        img.src = `/images/${user.gender}.png`
        p.textContent = user.user

        userList.append(list)
        list.append(img)
        list.append(p)

	})

}

const removeUserList = (list) => {
	list.innerHTML = ""
}