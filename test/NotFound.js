
var should  = require('should');
var Lactate = require('../lib/lactate');
var http    = require('./utils/http_utils');
var files   = require('./utils/get_files');

describe('Not Found', function() {

  const DIR = __dirname + '/files/';

  afterEach(http.stopServer);

  describe('#set(not_found) --string', function() {
    const dir = Lactate.dir(DIR);
    dir.set('not_found', DIR + '404.html');

    it('Should not err', function(done) {
      http.server(dir.toMiddleware());
      http.client('/', function(err, res, data) {
        should.not.exist(err);
        should.exist(res);
        should.exist(data);
        done();
      })
    })
    it('Should have status 404', function(done) {
      http.server(dir.toMiddleware());
      http.client('/', function(err, res, data) {
        should.not.exist(err);
        should.exist(res);
        should.exist(data);
        res.should.have.status(404);
        done();
      })
    })
    it('Should have content-type header', function(done) {
      http.server(dir.toMiddleware());
      http.client('/', function(err, res, data) {
        should.not.exist(err);
        should.exist(res);
        should.exist(data);
        res.headers.should.have.property('content-type', 'text/html');
        done();
      })
    })
    it('Should have content-encoding header', function(done) {
      http.server(dir.toMiddleware());
      http.client('/', function(err, res, data) {
        should.not.exist(err);
        should.exist(res);
        should.exist(data);
        res.headers.should.have.property('content-encoding', 'gzip');
        done();
      })
    })
    it('Should have content-length header', function(done) {
      http.server(dir.toMiddleware());
      http.client('/', function(err, res, data) {
        should.not.exist(err);
        should.exist(res);
        should.exist(data);
        res.headers.should.have.property('content-length');
        done();
      })
    })
    it('Should have date header', function(done) {
      http.server(dir.toMiddleware());
      http.client('/', function(err, res, data) {
        should.not.exist(err);
        should.exist(res);
        should.exist(data);
        res.headers.should.have.property('date');
        done();
      })
    })
  })

  describe('#set(not_found) --string --non-existent', function() {
    var dir = Lactate.dir(DIR);
    dir.set('not_found', 'invalidpath');

    it('Should not err', function(done) {
      http.server(dir.toMiddleware());
      http.client('/', function(err, res, data) {
        should.not.exist(err);
        should.exist(res);
        should.exist(data);
        done();
      })
    })
    it('Should have status 404', function(done) {
      http.server(dir.toMiddleware());
      http.client('/', function(err, res, data) {
        should.not.exist(err);
        should.exist(res);
        should.exist(data);
        res.should.have.status(404);
        done();
      })
    })
    it('Should respond with no data', function(done) {
      http.server(dir.toMiddleware());
      http.client('/', function(err, res, data) {
        should.not.exist(err);
        should.exist(res);
        should.exist(data);
        data.should.have.property('length', 0);
        done();
      })
    })
  })

  describe('#set(not_found) --function', function() {
    const dir = Lactate.dir(DIR);
    dir.set('not_found', function(req, res) {
      res.writeHead(404);
      res.end('test');
    });

    it('Should not err', function(done) {
      http.server(dir.toMiddleware());
      http.client('/', function(err, res, data) {
        should.not.exist(err);
        should.exist(res);
        should.exist(data);
        done();
      })
    })
    it('Should have status 404', function(done) {
      http.server(dir.toMiddleware());
      http.client('/', function(err, res, data) {
        should.not.exist(err);
        should.exist(res);
        should.exist(data);
        res.should.have.status(404);
        done();
      })
    })
    it('Should respond with test string', function(done) {
      http.server(dir.toMiddleware());
      http.client('/', function(err, res, data) {
        should.not.exist(err);
        should.exist(res);
        should.exist(data);
        data.should.be.an.instanceof(Buffer);
        data.toString().should.equal('test');
        done();
      })
    })
  })
})

