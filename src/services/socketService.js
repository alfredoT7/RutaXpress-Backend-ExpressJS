// src/services/socketService.js
const { Server } = require('socket.io');

const setupSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST']
        }
    });

    const activeDrivers = {};

    io.on('connection', (socket) => {
        console.log('Nuevo cliente conectado:', socket.id);

        // Manejar ubicación de conductores
        socket.on('driverLocation', (data) => {
            const { driverId, latitude, longitude, routeId } = data;
            activeDrivers[driverId] = { latitude, longitude, routeId, socketId: socket.id };
            socket.join(routeId); 
            io.to(routeId).emit('updateDriverLocations', getDriversByRoute(routeId));
        });

        // Manejar desconexión
        socket.on('disconnect', () => {
            console.log('Cliente desconectado:', socket.id);
            for (const [driverId, driver] of Object.entries(activeDrivers)) {
                if (driver.socketId === socket.id) {
                    const { routeId } = driver;
                    delete activeDrivers[driverId];
                    io.to(routeId).emit('updateDriverLocations', getDriversByRoute(routeId));
                    break;
                }
            }
        });
    });

    const getDriversByRoute = (routeId) => {
        return Object.entries(activeDrivers)
            .filter(([_, driver]) => driver.routeId === routeId)
            .map(([driverId, driver]) => ({ driverId, latitude: driver.latitude, longitude: driver.longitude }));
    };

    return { io, activeDrivers };
};

module.exports = setupSocket;
