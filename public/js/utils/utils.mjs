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