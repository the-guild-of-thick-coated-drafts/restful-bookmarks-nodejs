//-----------------------------------------------------------

var MockDB = (function(){
  var MockDB = function() {};

  MockDB.prototype.bookmarks = [
    {
      "name": "Twitter",
      "description": "@ErkoBridee",
      "url": "https://twitter.com/erkobridee"
    },
    {
      "name": "GitHub",
      "description": "github/erkobridee",
      "url": "https://github.com/erkobridee"
    },
    {
      "name": "Delicious",
      "description": "delicious/erko.bridee",
      "url": "http://www.delicious.com/erko.bridee"
    },
    {
      "name": "Site",
      "description": "Site : Erko Bridee",
      "url": "http://about.erkobridee.com/"
    }
  ];

  return MockDB;
})();

var db = new MockDB();

//-----------------------------------------------------------

var BookmarkModel = (function(db) {

  // dependencies
  var FInterface = require('../../helpers/FInterface')
    , ModelFInterface = require('../interfaces/ModelFInterface');
  
  var classDef = function() {
    FInterface.ensureImplements(this, ModelFInterface);
  };

  classDef.prototype.list = function(cb) {
    var bookmarks = [];

    db.bookmarks.forEach(function(bookmark, i) {
      bookmarks.push({
        id:i,
        name: bookmark.name,
        description: bookmark.description,
        url: bookmark.url
      });
    });

    //return bookmarks;

    cb(null, bookmarks);
  };

  classDef.prototype.find = function(id, cb) {
    var vo = "Not Found";

    if(id >= 0 && id < db.bookmarks.length) {
      vo = db.bookmarks[id];
      vo.id = id;
    }

    //return vo;

    cb(null, vo);
  };

  classDef.prototype.insert = function(vo, cb) {
    db.bookmarks.push(vo);
    
    //return vo;

    cb(null, vo);
  };

  classDef.prototype.update = function(id, vo, cb) {
    var flag = true;

    if(id >= 0 && id < db.bookmarks.length) {
      db.bookmarks[id] = vo;
    } else {
      flag = false;
    }

    //return flag;

    cb(null, flag);  
  };

  classDef.prototype.remove = function(id, cb) {
    var flag = true;

      if(id >= 0 && id < db.bookmarks.length) {
        db.bookmarks.splice(id, 1);
      } else {
        flag = false;
      }

      //return flag;

      cb(null, flag); 
  };

  return classDef;

})(db);

//-----------------------------------------------------------

module.exports = BookmarkModel;