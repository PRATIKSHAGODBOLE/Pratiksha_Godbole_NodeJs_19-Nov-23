const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server'); // Adjust the path based on your project structure

chai.use(chaiHttp);
const expect = chai.expect;

describe('Pet Adoption Website', () => {
  it('should respond with status 200 on homepage', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

});
