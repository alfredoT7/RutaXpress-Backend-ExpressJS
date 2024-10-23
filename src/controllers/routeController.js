const multer = require('multer');
const Route = require('../models/Route');

// Configuración de multer para almacenar en memoria
const storage = multer.memoryStorage();
const upload = multer({ storage });

exports.upload = upload.single('geojson'); 
exports.uploadRoute = async (req, res) => {
  const { id } = req.body; // 'id' viene del campo de texto en el form-data
  const geojson = req.file; // 'geojson' es el archivo subido

  if (!geojson || !id) {
    return res.status(400).json({ message: 'Se requiere archivo GeoJSON e id' });
  }

  try {
    const newRoute = new Route({
      routeId: id,
      geojson: JSON.parse(geojson.buffer.toString()) // Parsear el archivo a JSON
    });
    await newRoute.save();
    res.status(201).json({ message: 'Ruta guardada exitosamente', route: newRoute });
  } catch (err) {
    console.error('Error al guardar la ruta:', err);
    res.status(500).json({ message: 'Error al guardar la ruta', error: err.message });
  }
};

exports.getRouteById = async (req, res) => {
    const { id } = req.params; // El id se recibe como parámetro en la URL
  
    try {
      // Buscar la ruta en la base de datos por 'routeId'
      const route = await Route.findOne({ routeId: id });
  
      // Si no se encuentra, devolver un error 404
      if (!route) {
        return res.status(404).json({ message: 'Ruta no encontrada' });
      }
  
      // Si se encuentra, devolver la ruta
      res.status(200).json(route);
    } catch (err) {
      console.error('Error al obtener la ruta:', err);
      res.status(500).json({ message: 'Error al obtener la ruta', error: err.message });
    }
  };