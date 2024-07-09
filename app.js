const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const userRoutes = require('./src/routes/usersRout');
const productRoutes = require('./src/routes/productsRout');
const authMiddleware = require('./src/middleware/authMiddleware');
require('dotenv').config();


const app = express();
app.use(express.json());


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

// נקודות קצה לדוגמה
app.get('/', (req, res) => {
  res.send('Hello World');
});

// שימוש בנתיבים
app.use('/api', userRoutes); // כל הנתיבים של היוזרים תחת /api

// אפשר להוסיף נתיבים נוספים כאן
// app.use('/api', productRoutes); 

module.exports = app;


