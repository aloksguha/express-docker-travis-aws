process.env.NODE_ENV = 'test';


let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

describe('USER crud Tests', () => {
    beforeEach((done) => {
        console.log('executing test as It');
        done();
    });
    it('should get users', (done) => {
        chai.request(server)
            .get('/users')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
                done();
            })
    }),
    it('should add an user', (done) => {
        let user = {
            name : 'testUser'
        }
        chai.request(server)
            .post('/users')
            .send(user)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property('id');
                res.body.should.have.property('name');
                done();
            })
    })

});