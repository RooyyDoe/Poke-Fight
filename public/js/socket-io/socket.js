import battle from './_battle'
import login from './_login'
import lobby from './_lobby'

export const sockets = (io) => {  
    battle(io)
    login(io)
    lobby(io)
}