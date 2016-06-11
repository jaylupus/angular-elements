
app.factory('projectDataFactory', function($http) {
  return {

    getInternal: function(dataId,type) {
      console.log('gettin', dataId);
      return $http.get('/api/data/' + dataId)
        .then(function(dataObject) {
          if(type==='json'){
            return JSON.parse(dataObject.data.data);
          } else if (type==='text'){
            return dataObject.data.data
          }

        });
    }
  }
});