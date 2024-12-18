const { Server } = require("socket.io");
const setupSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL,
      methods: ["GET", "POST"],
    },
  });
  io.on("connection", (socket) => {
    console.log("Usuario conectado:", socket.id);

    // Escucha la ubicación del conductor
    socket.on("sendLocation", (location) => {
      console.log("Ubicación recibida:", location);

      // Envía la ubicación a los pasajeros
      io.emit("receiveLocation", location);
    });

    socket.on("disconnect", () => {
      console.log("Usuario desconectado:", socket.id);
    });

    /*socket.on("sendLocation", ({ location, targetId }) => {
      socket.to(targetId).emit("receiveLocation", location);
    });
    EN CASO DE QUE ENVIEMOS DATOS A SOLO UN TIPO DE USUARIO*/
    
  });
};
module.exports = setupSocket;
