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
      res.status(500).json({ error: 'Error saving user favorites' });
    }
  };