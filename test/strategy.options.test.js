/* global describe, it, expect, before */
/* jshint expr: true */

var chai = require('chai')
  , Strategy = require('../lib/strategy');


describe('Strategy', function() {
    
  describe('handling a request with a body, but no username and password and secretKey, with message option to authenticate', function() {
    var strategy = new Strategy(function(username, password, secretKey, done) {
      throw new Error('should not be called');
    });
    
    var info, status;
    
    before(function(done) {
      chai.passport(strategy)
        .fail(function(i, s) {
          info = i;
          status = s;
          done();
        })
        .req(function(req) {
          req.body = {};
        })
        .authenticate({ badRequestMessage: 'Something is wrong with this request' });
    });
    
    it('should fail with info and status', function() {
      expect(info).to.be.an.object;
      expect(info.message).to.equal('Something is wrong with this request');
      expect(status).to.equal(400);
    });
  });
  
});
