class notFoundPage {
  static notFound(req, res) {
    return res.status(404).json({
      status: 'fail',
      data: {
        message: '404, page not found',
      },
    });
  }
}

export default notFoundPage;
