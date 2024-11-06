const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const helloRoute = require('./src/routes/hello');
const routes = require('./src/routes/routes');
const descriptionRoutes = require('./src/routes/descriptionRoutes');
const userFavorites = require('./src/routes/userFavorites');
require('dotenv').config();

const uri = process.env.MONGODB_URI;

app.use(express.json());

app.use('/hello', helloRoute);
app.use('/routes', routes);
app.use('/descriptions', descriptionRoutes);
app.use('/userFavorites', userFavorites);
mongoose.connect(uri, {})
  .then(() => console.log('Conectado a la base de datos'))
  .catch(err => console.error('Error al conectar a la base de datos:', err));

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});