app.factory('projectDataFactory', function() {
  var dataObj = {{dataObj}};

  return {
    getInternal: function(dataId) {
      return new Promise(function(resolve, reject) {
        resolve(JSON.parse(dataObj[dataId]));
      });
    }
  };
});