app.directive('userProfile', function() {
  return {
    restrict: 'EA',
    scope: {
      aiHeight: '@',
      aiWidth: '@',
      aiImgUrl: '@',
      round:'@',
      aiName:'@',
      aiTitle:'@',
      aiProfile:'@'
    },
    templateUrl: 'directiveStore/user_profile/user_profile.html',
    link: function(scope, elem, attr) {

      let round=attr.round;

      scope.prof = {};

      scope.prof.image = {
        "height": attr.aiHeight,
        "width": attr.aiWidth,
        "src": attr.aiImgUrl
      };

      if(round){
        scope.prof.image["round"]="border-radius:100%";
      };
    },
  }
});