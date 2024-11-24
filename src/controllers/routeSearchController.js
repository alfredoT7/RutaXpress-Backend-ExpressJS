const Route = require('../models/Route');
const turf = require('@turf/turf'); // Librería para cálculos geoespaciales

// Buscar la ruta más cercana al inicio y final
const findBestRoute = async (req, res) => {
  try {
    const { longitudeInicio, latitudeInicio, longitudeFinal, latitudeFinal } = req.query;

    if (!longitudeInicio || !latitudeInicio || !longitudeFinal || !latitudeFinal) {
      return res.status(400).json({ message: 'Se requieren las coordenadas de inicio y final' });
    }

    // Coordenadas de inicio y final
    const startPoint = [parseFloat(longitudeInicio), parseFloat(latitudeInicio)];
    const endPoint = [parseFloat(longitudeFinal), parseFloat(latitudeFinal)];

    // Buscar rutas cercanas al punto de inicio
    const routesNearStart = await Route.find({
      'geojson.features.geometry': {
        $near: {
          $geometry: { type: 'Point', coordinates: startPoint },
          $maxDistance: 1000 // Ajusta el radio según tus necesidades
        }
      }
    });

    if (!routesNearStart.length) {
      return res.status(404).json({ message: 'No se encontraron rutas cercanas al inicio' });
    }

    // Filtrar rutas que también estén cerca del destino
    let bestRoute = null;
    let shortestDistance = Infinity;

    for (const route of routesNearStart) {
      const line = route.geojson.features[0].geometry.coordinates;

      // Encontrar punto más cercano al destino en la línea
      const closestToEnd = turf.nearestPointOnLine(turf.lineString(line), turf.point(endPoint));
      const distanceToEnd = turf.distance(turf.point(endPoint), closestToEnd);

      if (distanceToEnd < shortestDistance) {
        shortestDistance = distanceToEnd;
        bestRoute = route;
      }
    }

    if (!bestRoute) {
      return res.status(404).json({ message: 'No se encontraron rutas que conecten inicio y final' });
    }

    res.json({ routeId: bestRoute.routeId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al buscar rutas', error: error.message });
  }
};

module.exports = { findBestRoute };