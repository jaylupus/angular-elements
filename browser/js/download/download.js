app.directive('aiDownload', ['DownloadFactory', function(DownloadFactory) {
  return {
    restrict: 'E',
    templateUrl: '/js/download/download.html',
    scope: '=',
    link: function(scope, element) {
      DownloadFactory.getHtml(scope.projId)
        .then(function(htmlfile) {
          var myHtmlFile = new File([htmlfile.data], { type: 'text/html' });
          scope.downloadHtml = function() {
            saveAs(myHtmlFile, 'index.html');
          };
        })
        .then(function() {
          return DownloadFactory.getJs(scope.projId);
        })
        .then(function(jsfile) {
          var myJsFile = new File([jsfile.data], { type: 'application/javascript' });
          scope.downloadJs = function() {
            saveAs(myJsFile, 'script.js');
          };
        });
    }
  };
}]);

app.factory('DownloadFactory', ['$http', function($http) {
  return {
    getJs: function(id) {
      return $http.get('/api/generator/js/' + id);
    },
    getHtml: function(id) {
      return $http.get('/api/generator/html/' + id);
    }
  };
}]);