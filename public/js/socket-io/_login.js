import socket from "../../../modules/socket"

export default (io) => {  

    io.on('message', message => {
        console.log(message)
    })

}