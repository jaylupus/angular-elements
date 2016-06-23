
app.directive('sectionText',function(){
  return{
    restrict : 'EA',
    scope : {
      aiTitle  : '@',
      aiText : '@'
    },
    templateUrl :  'directiveStore/section-text/section-text.html',
    link : function(scope,elem,attr){

    }
  };
});