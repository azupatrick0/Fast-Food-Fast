'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import server from '../Server/index.js';

_chai2.default.use(_chaiHttp2.default);

var should = _chai2.default.should();

var newestOrder = {
  name: 'Azu Patrick',
  email: 'email@email.com',
  meal: 'spicy chicken',
  quantity: 1,
  price: 800,
  location: 'Lagos'
};

var invalidOrder = {
  name: 'Lucy Doe',
  email: 'unregisteredemail@email.com',
  meal: 'spicy chicken',
  quantity: 1,
  price: 800,
  location: 'Lagos'
};

describe('Fast-Food-Fast Test Suite', function () {

  // ==== Place new order ==== //
  describe(' POST /orders', function () {
    it('should insert new order to orders array', function (done) {
      _chai2.default.request('localhost:3000').post('/api/v1/orders').send(newestOrder).end(function (err, res) {
        if (err) done(err);
        res.status.should.equal(201);
        done();
      });
    });
  });

  describe(' POST /orders', function () {
    it('should not insert new order to orders array', function (done) {
      _chai2.default.request('localhost:3000').post('/api/v1/orders').send(invalidOrder).end(function (err, res) {
        if (err) done(err);
        res.status.should.equal(404);
        done();
      });
    });
  });
});