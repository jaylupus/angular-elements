
app.factory('ProjectFactory', function($http) {
  var projectObj;
  var _projectCache = [];

  projectObj = {
    getAll: function() {
      return $http.get('/api/projects')
        .then(function(projects) {
          console.log(projects);
          angular.copy(projects.data, _projectCache);
          return _projectCache;
        });
    },

    getOne: function(id) {
      return $http.get('/api/projects/' + id)
        .then(function(project) {
          return project.data;
        });
    },

    add: function(project) {
      return $http({
            url: '/api/projects/',
            method: "POST",
            data: project
      })
        .then(function(_project) {
          return _project.data;
        });
    },

    delete: function(id){
      return $http.delete('/api/projects/' + id)
        .then(function(project) {
          return project.data;
        });
    },

    update: function(project) {
      return $http({
            url: '/api/projects/' + project._id,
            method: "PUT",
            data: project
      })
        .then(function(_project) {
          return _project.data;
        });
    }

  };

  return projectObj;
});


