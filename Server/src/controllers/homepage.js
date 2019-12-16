class homePage {
  static home(req, res) {
    return res.status(200).json({
      status: 'success',
      data: {
        message: 'Welcome to Fast-Food-Fast API, the most delicious API in the world',
      },
    });
  }
  static docs(req, res) {
    res.redirect('http://fastfoodfast10.docs.apiary.io/');
  }
}

export default homePage;
