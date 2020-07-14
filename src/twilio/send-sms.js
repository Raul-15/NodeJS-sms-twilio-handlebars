const config = require('../config');
const client = require('twilio')(config.accountSid, config.authToken);

/**
 * Send a message
 * @param {string} body - The sms message
 * @param {string} phone - The phone number
 */


// metodo sendMessage es un proceso asincrono
async function sendMessage(body, phone) {
    try {
        const message = await client.messages.create({

                to: phone, // Receptor
                from: '+12057404888',
                body

            })
            //console.log(message.sid);
        return message; // Retorno lo que te devuelto Rwilio. // 'message.from' hace referencia quien lo envio.
    } catch (error) {
        console.log(error);
    }
}

module.exports = { sendMessage };