const mongoose = require('mongoose');

const routeDescriptionSchema = new mongoose.Schema({
  routeId: {
    type: String, 
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('RouteDescription', routeDescriptionSchema);