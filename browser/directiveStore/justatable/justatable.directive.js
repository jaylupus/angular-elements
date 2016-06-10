app.factory('justatableDataFactory',function($http){
  return{
   // this represents the result of opening a csv file turning it into a json array of objects
   // all factory function must be a promise to standardize the interface
    getdata :  function(dataSourceLocation,dataSourceType){
     // alert (dataSourceType);
      if(dataSourceType === 'file'){
      // put node fs asyncopen
        return [
          {firstname:'first name', lastname:'last name', age : 'age'},
          {firstname:'John', lastname:'Doe', age : '22'},
          {firstname:'Bart', lastname:'Simson', age : '10'},
          {firstname:'Donald', lastname:'Trump', age : 'Dick'}
        ];
      }else if(dataSourceType === 'website'){
          return $http.get(dataSourceLocation);
      }
    }
  };
});
app.directive('justatable',function(justatableDataFactory){
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
      // the link function is going to take all data requests and put them in an array of promisses
      //  for(var i=0;i< a.length;i++;){
          //if(a[i].indexOf(sectionLocation))
         // scope.aiTitle=attr.aiInfoType
          scope.data=justatableDataFactory.getdata(attr.aiInfoSource,attr.aiInfoType);

      //  }
    }
  };
});