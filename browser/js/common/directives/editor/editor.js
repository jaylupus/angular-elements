app.controller('FormController', function($scope, EditService) {
  $scope.schema = {
    type: "object"
  };
 
  $scope.form = [
    "*",
    {
      type: "submit",
      title: "Save"
    }
  ];
 
  $scope.model = {};

  $rootScope.on('select', function(args){
  	$scope.schema = args.schema;
  	$scope.model = args.model;
  });

})
.directive('editor', function(){
	return {
		restrict: 'E',
		templateUrl: 'js/common/directives/editor/editor.html'
	};
});