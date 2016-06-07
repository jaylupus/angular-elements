app.config(function($stateProvider) {
  $stateProvider.state('project', {
    url: '/project/:id',
    templateUrl: '/js/projects/project.edit.html',
    controller: 'ProjectEditCtrl',
    resolve: {
      project: function(ProjectFactory, $stateParams) {
        return ProjectFactory.getOne($stateParams.id);
      }
    }
  })
});

app.controller('ProjectEditCtrl', function($scope) {

  $scope.schema = {
    'type': 'object',
    'title': 'Solo Table',
    'properties': {
      'class': {
        'title': 'Class',
        'type': 'string'
      },
      'info_source': {
        'title': 'Info Source',
        'type': 'string'
      },
      'info_type': {
        'title': 'Info Type',
        'type': 'string',
        'enum': ['json', 'csv']
      }
    }
  };

  $scope.model = {
    'info_source': 'Jonah'
  };

  $scope.form = [
    "*", {
      type: "submit",
      title: "Save"
    }
  ];

  $scope.project = project;
  $scope.rows = project.config[0].pages.page_1.rows

});

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

    getAllByUser: function(userId) {
      return $http.get('/api/projects/user/' + userId)
        .then(function(projects) {
          console.log(projects);
          angular.copy(projects.data, _projectCache);
          return _projectCache;
        })
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

    delete: function(id) {
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
    },

    getDataSets: function(productId){
      return null;
    }

  };

  return projectObj;
});
