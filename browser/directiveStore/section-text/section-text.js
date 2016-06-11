// app.factory('sectionTextDataFactory', function() {
//   return {

//     getText: function(source_location, source_type) {
//       console.log('gettin text');
//       return "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
//     }
//   }
// });



app.directive('sectionText',function(projectDataFactory){
  return{
    restrict : 'EA',
    scope : {
      aiTitle  : '@',
      aiInfoSource : '@',
      aiInfoType : '@',
    },
    templateUrl :  'directiveStore/section-text/section-text.html',
    link : function(scope,elem,attr){

          projectDataFactory.getInternal(attr.aiInfoSource)
              .then(function(data){
                scope.data=data;
              })

          //scope.data=projectDataFactory.getInternal(attr.aiInfoSource);


    }
  };
});