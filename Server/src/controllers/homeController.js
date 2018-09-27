// Home page
class homePage {
  static home(req, res) {
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

