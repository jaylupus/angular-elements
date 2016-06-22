app.directive('aiBlockquote',function(){
  return{
    restrict : 'EA',
    scope : {
      aiQuote  : '@',
      aiPerson : '@'
    },
    templateUrl :  'directiveStore/ai_blockquote/ai_blockquote.html',
    link : function(scope,elem,attr){

       },
    }
});