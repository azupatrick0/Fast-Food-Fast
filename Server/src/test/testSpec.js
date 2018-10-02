import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import app from '../index';

dotenv.config();
chai.use(chaiHttp);
chai.should();

// Token
const userToken = jwt.sign({ email: 'email@email.com' }, process.env.SECRET_KEY, {
  expiresIn: 86400, // expires in 24 hours
});

// User details
const userDetails = {
  name: 'Azu Patrick',
  email: 'email@email.com',
  password: 'password',
  role: 'admin',
};

// Empty User details
const emptySignUpInputs = {
  name: '',
  email: '',
  password: '',
  role: '',
};

const invalidEmail = {
  name: 'John Doe',
  email: 'email2email.com',
  password: 'password',
  role: 'user',
};

const loginDetails = {
  email: 'email@email.com',
  password: 'password',
};

const invalidLogin = {
  email: '',
  password: 'dfd',
};


// New order
const newestOrder = {
  menuid: 1,
  userid: 1,
  name: 'Azu Patrick',
  quantity: 1,
  amount: 800,
  location: 'Lagos',
};

// Empty order details
const emptyInputs = {
  menuid: '',
  userid: '',
  name: '',
  quantity: '',
  price: '',
  location: '',
};

// New food item
const foodItem = {
  meal: 'Fruttie',
  price: 400,
};

// Empty food item
const emptyFoodItem = {
  meal: '',
  price: '',
};

const statusToUpdateTo = {
  status: 'complete',
};

const emptyStatus = '';

const wrongStatus = {
  status: 'wrongstatus',
};

// Updated food item
const updatedFoodItem = {
  meal: 'Fruttie',
  price: 700,
};


