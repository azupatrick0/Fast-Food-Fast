// Import modules
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import cors from 'cors';

import { menu, orders, users, homePage, notFoundPage } from './routes/index';

// Express app
const app = express();

// Port
const port = process.env.PORT || 3000;

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static('./build'));

// If the user makes a request to the /api/v1/menu route, hand control to the menu route
app.use('/api/v1/menu', menu);

// If the user makes a request to the /api/v1/orders route, hand control to the orders route
app.use('/api/v1/orders', orders);

// If the user makes a request to the /api/v1/users route, hand control to the orders route
app.use('/api/v1/users', orders);

// If the user makes a request to the /api/v1/auth route, hand control to the users route
app.use('/api/v1/auth', users);

// If the user makes a request to the /api/v1/ route, hand control to the homePage route
app.use('/api/v1', homePage);

// If the user makes a request to the /api/v1/* route, hand control to the notFoundPage route
app.use('/api/v1/*', notFoundPage);

// To use other UI routes
app.get('/*', (req, res) => {
  res.sendFile(path.resolve('./build', 'index.html'));
});

// Error handler
app.use((err, req, res, next) => {
  res.status(500).json({
    success: false,
    data: {
      message: 'An error ocurred, please recheck your request parameters, then resend request!',
    },
  });
  next();
});

// Listen for requests to the specified port
app.listen(port, () => {
  console.log(`Server listening @ port => ${port}`);
});

// Export app
export default app;
