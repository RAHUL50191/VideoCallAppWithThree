let express = require("express");
let app = express();
let server = require("http").Server(app);
const { Server } = require("socket.io");
let io = new Server(server, { cors: { origin: "http://localhost:3000", methods: ["GET", "POST"] } });
let stream = require("./ws/stream");

io.of("/stream").on("connection", stream);

server.listen(3001);
