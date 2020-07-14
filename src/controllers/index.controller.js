const MessagingResponse = require('twilio').twiml.MessagingResponse;
const { sendMessage } = require('../twilio/send-sms');
const SMS = require('../models/sms');

const { getSocket } = require('../sockets'); // 

const indexController = async(req, res) => {
    const messages = await SMS.find().sort('-createdAt').lean(); // BUscar en la db la informacion del modelo SMS // desde el mas nuevo
    // messages.forEach(m => console.log(m.To)); // Lanzar la parte del objeto a mostrar.
    res.render('index', { messages: messages });
}

const postMessage = async(req, res) => {
    console.log(req.body);


    const { message, phone } = req.body;
    if (!message || !phone) return res.json('Missing message or phone');

    const result = await sendMessage(req.body.message, req.body.phone)
    console.log(result.sid);
    await SMS.create({ Body: req.body.message, To: req.body.phone })

    // console.log(response.sid);
    res.redirect('/');


}


const receiveMessage = async(req, res) => {
    console.log(req.body.Body);
    const savedSMS = await SMS.create({
        Body: req.body.Body,
        From: req.body.From

    })

    getSocket().emit('new message', savedSMS) // lanza un mensaje
    const twiml = new MessagingResponse();


    res.writeHead(200, { "Content-Type": "text/xml" });
    twiml.message('This is my response!');
    res.send(twiml.toString());


}

module.exports = {
    indexController,
    postMessage,
    receiveMessage
}