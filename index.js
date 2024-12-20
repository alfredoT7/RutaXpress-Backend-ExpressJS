// index.js
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const helloRoute = require('./src/routes/hello');
const routes = require('./src/routes/routes');
const descriptionRoutes = require('./src/routes/descriptionRoutes');
const userFavorites = require('./src/routes/userFavorites');
const routeSearchRoutes = require('./src/routes/routeSearchRoutes');
const driverRoutes = require('./src/routes/driverRoutes');
const locationRoutes = require('./src/routes/location.routes');

const setupSocket = require('./src/services/socketService');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/hello', helloRoute);
app.use('/routes', routes);
app.use('/descriptions', descriptionRoutes);
app.use('/favorites', userFavorites);
app.use('/route-search', routeSearchRoutes);
app.use('/driver-routes', driverRoutes);
app.use('/location', locationRoutes);

const server = http.createServer(app);

// Inicializar Socket.io
const { io, activeDrivers } = setupSocket(server);

mongoose.connect(process.env.MONGODB_URI, {})
    .then(() => console.log('Conectado a la base de datos'))
    .catch(err => console.error('Error al conectar a la base de datos:', err));

server.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});

module.exports = { app, io, activeDrivers };
