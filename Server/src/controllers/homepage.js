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
  static docs(req, res) {
    // Docs found
    res.redirect('http://fastfoodfast10.docs.apiary.io/');
  }
}

// Export homePage
export default homePage;
