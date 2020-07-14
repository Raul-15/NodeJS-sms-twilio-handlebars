const timeago = require('timeago.js');

module.exports = {
    hideNumber: (phoneNumber = '') => { //Ya que si no ponemos un string vacio, lanzara indefinido.
        return phoneNumber.replace(/[0-9]/g, 'x'); // Reemplazara los numeros de l 0 al 9 con 'x'
    },
    timeago: (date) => {
        return timeago.format(date);
    }
}