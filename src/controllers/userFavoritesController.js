const UserFavorites = require('../models/UserFavorites');

exports.createUserFavorites = async (req, res) => {
  const { idUser, favoriteRoutes } = req.body;

  if (!idUser || !favoriteRoutes) {
    return res.status(400).json({ error: 'idUser and favoriteRoutes are required' });
  }

  try {
    const userFavorites = new UserFavorites({ idUser, favoriteRoutes });
    await userFavorites.save();
    res.status(201).json(userFavorites);
  } catch (error) {
    console.error('Error saving user favorites:', error);
    res.status(500).json({ error: 'Error saving user favorites', details: error.message });
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

    res.status(200).json(userFavorites);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error', details: error.message });
  }
}