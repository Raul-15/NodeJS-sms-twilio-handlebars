const socketIO = require('socket.io');

let socket;

const connection = server => {
    const io = socketIO.listen(server); //La constante 'io' sera la que reciba las notificaciones y demas cosas.

    io.on('connection', newSocket => { //Cuando io escuche mi nueva conexion, se guarda en una variable newSocket
        socket = newSocket;
        console.log(newSocket.id); // Para poder controlar los usuarios que mandan las notificaciones

    })
}

const getSocket = () => socket;

module.exports = { connection, getSocket }