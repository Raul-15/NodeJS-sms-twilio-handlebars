require('dotenv').config();

const app = require('./server');
const http = require('http'); //Requerimientos para socket.io, crear una nueva conexion al server

const server = http.createServer(app); //Requerimientos para socket.io, crear una nueva conexion al server

//console.log(process.env.HELLO);

require('./database');
require('./sockets').connection(server);
server.listen(app.get('port'), () => { // Se inicializa ahora con server por socket.io
    console.log('Server on port ' + app.get('port'));
});