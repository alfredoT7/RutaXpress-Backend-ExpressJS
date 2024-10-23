const mongoose = require('mongoose');

// Definir el esquema del modelo Route
const routeSchema = new mongoose.Schema({
  routeId: {
    type: String,
    required: true,
  },
  geojson: {
    type: Object, // Almacenar el contenido del archivo GeoJSON como un objeto
    required: true,
  }
});

// Crear y exportar el modelo
module.exports = mongoose.model('Route', routeSchema);