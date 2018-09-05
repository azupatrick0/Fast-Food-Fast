import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index.js';

chai.use(chaiHttp);
const should = chai.should();

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

const emptyInputs = {
  name: '',
  email: '',
  meal: '',
  quantity: '',
  price: '',
  location: '',
}

const invalidEmail = {
  email: 'azzz@zssscom',
}

const statusToUpdateTo = {
  status: 'completed',
}

const emptyStatus = '';

describe('Fast-Food-Fast Test Suite', () => {

  // ==== Place a new order ==== //

  describe(' POST /orders', () => {
    it('should place a new order', (done) => {
      chai.request(app)
        .post('/api/v1/orders')
        .send(newestOrder)
        .end((err, res) => {
          if (err) throw err;
          res.status.should.equal(201);
          res.body.should.be.a('object'); 
          res.body.should.have.property('success'); 
          res.body.should.have.property('data'); 
          res.body.success.should.be.a('boolean'); 
          res.body.data.should.be.a('object'); 
          res.body.success.should.equal(true);
          res.body.data.message.should.be.a('string');
          res.body.data.message.should.equal('Your order has been processed, thank you.'); 
          done();
        });
    });
  });

  describe(' POST /orders', () => {
    it('should not place a new order', (done) => {
      chai.request(app)
        .post('/api/v1/orders')
        .send(invalidOrder)
        .end((err, res) => {
          if (err) throw err;
          res.status.should.equal(404);
          res.body.should.be.a('object'); 
          res.body.should.have.property('success'); 
          res.body.should.have.property('data'); 
          res.body.success.should.be.a('boolean'); 
          res.body.data.should.be.a('object'); 
          res.body.success.should.equal(false);
          res.body.data.message.should.be.a('string');
          res.body.data.message.should.equal('Sorry, user not found, order not made'); 
          done();
        });
    });
  });

  describe(' POST /orders', () => {
    it('should return error on empty input fields and not place a new order', (done) => {
      chai.request(app)
        .post('/api/v1/orders')
        .send(emptyInputs)
        .end((err, res) => {
          if (err) throw err;
          res.status.should.equal(400);
          res.body.should.be.a('object'); 
          res.body.should.have.property('success'); 
          res.body.should.have.property('error'); 
          res.body.success.should.be.a('boolean'); 
          res.body.error.should.be.a('string'); 
          res.body.success.should.equal(false); 
          done();
        });
    });
  });

  describe(' POST /orders', () => {
    it('should return error on invalid email and not place a new order', (done) => {
      chai.request(app)
        .post('/api/v1/orders')
        .send(invalidEmail)
        .end((err, res) => {
          if (err) throw err;
          res.status.should.equal(400);
          res.body.should.be.a('object'); 
          res.body.should.have.property('success'); 
          res.body.should.have.property('error');
          res.body.success.should.be.a('boolean'); 
          res.body.error.should.be.a('string'); 
          res.body.success.should.equal(false); 
          done();
        });
    });
  });

  
  // ==== Get all orders ==== //
  describe(' GET /orders', () => {
    it('should list all orders', (done) => {
      chai.request(app)
        .get('/api/v1/orders')
        .end((err, res) => {
          if (err) throw err;
          res.status.should.equal(200); 
          res.body.should.be.a('object'); 
          res.body.should.have.property('status'); 
          res.body.should.have.property('data'); 
          res.body.status.should.be.a('string'); 
          res.body.data.should.be.a('object'); 
          res.body.status.should.equal('success');
          res.body.data.message.should.be.a('string');
          res.body.data.orders.should.be.a('array');
          res.body.data.message.should.equal('All orders returned, thank you.');
          done();
        });
    });
  });

   // ==== Fetch a specific order ==== //

   describe(' GET /orders/<orderId>', () => {
    it('should fetch a specific order', (done) => {
      chai.request(app)
        .get('/api/v1/orders/2')
        .end((err, res) => {
          if (err) throw err;
          res.status.should.equal(200);
          res.body.should.be.a('object'); 
          res.body.should.have.property('status'); 
          res.body.should.have.property('data'); 
          res.body.status.should.be.a('string'); 
          res.body.data.should.be.a('object'); 
          res.body.status.should.equal('success');
          res.body.data.message.should.be.a('string');
          res.body.data.order.should.be.a('object');
          res.body.data.message.should.equal('specific order returned, thank you.');
          done();
        });
    });
  });

  describe(' GET /orders/<orderId>', () => {
    it('should not fetch a specific order', (done) => {
      chai.request(app)
        .get('/api/v1/orders/2000')
        .end((err, res) => {
          if (err) throw err;
          res.status.should.equal(404);
          res.body.should.be.a('object'); 
          res.body.should.have.property('status'); 
          res.body.should.have.property('data'); 
          res.body.status.should.be.a('string'); 
          res.body.data.should.be.a('object'); 
          res.body.status.should.equal('fail');
          res.body.data.message.should.be.a('string');
          res.body.data.message.should.equal('Sorry, order with id => 2000, not found');
          done();
        });
    });
  });

   // ==== Update the status of an order ==== //

   describe(' PUT /orders', () => {
    it('should update the status of an order', (done) => {
      chai.request(app)
        .put('/api/v1/orders/2')
        .send(statusToUpdateTo)
        .end((err, res) => {
          if (err) throw err;
          res.status.should.equal(200);
          res.body.should.be.a('object'); 
          res.body.should.have.property('status'); 
          res.body.should.have.property('data'); 
          res.body.status.should.be.a('string'); 
          res.body.data.should.be.a('object'); 
          res.body.status.should.equal('success');
          res.body.data.message.should.be.a('string');
          res.body.data.order.should.be.a('array');
          res.body.data.message.should.equal('Status of order with id => 2, updated successfully.');
          done();
        });
    });
  });

  
  describe(' PUT /orders', () => {
    it('should not update the status of an order', (done) => {
      chai.request(app)
        .put('/api/v1/orders/2000')
        .send(statusToUpdateTo)
        .end((err, res) => {
          if (err) throw err;
          res.status.should.equal(404);
          res.body.should.be.a('object'); 
          res.body.should.have.property('status'); 
          res.body.should.have.property('data'); 
          res.body.status.should.be.a('string'); 
          res.body.data.should.be.a('object'); 
          res.body.status.should.equal('fail');
          res.body.data.message.should.be.a('string');
          res.body.data.message.should.equal('Sorry, order with id => 2000, not found');
          done();
        });
    });
  });

  describe(' PUT /orders', () => {
    it('should fail on empty status field', (done) => {
      chai.request(app)
        .put('/api/v1/orders/2')
        .send(emptyStatus)
        .end((err, res) => {
          if (err) throw err;
          res.status.should.equal(400);
          res.body.should.be.a('object'); 
          res.body.should.have.property('status'); 
          res.body.should.have.property('data');
          res.body.status.should.be.a('string'); 
          res.body.data.should.be.a('object'); 
          res.body.status.should.equal('fail');
          res.body.data.message.should.equal('status cannot be empty');
          done();
        });
    });
  });

});
