const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const cors = require("cors");
app.use(cors());

const port = 3001; // choose any port number
app.get("/", (req, res) => {
  res.send("hello");
});
// Handle socket connections
io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  // Handle the "signal" event when a peer sends a signal
  socket.on("signal", (data) => {
    // Broadcast the signal to all other connected peers
    socket.broadcast.emit("signal", data);
  });

  // Clean up when a peer disconnects
  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// Start the server
server.listen(port, "192.168.29.238", () => {
  console.log(`Server listening on port http://192.168.29.238:${port}/`);
});
