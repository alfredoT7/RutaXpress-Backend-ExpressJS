const { server } = require('socket.io');

module.exports = function(io) {
    // Evento para cuando un usuario se conecta
    io.on('connection', (socket) => {
      console.log('Un usuario se ha conectado', socket.id);
  
      // Evento para recibir la ubicación del usuario
      socket.on('sendLocation', (data) => {
        console.log(`Ubicación de ${socket.id}:`, data);
        // Emitir la ubicación a otros usuarios (si es necesario)
        io.emit('userLocation', data);
      });
  
      // Evento para cuando el usuario se desconecta
      socket.on('disconnect', () => {
        console.log('Un usuario se ha desconectado', socket.id);
      });
    });
  };
  