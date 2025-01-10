import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*", 
        methods: ["GET", "POST"],
    },
});

app.get("/", (req, res) => {
    res.send("<h1>Hello from Express and Socket.IO server!</h1>");
});

io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);
    socket.join("room1");
    socket.leave(socket.id);

    socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
    });

    socket.on("changeSquare", (currentBoard, currentPlayer) => {
        console.log(currentBoard)
        console.log(currentPlayer)
        console.log(socket.rooms)
        io.emit("changeSquare", currentBoard, currentPlayer)
    })
});

server.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
