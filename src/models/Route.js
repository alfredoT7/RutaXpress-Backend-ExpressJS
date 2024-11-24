const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema({
  routeId: {
    type: String,
    required: true,
    unique: true
  },
  geojson: {
    type: {type:String, default: 'FeatureCollection'},
    features: [
      {
        type: {
          type: String,
          required: true,
          enum: ['Feature']
        },
        geometry: {
          type: { type: String, required: true, enum: ['LineString'] },
          coordinates: { type: [[Number]], required: true }
        },
        properties: Object
      }
    ] 
  }
});
routeSchema.index({ 'geojson.features.geometry': '2dsphere' });


module.exports = mongoose.model('Route', routeSchema);