import chai from 'chai';
import chaiHttp from 'chai-http';


chai.use(chaiHttp);
//const should = chai.should();

const newestOrder = {
    name: 'Azu Patrick',
    email: 'email@email.com',
    meal: 'spicy chicken',
    quantity: 1,
    price: 800,
    location: 'Lagos',
}

const invalidOrder = {
    name: 'Lucy Doe',
    email: 'unregisteredemail@email.com',
    meal: 'spicy chicken',
    quantity: 1,
    price: 800,
    location: 'Lagos',
}

describe('Fast-Food-Fast Test Suite', () => {

  // ==== Place new order ==== //
  describe(' POST /orders', () => {
    it('should insert new order to orders array', (done) => {
      chai.request('localhost:3000')
        .post('/api/v1/orders')
        .send(newestOrder)
        .end((err,res) => {
          if (err) throw err;
          res.status.chai.should().equal(201);
          done();
        });
    });
  });

  describe(' POST /orders', () => {
    it('should not insert new order to orders array', (done) => {
      chai.request('localhost:3000')
        .post('/api/v1/orders')
        .send(invalidOrder)
        .end((err,res) => {
          if (err) throw err;
          res.status.chai.should().equal(404);
          done();
        });
    });
  });

});
