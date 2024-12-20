const { io } = require('../../index');

const activeDrivers = {};

io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado:', socket.id);

    // Manejar ubicación de conductores
    socket.on('driverLocation', (data) => {
        const { driverId, latitude, longitude, routeId } = data;
        activeDrivers[driverId] = { latitude, longitude, routeId };
        socket.join(routeId); 
        io.to(routeId).emit('updateDriverLocations', activeDrivers);
    });

    // Manejar desconexión
    socket.on('disconnect', () => {
        console.log('Cliente desconectado:', socket.id);
        Object.keys(activeDrivers).forEach((driverId) => {
            if (activeDrivers[driverId].socketId === socket.id) {
                delete activeDrivers[driverId];
            }
        });
    });
});
