process.env.NODE_ENV = 'test';


let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

describe('Server Tests', () => {
    beforeEach((done) => {
        console.log('executing test as It');
        done();
    });

    it('should get code as 200 for Path / ', (done) => {
            chai.request(server)
                .get('/')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message');
                    res.body.should.have.property('message').eql('Welcome to my user application.');
                    done();
                })
        }),
        it('should get code as 404 for undefined routes', (done) => {
            chai.request(server)
                .get('/somerandomroute')
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                })
        })
})