console.log('START index.js');

const express = require('express');
require('dotenv').config();
const path = require('path');
const connectDB = require('./config/database');
const apiRoutes = require('./config/routes');

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
// 🔹 Swagger חייב להיות לפני routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// 🔹 API routes
app.use('/api', apiRoutes);

const PORT = process.env.PORT || 3000;

console.log('BEFORE connectDB');

connectDB()
  .then(() => {
    console.log('AFTER connectDB');
    app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('CONNECT DB ERROR:', err);
  });
