
app.directive('sectionText',function(){
  return{
    restrict : 'EA',
    scope : {
      aiTitle  : '@',
      aiText : '@'
    },
    templateUrl :  'directiveStore/section_text/section_text.html',
    link : function(scope,elem,attr){

    }
  };
});