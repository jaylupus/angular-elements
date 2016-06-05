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

app.controller('HomeControl', function($scope,projects,$rootScope,AuthService,AUTH_EVENTS,$stateParams,ProjectFactory){
  $scope.projects=projects;
  $scope.hello=$stateParams.id;

  $scope.isLoggedIn = function () {
                return AuthService.isAuthenticated();
            };

  var getUser = function () {
                AuthService.getLoggedInUser().then(function (user) {
                    $scope.user = user;
                }).then(getProjects);
            };
  var getProjects = function () {
                ProjectFactory.getAllByUser($scope.user._id)
                    .then(function(projects){
                      $scope.projects=projects;
                    })
            };

  getUser();

  // $rootScope.$on(AUTH_EVENTS.loginSuccess, setUser);
  // $rootScope.$on(AUTH_EVENTS.logoutSuccess, removeUser);
  // $rootScope.$on(AUTH_EVENTS.sessionTimeout, removeUser);

});