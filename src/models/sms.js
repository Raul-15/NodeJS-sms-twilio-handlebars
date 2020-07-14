const { Schema, model } = require('mongoose');

const newSchema = new Schema({
    Body: {
        type: String,
        required: true // Requerimiento obligatorio.
    },
    From: {
        type: String
    },
    To: {
        type: String


    },


}, {
    timestamps: true // Genera dos tipos de fecha el createdAt y UpdatedAt
});

module.exports = model("sms", newSchema);