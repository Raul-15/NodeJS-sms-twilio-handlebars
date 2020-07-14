console.log("works!");

const socket = io(); //Permite hacer una conexion, por defecto al dominio que se esta manejando
//Escuchar el nuevo evento.


Notification.requestPermission().then(function(result) { // La notificacion pide el permiso del usuario en un cuadro.
    console.log(result);
});


function notifyMe(mensaje = "Hi There!") {
    // Let's check if the browser supports notifications
    if (!("Notification" in window)) {
        alert("This browser does not support desktop notification");
    }

    // Let's check whether notification permissions have already been granted
    else if (Notification.permission === "granted") {
        // If it's okay let's create a notification
        var notification = new Notification(mensaje);
    }

    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== 'denied') {
        Notification.requestPermission(function(permission) {
            // If the user accepts, let's create a notification
            if (permission === "granted") {
                var notification = new Notification(mensaje);
            }
        });
    }

    // At last, if the user has denied notifications, and you 
    // want to be respectful there is no need to bother them any more.
}




socket.on('new message', data => {
    console.log('New SMS')

    notifyMe("Nuevo SMS Recibido!");

    const messageList = document.getElementById('messages');

    const li = document.createElement('li') // Crea elemento li
    li.classList = "list-group-item list-group-item-warning list-group-item-action"; // Añades la clase que tiene li en el .hbs

    const body = document.createElement('p'); // Crea elemento p
    body.appendChild(document.createTextNode(data.Body)); // Jalas el data cargada de infor nueva

    data.From = data.From.replace(/[0-9]/g, 'x');
    const from = document.createElement('span');
    from.appendChild(document.createTextNode(data.From));

    const createdAt = document.createElement('span');
    createdAt.appendChild(document.createTextNode(timeago.format(data.createdAt)));

    const _id = document.createElement('span');
    _id.appendChild(document.createTextNode(data._id));

    li.appendChild(body);
    li.appendChild(_id);
    li.appendChild(from);
    li.appendChild(createdAt);
    messageList.prepend(li); // appendChild lo pone al ultimo de la lista en cambio el prepend lo pone arriba

})