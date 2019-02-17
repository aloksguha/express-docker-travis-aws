process.env.NODE_ENV = 'test';


let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

describe('Server health-check Tests', () => {
    beforeEach((done) =>{
        console.log('executing test as It');
        done();
    }); 
    
    it('should get healthcheck report', (done) => {
        chai.request(server)
        .get('/healthcheck')
        .end((err, res) =>{
            res.should.have.status(200);
            done();
        })
    })
});