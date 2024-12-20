// src/config/socket.js
const { Server } = require('socket.io');
let io;

const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  });

  const activeDrivers = new Map(); // Almacena {driverId: {socketId, routeId, latitude, longitude}}

  io.on('connection', (socket) => {
    console.log('Cliente conectado:', socket.id);

    // Conductor se une a una ruta específica
    socket.on('joinRoute', ({ driverId, routeId }) => {
      socket.join(routeId);
      activeDrivers.set(driverId, {
        socketId: socket.id,
        routeId,
        latitude: null,
        longitude: null
      });
    });

    // Actualización de ubicación del conductor
    socket.on('driverLocation', ({ driverId, routeId, latitude, longitude }) => {
      if (activeDrivers.has(driverId)) {
        const driverInfo = activeDrivers.get(driverId);
        driverInfo.latitude = latitude;
        driverInfo.longitude = longitude;
        activeDrivers.set(driverId, driverInfo);

        // Emitir a todos los clientes en la ruta específica
        io.to(routeId).emit('updateDriverLocations', {
          routeId,
          drivers: Array.from(activeDrivers.entries())
            .filter(([_, info]) => info.routeId === routeId)
            .map(([id, info]) => ({
              driverId: id,
              latitude: info.latitude,
              longitude: info.longitude
            }))
        });
      }
    });

    // Pasajero se une a una ruta para recibir actualizaciones
    socket.on('joinRouteAsPassenger', ({ routeId }) => {
      socket.join(routeId);
    });

    // Manejo de desconexión
    socket.on('disconnect', () => {
      for (const [driverId, info] of activeDrivers.entries()) {
        if (info.socketId === socket.id) {
          activeDrivers.delete(driverId);
          io.to(info.routeId).emit('driverDisconnected', { driverId });
          break;
        }
      }
    });
  });

  return io;
};

const getIO = () => {
  if (!io) {
    throw new Error('Socket.io no ha sido inicializado');
  }
  return io;
};

module.exports = { initializeSocket, getIO };