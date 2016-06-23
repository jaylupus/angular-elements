app.directive('aiDownload', ['DownloadFactory', function(DownloadFactory){
	return {
		restrict: 'E',
		templateUrl: '/js/download/download.html',
		scope: {
			manifest: '=allManifests'
		},
		link: function(scope, element, attribute){
			DownloadFactory.getHtml(scope.manifest)
			.then(function(htmlfile){
				scope.htmlurl = window.URL.createObjectURL(new File([htmlfile.data], 'index', {type: 'text/html'}));
			})
			.then(function(){
				return DownloadFactory.getJs(scope.manifest);
			})
			.then(function(jsfile){
				scope.jsurl = window.URL.createObjectURL(new File([jsfile.data], 'app', {type: 'application/javascript'}));
			});
		}
	};
}]);

app.factory('DownloadFactory', ['$http', function($http){
	return {
		getJs: function(manifestObj){
			return $http.post('/api/generator/js', {name: 'dummy_fac'});
		},
		getHtml: function(manifestObj){
			return $http.post('/api/generator/html', {name: ['vert-flare']});
		}
	};
}]);