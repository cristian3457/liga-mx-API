const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let equipoSchema = new Schema({
    nombre: { type: String, required: [true, 'El nombre del equipo es necesario'] },
    titulos: { type: Number, required: [true, 'El número de titulos es necesario'] },
    // estado: { type: Boolean, default: true },
});

equipoSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser único' });

module.exports = mongoose.model('Equipo', equipoSchema);