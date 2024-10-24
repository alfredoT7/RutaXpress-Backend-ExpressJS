const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema({
  routeId: {
    type: String,
    required: true,
    unique: true
  },
  geojson: {
    type: Object,
    required: true,
  }
});

module.exports = mongoose.model('Route', routeSchema);