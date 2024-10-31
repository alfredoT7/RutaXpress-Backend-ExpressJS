const multer = require('multer');
const Route = require('../models/Route');

const storage = multer.memoryStorage();
const upload = multer({ storage });

exports.upload = upload.single('geojson'); 
exports.uploadRoute = async (req, res) => {
  const { id } = req.body;
  const geojson = req.file;

  if (!geojson || !id) {
    return res.status(400).json({ message: 'Se requiere archivo GeoJSON e id' });
  }

  try {
    const newRoute = new Route({
      routeId: id,
      geojson: JSON.parse(geojson.buffer.toString())
    });
    await newRoute.save();
    res.status(201).json({ message: 'Ruta guardada exitosamente', route: newRoute });
  } catch (err) {
    console.error('Error al guardar la ruta:', err);
    res.status(500).json({ message: 'Error al guardar la ruta', error: err.message });
  }
};

exports.getRouteById = async (req, res) => {
    const { id } = req.params;
    try {
      const route = await Route.findOne({ routeId: id });
      if (!route) {
        return res.status(404).json({ message: 'Ruta no encontrada' });
      }
      res.status(200).json(route);
    } catch (err) {
      console.error('Error al obtener la ruta:', err);
      res.status(500).json({ message: 'Error al obtener la ruta', error: err.message });
    }
  };