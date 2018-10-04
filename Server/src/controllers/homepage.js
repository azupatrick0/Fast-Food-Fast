import dotenv from 'dotenv';

dotenv.config();
// Home page
class homePage {
  static home(req, res) {
    console.log(process.env.SECRET_KEY);
    // Home page found
    return res.status(200).json({
      status: 'success',
      data: {
        message: 'Welcome to Fast-Food-Fast API, the most delicious API in the world',
      },
    });
  }
}

// Export homePage
export default homePage;
