app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller:'HomeControl',
        resolve: {
          projects: function(ProjectFactory){
            return ProjectFactory.getAll();
          }
        }
    });
});

app.controller('HomeControl', function($scope,projects){
  $scope.projects=projects;
});