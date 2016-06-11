// app.factory('justatableDataFactory',function($http){
//   return{
//    // this represents the result of opening a csv file turning it into a json array of objects
//    // all factory function must be a promise to standardize the interface
//     getdata :  function(dataSourceLocation,dataSourceType){
//      // alert (dataSourceType);
//       if(dataSourceType === 'file'){
//       // put node fs asyncopen
//         return [
//           {firstname:'first name', lastname:'last name', age : 'age'},
//           {firstname:'John', lastname:'Doe', age : '22'},
//           {firstname:'Bart', lastname:'Simson', age : '10'},
//           {firstname:'Donald', lastname:'Trump', age : 'Dick'}
//         ];
//       }else if(dataSourceType === 'website'){
//           return $http.get(dataSourceLocation);
//       }
//     }
//   };
// });

app.directive('justatable',function(projectDataFactory){
  return{
    restrict : 'EA',
    scope : {
      aiTitle  : '@',
      aiInfoSource : '@',
      aiInfoType : '@',
    },
    templateUrl :  'directiveStore/justatable/justatable.html',
    //controller : function($scope, dataFactory){
    //$scope.data=dataFactory.getdata($scope.sectionLocation,$scope.sectionType);
    //},
    link : function(scope,elem,attr){

          projectDataFactory.getInternal(attr.aiInfoSource,'json')
              .then(function(data){
                console.log(typeof data);
                console.log(data[0]);
                console.log(Object.keys(data[0]))
                //debugger
                scope.data=data;
                scope.headers=Object.keys(data[0])
              })

    }
  };
});