
app.factory('projectDataFactory', function($http) {
  return {

    getInternal: function(dataId) {
      console.log('gettin', dataId);
      return $http.get('/api/data/' + dataId)
        .then(function(dataObject) {
          console.log(dataObject)
          return dataObject.data.data;
        });
    }
  }
});