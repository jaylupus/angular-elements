app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller:'HomeControl',
        resolve: {
          projects: function(ProjectFactory,$stateParams){
            if($stateParams.id){

              return ProjectFactory.getOne($stateParams.id);
            }
            return null;
          },
          // user: function(AuthService){
          //   return AuthService.getLoggedInUser();
          // }
        }
    });
});

app.controller('HomeControl', function($scope,projects,$rootScope,AuthService,AUTH_EVENTS,$stateParams,ProjectFactory,$state){
  $scope.projects=projects;
  $scope.hello=$stateParams.id;

  $scope.isLoggedIn = function () {
                return AuthService.isAuthenticated();
            };

  var getUser = function () {
                AuthService.getLoggedInUser().then(function (user) {
                    $scope.user = user;
                    return user
                }).then(getProjects);
            };
  var getProjects = function (user) {

              if(user){
                ProjectFactory.getAllByUser($scope.user._id)
                    .then(function(projects){
                      $scope.projects=projects;
                    })
              }
            };

  $scope.addProject = function(){
    let _user= null;

    if(AuthService.isAuthenticated()){
      _user=$scope.user;
    }

    return ProjectFactory.add({
        name:$scope.projectName,
        user:_user
      }).then(function(newProject){
        $state.go('project',{id:newProject._id});
      })
  };
  getUser();
});