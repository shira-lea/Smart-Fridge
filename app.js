const express = require('express');
const mongoose = require('mongoose');
const http = require('http'); // קוד חדש
const socketio = require('socket.io'); // קוד חדש
const userRoutes = require('./src/routes/usersRout');
const productRoutes = require('./src/routes/productsRout');
const authMiddleware = require('./src/middleware/authMiddleware');
require('dotenv').config();


const app = express();
app.use(express.json());

const server = http.createServer(app);

const io = socketio(server);
io.on('connection', (socket) => {
  console.log('New client connected');
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});


// התחברות ל-MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch((error) => {
    console.log('Connection error:', error);
  });
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/api', userRoutes); // כל הנתיבים של היוזרים תחת /api

app.use('/api/products', productRoutes);

module.exports = app;


