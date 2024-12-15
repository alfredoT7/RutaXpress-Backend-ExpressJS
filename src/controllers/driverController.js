// controllers/driverController.js
const DriverRoute = require('../models/DriverRoutes');

exports.createDriverRoutes = async (req, res) => {
  const { idUser, routes } = req.body;

  if (!idUser || !routes) {
    return res.status(400).json({ error: 'idUser and routes are required' });
  }

  try {
    const driverRoute = new DriverRoute({ idUser, routes });
    await driverRoute.save();
    res.status(201).json(driverRoute);
  } catch (error) {
    console.error('Error creating driver routes:', error);
    res.status(500).json({ error: 'Error creating driver routes', details: error.message });
  }
};

exports.addRoute = async (req, res) => {
  const { idUser, route } = req.body;

  if (!idUser || !route) {
    return res.status(400).json({ error: 'idUser and route are required' });
  }

  try {
    const driverRoute = await DriverRoute.findOneAndUpdate(
      { idUser },
      { $addToSet: { routes: route } },
      { new: true, upsert: true }
    );
    res.status(200).json(driverRoute);
  } catch (error) {
    console.error('Error adding route:', error);
    res.status(500).json({ error: 'Error adding route', details: error.message });
  }
};

exports.removeRoute = async (req, res) => {
  const { idUser, route } = req.body;

  if (!idUser || !route) {
    return res.status(400).json({ error: 'idUser and route are required' });
  }

  try {
    const driverRoute = await DriverRoute.findOneAndUpdate(
      { idUser },
      { $pull: { routes: route } },
      { new: true }
    );
    res.status(200).json(driverRoute);
  } catch (error) {
    console.error('Error removing route:', error);
    res.status(500).json({ error: 'Error removing route', details: error.message });
  }
};

exports.getDriverRoutes = async (req, res) => {
  const { idUser } = req.params;

  if (!idUser) {
    return res.status(400).json({ error: 'idUser requerido' });
  }

  try {
    const driverRoute = await DriverRoute.findOne({ idUser });

    if (!driverRoute) {
      return res.status(404).json({ error: 'Id no encontrado' });
    }

    res.status(200).json(driverRoute);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error', details: error.message });
  }
};