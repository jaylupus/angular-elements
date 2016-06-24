app.directive('titleSubtitle',function(){
  return{
    restrict : 'EA',
    scope : {
      aiTitle  : '@',
      aiSubtitle : '@'
    },
    templateUrl :  'directiveStore/title_subtitle/title_subtitle.html',
    link : function(scope,elem,attr){

       },
    }
});