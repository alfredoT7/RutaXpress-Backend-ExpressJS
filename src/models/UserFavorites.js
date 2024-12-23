const mongoose = require('mongoose');

const userFavoritesSchema = new mongoose.Schema({
  idUser: {
    type: String,
    required: true,
    unique: true
  },
  favoriteRoutes: {
    type: [String],
    required: true
  }
});

module.exports = mongoose.model('UserFavorites', userFavoritesSchema);