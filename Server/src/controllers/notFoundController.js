// 404, page not found
class notFoundPage {
  static notFound(req, res) {
    // Page not found
    return res.status(404).json({
      status: 'fail',
      data: {
        message: '404, page not found',
      },
    });
  }
}

// Export notFoundPage
export default notFoundPage;

