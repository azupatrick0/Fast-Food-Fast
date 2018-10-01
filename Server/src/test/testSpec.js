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
});
