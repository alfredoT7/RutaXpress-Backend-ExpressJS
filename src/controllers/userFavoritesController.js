const UserFavorites = require('../models/UserFavorites');
const RouteDescription = require('../models/RouteDescription');

exports.addFavoriteRoute = async (req, res) => {
  const { idUser, route } = req.body;

  if (!idUser || !route) {
    return res.status(400).json({ error: 'idUser and route are required' });
  }

  try {
    const userFavorites = await UserFavorites.findOneAndUpdate(
      { idUser },
      { $addToSet: { favoriteRoutes: route } },
      { new: true, upsert: true }
    );
    res.status(200).json(userFavorites);
  } catch (error) {
    console.error('Error adding favorite route:', error);
    res.status(500).json({ error: 'Error adding favorite route', details: error.message });
  }
};

exports.removeFavoriteRoute = async (req, res) => {
  const { idUser, route } = req.body;

  if (!idUser || !route) {
    return res.status(400).json({ error: 'idUser and route are required' });
  }

  try {
    const userFavorites = await UserFavorites.findOneAndUpdate(
      { idUser },
      { $pull: { favoriteRoutes: route } },
      { new: true }
    );
    res.status(200).json(userFavorites);
  } catch (error) {
    console.error('Error removing favorite route:', error);
    res.status(500).json({ error: 'Error removing favorite route', details: error.message });
  }
};

exports.getUserFavorites = async (req, res) => {
  const { idUser } = req.params;

  if (!idUser) {
    return res.status(400).json({ error: 'idUser requerido' });
  }

  try {
    const userFavorites = await UserFavorites.findOne({ idUser });

    if (!userFavorites) {
      return res.status(404).json({ error: 'Id no encontrado' });
    }

    const favoriteRoutesWithDescriptions = await Promise.all(
      userFavorites.favoriteRoutes.map(async (routeId) => {
        const routeDescription = await RouteDescription.findOne({ routeId });
        return {
          routeId,
          description: routeDescription ? routeDescription.description : 'Descripción no encontrada'
        };
      })
    );

    res.status(200).json({
      idUser: userFavorites.idUser,
      favoriteRoutes: favoriteRoutesWithDescriptions
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error', details: error.message });
  }
};