import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import { instrument } from "@socket.io/admin-ui";

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173", "https://admin.socket.io"],
        credentials: true,
        methods: ["GET", "POST"],
    },
});

instrument(io, {
    auth: false,
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
        console.log(currentBoard);
        console.log(currentPlayer);
        console.log(socket.rooms);
        io.emit("changeSquare", currentBoard, currentPlayer);
    });
});

app.use("/admin", express.static("node_modules/@socket.io/admin-ui/ui/dist"));

server.listen(3005, () => {
    console.log("Server running at http://localhost:3005");
});
