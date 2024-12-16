const mongoose = require('mongoose');

const driverRouteSchema = new mongoose.Schema({
  idUser: {
    type: String,
    required: true,
    unique: true
  },
  photoCi: {
    type: String
  },
  reversePhotoCi: {
    type: String
  },
  photoLicence: {
    type: String
  },
  reversePhotoLicence: {
    type: String
  },
  Marcca: {
    type: String
  },
  Model: {
    type: String
  },
  Placa: {
    type: String,
    required: true,
    unique: true
  },
  photoCar: {
    type: String
  },
  routes: {
    type: [String],
    required: true
  }
});

module.exports = mongoose.model('DriverRoute', driverRouteSchema);