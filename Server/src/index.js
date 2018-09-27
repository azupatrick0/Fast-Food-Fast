// Import modules
import express from 'express';
import bodyParser from 'body-parser';
import apiRoutes from './routes/index';

// Express app
const app = express();

// Port
const port = process.env.PORT || 3000;

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// If the user makes a request to the /api/v1 route, hand control to the apiRoutes
app.use('/api/v1', apiRoutes);

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
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
