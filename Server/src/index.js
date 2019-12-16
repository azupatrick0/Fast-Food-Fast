import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import cors from 'cors';

import { menu, orders, users, homePage, notFoundPage } from './routes/index';

const app = express();

const port = process.env.PORT || 4004;

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static('./build'));
// Endpoints
app.use('/api/v1/menu', menu);
app.use('/api/v1/orders', orders);
app.use('/api/v1/users', orders);
app.use('/api/v1/auth', users);
app.use('/api/v1', homePage);
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

export default app;
