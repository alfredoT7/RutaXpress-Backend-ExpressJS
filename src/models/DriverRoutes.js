const mongoose = require('mongoose');

const driverRouteSchema = new mongoose.Schema({
  idUser: {
    type: String,
    required: true,
    unique: true
  },
  routes: {
    type: [String],
    required: true
  }
});

module.exports = mongoose.model('DriverRoute', driverRouteSchema);