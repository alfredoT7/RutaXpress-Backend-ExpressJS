const RouteDescription = require('../models/RouteDescription');
const Route = require('../models/Route');
exports.addDescription = async (req, res) => {
  const { routeId, description } = req.body;
  
  if (!routeId || !description) {
    return res.status(400).json({ message: 'Se requiere routeId y descripción' });
  }

  try {
    const updatedDescription = await RouteDescription.findOneAndUpdate(
      { routeId },
      { description },
      { new: true, upsert: true }
    );

    res.status(200).json({ message: 'Descripción guardada exitosamente', routeDescription: updatedDescription });
  } catch (err) {
    res.status(500).json({ message: 'Error al guardar la descripción', error: err.message });
  }
};

exports.getDescriptionById = async (req, res) => {
  const { routeId } = req.params;

  try {
    const routeDescription = await RouteDescription.findOne({ routeId });

    if (!routeDescription) {
      return res.status(404).json({ message: 'Descripción no encontrada para el routeId proporcionado' });
    }

    res.status(200).json(routeDescription);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener la descripción', error: err.message });
  }
};

exports.getAllDescriptions = async (req, res) => {
    try {
      const descriptions = await RouteDescription.find({}, 'routeId description'); // Seleccionar solo routeId y description
      
      if (descriptions.length === 0) {
        return res.status(404).json({ message: 'No se encontraron descripciones' });
      }
  
      res.status(200).json(descriptions);
    } catch (err) {
      res.status(500).json({ message: 'Error al obtener las descripciones', error: err.message });
    }
};