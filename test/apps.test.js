process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();

chai.use(chaiHttp);

describe('App CRUD Tests', () => {
  const appName = 'testApp';
  let userId;
  let appId;

  before((done) => {
    // Create a new user
    chai.request(server)
      .post('/users')
      .send({
        name: 'testUser'
      }).end((err, res) => {
        userId = res.body.id;
        done();
      });
  });

  beforeEach((done) => {
    console.log('executing test as It');
    done();
  });

  after((done) => {
    chai.request(server)
      .delete(`/users/${userId}`)
      .end(() => {
        done();
      });
  });

  it('should get an empty array for apps', (done) => {
    chai.request(server)
      .get(`/users/${userId}/apps`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(0);
        done();
      });
  });

  it('should create an app', (done) => {
    chai.request(server)
      .post(`/users/${userId}/apps`)
      .send({
        appName
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('id');
        res.body.should.have.property('userId', userId);
        res.body.should.have.property('name', appName);
        appId = res.body.id;
        done();
      });
  });

  it('should get an app of user', (done) => {
    chai.request(server)
      .get(`/users/${userId}/apps`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(1);
        res.body.should.deep.include.members([{
          name: appName,
          id: appId,
          userId: userId
        }]);
        done();
      });
  });

  it('should remove app', (done) => {
    chai.request(server)
      .delete(`/users/${userId}/apps/${appId}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message', 'App Removed Successfully.');
        done();
      });
  });

  it('should remove non-existent app', (done) => {
    chai.request(server)
      .delete(`/users/${userId}/apps/fooBar`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message', 'App not found.');
        done();
      });
  });

});
