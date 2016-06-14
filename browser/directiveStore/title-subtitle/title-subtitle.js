app.directive('titleSubtitle',function(){
  return{
    restrict : 'EA',
    scope : {
      aiTitle  : '@',
      aiSubtitle : '@'
    },
    templateUrl :  'directiveStore/title-subtitle/title-subtitle.html',
    link : function(scope,elem,attr){

       },
    }
});