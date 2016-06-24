app.directive('aiSocial',function(){
  return{
    restrict : 'EA',
    scope : {
      aiHeader  : '@',
      aiText : '@',
      aiFacebook:'@',
      aiTwitter:'@',
      aiInsta:'@',
      aiGithub:'@'
    },
    templateUrl :  'directiveStore/ai_social/ai_social.html',
    link : function(scope,elem,attr){
            scope.links={};

            scope.links = {
              "facebook":attr.aiFacebook,
              "twitter":attr.aiTwitter,
              "instagram":attr.aiInsta,
              "github":attr.aiGithub
            };
       },
    }
});