var Lactate = require('../lib/lactate')
var should = require('should')
var path = require('path');

describe('Options', function() {
  describe('Constructor', function() {
    var lactate = Lactate.Lactate({
      'root':'files',
      'from':'files',
      'subdirs':false,
      'hidden':true,
      'cache':false,
      'watch_files':false,
      'max_age':'one hour',
      'gzip':false,
      'minify':true,
      'bundle':true,
      'rebundle':false,
      'debug':true
    })
    it('Should have root option "files"', function() {
      var opt = lactate.get('root')
      var root_path = path.resolve('files');
      opt.should.equal(root_path);
    })
    it('Should have from option "files"', function() {
      var opt = lactate.get('from')
      opt.should.equal('files')
    })
    it('Should have subdirs option false', function() {
      var opt = lactate.get('subdirs')
      opt.should.equal(false)
    })
    it('Should have hidden option true', function() {
      var opt = lactate.get('hidden')
      opt.should.equal(true)
    })
    it('Should have cache option false', function() {
      var opt = lactate.get('cache')
      opt.should.equal(false)
    })
    it('Should have watch_files option false', function() {
      var opt = lactate.get('watch_files')
      opt.should.equal(false)
    })
    it('Should have max_age option 3600', function() {
      var opt = lactate.get('max_age')
      opt.should.equal(3600)
    })
  })
  describe('#set(object)', function() {
    var lactate = Lactate.Lactate()
    lactate.set({ 'root':'files' })
    it('Should have root option "files"', function() {
      var opt = lactate.get('root')
      var root_path = path.resolve('files');
      opt.should.equal(root_path);
    })
  })
  describe('#set(k, v)', function() {
    var lactate = Lactate.Lactate()
    lactate.set('root','files')
    it('Should have root option "files"', function() {
      var opt = lactate.get('root')
      var root_path = path.resolve('files');
      opt.should.equal(root_path);
    })
  })
  describe('#enable(k)', function() {
    var lactate = Lactate.Lactate()
    lactate.enable('minify');
    it('Should have minify option true', function() {
      var opt = lactate.get('minify')
      opt.should.equal(true);
    })
  });
  describe('#disable(k)', function() {
    var lactate = Lactate.Lactate()
    lactate.disable('subdirs');
    it('Should have subdirs option false', function() {
      var opt = lactate.get('subdirs')
      opt.should.equal(false);
    })
  });
  describe('#header(k, v)', function() {
    var lactate = Lactate.Lactate()
    lactate.header('testh', 'testv');
    it('Should have header property testh', function() {
      var opt = lactate.get('headers')
      opt.should.have.property('testh');
      opt.testh.should.equal('testv');
    })
  });
  describe('#header(k, v)', function() {
    var lactate = Lactate.Lactate()
    lactate.header('keya', 'vala');
    it('Should have header property keya', function() {
      var opt = lactate.get('headers')
      opt.should.have.property('keya');
    })
    it('Should have header value "vala"', function() {
      var opt = lactate.get('headers')
      opt.keya.should.equal('vala');
    })
  });
  describe('#headers(object)', function() {
    var lactate = Lactate.Lactate()
    lactate.headers({
      'keya': 'vala',
      'keyb': 'valb'
    });
    it('Should have header property keya "vala"', function() {
      var opt = lactate.get('headers')
      opt.should.have.property('keya');
      opt.keya.should.equal('vala');
    })
    it('Should have header property keyb "valb"', function() {
      var opt = lactate.get('headers')
      opt.should.have.property('keyb');
      opt.keyb.should.equal('valb');
    })
  });
})
