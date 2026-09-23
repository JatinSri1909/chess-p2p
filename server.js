// Import required modules
import express from 'express';
import next from 'next';
import http from 'http';
import { Server } from 'socket.io';

// Initialize Next.js app
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  // Create an Express application and HTTP server
  const expressApp = express();
  const server = http.createServer(expressApp);
  const io = new Server(server);

  // Initialize Socket.io server
  io.on('connection', (socket) => {
    // When a user joins a room
    socket.on('joinRoom', (roomId) => {
      socket.join(roomId);
    });

    // When a player makes a move
    socket.on('playerMove', ({ roomId, move }) => {
      socket.to(roomId).emit('opponentMove', move);
    });
  });

  // Handle all other routes with Next.js
  expressApp.all('*', (req, res) => handle(req, res));

  // Start the server
  server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
  });
});
