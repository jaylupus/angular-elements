app.factory('projectDataFactory', function($http) {
  return {
    getInternal: function() {
      return new Promise(function(resolve, reject){
      	resolve(JSON.parse({{data}}));
      });
    }
  };
});