describe('Fast-Food-Fast Test Suite', () => {
  // ==== Register a new user ==== //

  describe(' POST auth/signup - register a new user', () => {
    it('should return error on invalid email and not register a user', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(invalidEmail)
        .end((err, res) => {
          if (err) throw err;
          res.status.should.equal(400);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('data');
          res.body.status.should.be.a('string');
          res.body.data.message.should.be.a('string');
          res.body.status.should.equal('fail');
          res.body.data.message.should.equal('Invalid email address');
          done();
        });
    });

    it('should return error on sign up details empty and not register a user', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(emptySignUpInputs)
        .end((err, res) => {
          if (err) throw err;
          res.status.should.equal(400);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('data');
          res.body.status.should.be.a('string');
          res.body.data.message.should.be.a('string');
          res.body.status.should.equal('fail');
          res.body.data.message.should.equal('name cannot be less than 3 characters');
          done();
        });
    });

    it('should register a new user', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(userDetails)
        .end((err, res) => {
          if (err) throw err;
          res.status.should.equal(201);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('data');
          res.body.status.should.be.a('string');
          res.body.data.should.be.a('object');
          res.body.status.should.equal('success');
          res.body.data.message.should.be.a('string');
          res.body.data.message.should.equal('New user created');
          done();
        });
    });
  });

  // ==== Login a user ==== //

  describe(' POST /auth/login - login a user', () => {
    it('should not login a user on invalid inputs', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(invalidLogin)
        .end((err, res) => {
          if (err) throw err;
          res.status.should.equal(400);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('data');
          res.body.status.should.be.a('string');
          res.body.data.should.be.a('object');
          res.body.status.should.equal('fail');
          res.body.data.message.should.be.a('string');
          res.body.data.message.should.equal('email cannot be empty');
          done();
        });
    });

    it('should login a user', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(loginDetails)
        .end((err, res) => {
          if (err) throw err;
          res.status.should.equal(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('data');
          res.body.status.should.be.a('string');
          res.body.data.should.be.a('object');
          res.body.data.should.have.property('token');
          res.body.status.should.equal('success');
          res.body.data.message.should.be.a('string');
          res.body.data.message.should.equal('Welcome, Azu Patrick');
          done();
        });
    });
  });

  // ==== Add a new food item to menu==== //
  describe(' POST /menu - add a new food item to menu', () => {
    it('should not add a new food item on empty inputs', (done) => {
      chai.request(app)
        .post(`/api/v1/menu?token=${userToken}&role=admin`)
        .send(emptyFoodItem)
        .end((err, res) => {
          if (err) throw err;
          console.log(userToken);
          res.status.should.equal(400);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('data');
          res.body.status.should.be.a('string');
          res.body.data.should.be.a('object');
          res.body.status.should.equal('fail');
          res.body.data.message.should.be.a('string');
          res.body.data.message.should.equal('meal cannot be empty');
          done();
        });
    });

    it('should not add a new food item if no token is provided', (done) => {
      chai.request(app)
        .post('/api/v1/menu?role=admin')
        .end((err, res) => {
          if (err) throw err;
          res.status.should.equal(403);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('data');
          res.body.status.should.be.a('string');
          res.body.data.should.be.a('object');
          res.body.status.should.equal('fail');
          res.body.data.message.should.be.a('string');
          res.body.data.message.should.equal('No token provided.');
          done();
        });
    });

    it('should not add a new food item if token is wrong', (done) => {
      chai.request(app)
        .post('/api/v1/menu?role=admin&token=wrongtoken')
        .end((err, res) => {
          if (err) throw err;
          res.status.should.equal(500);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('data');
          res.body.status.should.be.a('string');
          res.body.data.should.be.a('object');
          res.body.status.should.equal('fail');
          res.body.data.message.should.be.a('string');
          res.body.data.message.should.equal('Failed to authenticate user token.');
          done();
        });
    });

    it('should not add a new food item if role is not admin', (done) => {
      chai.request(app)
        .post(`/api/v1/menu?role=user&token=${userToken}`)
        .send(foodItem)
        .end((err, res) => {
          if (err) throw err;
          res.status.should.equal(403);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('data');
          res.body.status.should.be.a('string');
          res.body.data.should.be.a('object');
          res.body.status.should.equal('fail');
          res.body.data.message.should.be.a('string');
          res.body.data.message.should.equal('Sorry, only an admin can access this endpoint');
          done();
        });
    });

    it('should add a new food item', (done) => {
      chai.request(app)
        .post(`/api/v1/menu?token=${userToken}&role=admin`)
        .send(foodItem)
        .end((err, res) => {
          if (err) throw err;
          res.status.should.equal(201);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('data');
          res.body.status.should.be.a('string');
          res.body.data.should.be.a('object');
          res.body.status.should.equal('success');
          res.body.data.message.should.be.a('string');
          res.body.data.message.should.equal('New food item added to menu successfully.');
          done();
        });
    });
  });

  // ==== Place a new order ==== //

  describe(' POST /orders - place a new order', () => {
    it('should place a new order', (done) => {
      chai.request(app)
        .post(`/api/v1/orders?&token=${userToken}`)
        .send(newestOrder)
        .end((err, res) => {
          if (err) throw err;
          res.status.should.equal(201);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('data');
          res.body.status.should.be.a('string');
          res.body.data.should.be.a('object');
          res.body.status.should.equal('success');
          res.body.data.message.should.be.a('string');
          done();
        });
    });

    it('should not place a new order if order inputs are empty', (done) => {
      chai.request(app)
        .post(`/api/v1/orders?&token=${userToken}`)
        .send(emptyInputs)
        .end((err, res) => {
          if (err) throw err;
          res.status.should.equal(400);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('data');
          res.body.status.should.be.a('string');
          res.body.data.should.be.a('object');
          res.body.status.should.equal('fail');
          res.body.data.message.should.be.a('string');
          res.body.data.message.should.equal('menu id cannot be empty');
          done();
        });
    });

    it('should not place a new order if there is no token', (done) => {
      chai.request(app)
        .post('/api/v1/orders')
        .send(newestOrder)
        .end((err, res) => {
          if (err) throw err;
          res.status.should.equal(403);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('data');
          res.body.status.should.be.a('string');
          res.body.data.should.be.a('object');
          res.body.status.should.equal('fail');
          res.body.data.message.should.be.a('string');
          res.body.data.message.should.equal('No token provided.');
          done();
        });
    });

    it('should not place a new order if token is wrong', (done) => {
      chai.request(app)
        .post('/api/v1/orders?token=wrongtoken')
        .send(newestOrder)
        .end((err, res) => {
          if (err) throw err;
          res.status.should.equal(500);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('data');
          res.body.status.should.be.a('string');
          res.body.data.should.be.a('object');
          res.body.status.should.equal('fail');
          res.body.data.message.should.be.a('string');
          res.body.data.message.should.equal('Failed to authenticate user token.');
          done();
        });
    });
  });

  // ==== Get all orders ==== //
  describe(' GET /orders - get all orders', () => {
    it('should list all orders', (done) => {
      chai.request(app)
        .get(`/api/v1/orders?role=admin&token=${userToken}`)
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

    it('should fail on user not an admin', (done) => {
      chai.request(app)
        .get(`/api/v1/orders?role=user&token=${userToken}`)
        .end((err, res) => {
          if (err) throw err;
          res.status.should.equal(403);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('data');
          res.body.status.should.be.a('string');
          res.body.data.should.be.a('object');
          res.body.status.should.equal('fail');
          res.body.data.message.should.equal('Sorry, only an admin can access this endpoint');
          done();
        });
    });

    it('should not get all orders if there is no token', (done) => {
      chai.request(app)
        .get('/api/v1/orders?role=admin')
        .end((err, res) => {
          if (err) throw err;
          res.status.should.equal(403);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('data');
          res.body.status.should.be.a('string');
          res.body.data.should.be.a('object');
          res.body.status.should.equal('fail');
          res.body.data.message.should.be.a('string');
          res.body.data.message.should.equal('No token provided.');
          done();
        });
    });

    it('should not get all orders if token is wrong', (done) => {
      chai.request(app)
        .post('/api/v1/orders?role=admin&token=wrongtoken')
        .end((err, res) => {
          if (err) throw err;
          res.status.should.equal(500);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('data');
          res.body.status.should.be.a('string');
          res.body.data.should.be.a('object');
          res.body.status.should.equal('fail');
          res.body.data.message.should.be.a('string');
          res.body.data.message.should.equal('Failed to authenticate user token.');
          done();
        });
    });
  });

  // ==== Update the status of an order ==== //

  describe(' PUT /orders - update the status of an order', () => {
    it('should update the status of an order', (done) => {
      chai.request(app)
        .put(`/api/v1/orders/1?role=admin&token=${userToken}`)
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
          res.body.data.message.should.equal('Status of order with id => 1, updated successfully.');
          done();
        });
    });

    it('should not update the status of an order', (done) => {
      chai.request(app)
        .put(`/api/v1/orders/2000?role=admin&token=${userToken}`)
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

    it('should fail on empty status field', (done) => {
      chai.request(app)
        .put(`/api/v1/orders/1?role=admin&token=${userToken}`)
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

    it('should fail if status is not [completed,accepted,rejected]', (done) => {
      chai.request(app)
        .put(`/api/v1/orders/1?role=admin&token=${userToken}`)
        .send(wrongStatus)
        .end((err, res) => {
          if (err) throw err;
          res.status.should.equal(400);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('data');
          res.body.status.should.be.a('string');
          res.body.data.should.be.a('object');
          res.body.status.should.equal('fail');
          res.body.data.message.should.equal('status must be either complete, new, processing, or cancelled');
          done();
        });
    });

    it('should fail on user not an admin', (done) => {
      chai.request(app)
        .put(`/api/v1/orders/1?role=user&token=${userToken}`)
        .send(statusToUpdateTo)
        .end((err, res) => {
          if (err) throw err;
          res.status.should.equal(403);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('data');
          res.body.status.should.be.a('string');
          res.body.data.should.be.a('object');
          res.body.status.should.equal('fail');
          res.body.data.message.should.equal('Sorry, only an admin can access this endpoint');
          done();
        });
    });

    it('should not update the status of an order if there is no token', (done) => {
      chai.request(app)
        .put('/api/v1/orders/1?role=admin')
        .end((err, res) => {
          if (err) throw err;
          res.status.should.equal(403);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('data');
          res.body.status.should.be.a('string');
          res.body.data.should.be.a('object');
          res.body.status.should.equal('fail');
          res.body.data.message.should.be.a('string');
          res.body.data.message.should.equal('No token provided.');
          done();
        });
    });

    it('should not update the status of an order if token is wrong', (done) => {
      chai.request(app)
        .put('/api/v1/orders/1?role=admin&token=wrongtoken')
        .end((err, res) => {
          if (err) throw err;
          res.status.should.equal(500);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('data');
          res.body.status.should.be.a('string');
          res.body.data.should.be.a('object');
          res.body.status.should.equal('fail');
          res.body.data.message.should.be.a('string');
          res.body.data.message.should.equal('Failed to authenticate user token.');
          done();
        });
    });
  });

  // ==== Fetch a specific order ==== //

  describe(' GET /orders/<orderId> - fetch a specific order', () => {
    it('should fetch a specific order', (done) => {
      chai.request(app)
        .get(`/api/v1/orders/1?role=admin&token=${userToken}`)
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
          res.body.data.message.should.equal('specific order returned, thank you.');
          done();
        });
    });

    it('should not fetch a specific order', (done) => {
      chai.request(app)
        .get(`/api/v1/orders/2000?role=admin&token=${userToken}`)
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

    it('should fail on user not an admin', (done) => {
      chai.request(app)
        .get(`/api/v1/orders/1?role=user&token=${userToken}`)
        .end((err, res) => {
          if (err) throw err;
          res.status.should.equal(403);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('data');
          res.body.status.should.be.a('string');
          res.body.data.should.be.a('object');
          res.body.status.should.equal('fail');
          res.body.data.message.should.equal('Sorry, only an admin can access this endpoint');
          done();
        });
    });

    it('should not fetch a specific order if there is no token', (done) => {
      chai.request(app)
        .get('/api/v1/orders/1?role=admin')
        .end((err, res) => {
          if (err) throw err;
          res.status.should.equal(403);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('data');
          res.body.status.should.be.a('string');
          res.body.data.should.be.a('object');
          res.body.status.should.equal('fail');
          res.body.data.message.should.be.a('string');
          res.body.data.message.should.equal('No token provided.');
          done();
        });
    });
  });

  // ==== User get available menu ==== //

  describe(' GET /menu - user gets available menu', () => {
    it('should help a user to get available menu', (done) => {
      chai.request(app)
        .get(`/api/v1/menu?token=${userToken}`)
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
          res.body.data.message.should.equal('Available menu returned successfully.');
          done();
        });
    });

    it('should not help a user to get available menu if no token is provided', (done) => {
      chai.request(app)
        .get('/api/v1/menu')
        .end((err, res) => {
          if (err) throw err;
          res.status.should.equal(403);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('data');
          res.body.status.should.be.a('string');
          res.body.data.should.be.a('object');
          res.body.status.should.equal('fail');
          res.body.data.message.should.be.a('string');
          res.body.data.message.should.equal('No token provided.');
          done();
        });
    });

    it('should not help a user to get available menu if token is wrong', (done) => {
      chai.request(app)
        .get('/api/v1/menu?token=wrongtoken')
        .end((err, res) => {
          if (err) throw err;
          res.status.should.equal(500);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('data');
          res.body.status.should.be.a('string');
          res.body.data.should.be.a('object');
          res.body.status.should.equal('fail');
          res.body.data.message.should.be.a('string');
          res.body.data.message.should.equal('Failed to authenticate user token.');
          done();
        });
    });
  });

  // ==== User see history of ordered food ==== //

  describe(' GET /users/<userId>/orders - user see history of ordered food', () => {
    it('should help a user see history of ordered food', (done) => {
      chai.request(app)
        .get(`/api/v1/users/1/orders?&token=${userToken}`)
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
          res.body.data.message.should.equal('All orders history returned, thank you.');
          done();
        });
    });

    it('should not help a user see history of ordered food if there is no token', (done) => {
      chai.request(app)
        .get('/api/v1/users/1/orders')
        .end((err, res) => {
          if (err) throw err;
          res.status.should.equal(403);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('data');
          res.body.status.should.be.a('string');
          res.body.data.should.be.a('object');
          res.body.status.should.equal('fail');
          res.body.data.message.should.be.a('string');
          res.body.data.message.should.equal('No token provided.');
          done();
        });
    });

    it('should not help a user see history of ordered food if token is wrong', (done) => {
      chai.request(app)
        .get('/api/v1/users/1/orders?&token=wrongtoken')
        .end((err, res) => {
          if (err) throw err;
          res.status.should.equal(500);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('data');
          res.body.status.should.be.a('string');
          res.body.data.should.be.a('object');
          res.body.status.should.equal('fail');
          res.body.data.message.should.be.a('string');
          res.body.data.message.should.equal('Failed to authenticate user token.');
          done();
        });
    });
  });

  // ==== Admin can edit food items in the menu ==== //

  describe(' PUT /menu/itemsId - edit a food item in the menu', () => {
    it('should not edit a food item on empty inputs', (done) => {
      chai.request(app)
        .put(`/api/v1/menu/1?role=admin&token=${userToken}`)
        .send(emptyFoodItem)
        .end((err, res) => {
          if (err) throw err;
          res.status.should.equal(400);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('data');
          res.body.status.should.be.a('string');
          res.body.data.should.be.a('object');
          res.body.status.should.equal('fail');
          res.body.data.message.should.be.a('string');
          res.body.data.message.should.equal('meal cannot be empty');
          done();
        });
    });

    it('should not edit a food item if no token is provided', (done) => {
      chai.request(app)
        .put('/api/v1/menu/1?role=admin')
        .end((err, res) => {
          if (err) throw err;
          res.status.should.equal(403);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('data');
          res.body.status.should.be.a('string');
          res.body.data.should.be.a('object');
          res.body.status.should.equal('fail');
          res.body.data.message.should.be.a('string');
          res.body.data.message.should.equal('No token provided.');
          done();
        });
    });

    it('should not edit a food item if token is wrong', (done) => {
      chai.request(app)
        .put('/api/v1/menu/1?role=admin&token=wrongtoken')
        .end((err, res) => {
          if (err) throw err;
          res.status.should.equal(500);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('data');
          res.body.status.should.be.a('string');
          res.body.data.should.be.a('object');
          res.body.status.should.equal('fail');
          res.body.data.message.should.be.a('string');
          res.body.data.message.should.equal('Failed to authenticate user token.');
          done();
        });
    });

    it('should not edit a food item if role is not admin', (done) => {
      chai.request(app)
        .put(`/api/v1/menu/1?role=user&token=${userToken}`)
        .send(emptyFoodItem)
        .end((err, res) => {
          if (err) throw err;
          res.status.should.equal(403);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('data');
          res.body.status.should.be.a('string');
          res.body.data.should.be.a('object');
          res.body.status.should.equal('fail');
          res.body.data.message.should.be.a('string');
          res.body.data.message.should.equal('Sorry, only an admin can access this endpoint');
          done();
        });
    });

    it('should edit a food item', (done) => {
      chai.request(app)
        .put(`/api/v1/menu/1?role=admin&token=${userToken}`)
        .send(updatedFoodItem)
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
          res.body.data.message.should.equal('Item with id => 1, updated successfully.');
          done();
        });
    });
  });
});
