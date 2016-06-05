app.controller('FormController', function($rootScope, $scope, EditService) {
  $scope.schema = EditService.getSchema('soloTable');
 
  $scope.form = [
    "*",
    {
      type: "submit",
      title: "Save"
    }
  ];
 
  $scope.model = {};

  $rootScope.$on('select', function(args){
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