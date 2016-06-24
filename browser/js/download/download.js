app.directive('aiDownload', ['DownloadFactory', function(DownloadFactory){
	return {
		restrict: 'E',
		templateUrl: '/js/download/download.html',
		scope: {projId: '='},
		link: function(scope, element, attribute){
			DownloadFactory.getHtml(scope.projId)
			.then(function(htmlfile){
				scope.htmlurl = window.URL.createObjectURL(new File([htmlfile.data], 'index', {type: 'text/html'}));
			});
			.then(function(){
				return DownloadFactory.getJs(scope.projId);
			})
			.then(function(jsfile){
				scope.jsurl = window.URL.createObjectURL(new File([jsfile.data], 'app', {type: 'application/javascript'}));
			});
		}
	};
}]);

app.factory('DownloadFactory', ['$http', function($http){
	return {
		getJs: function(id){
			return $http.get('/api/generator/js/' + id);
		},
		getHtml: function(id){
			return $http.get('/api/generator/html/' + id);
		}
	};
}]);