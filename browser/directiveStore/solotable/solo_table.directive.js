app.directive('soloTable',function(dataFactory){
  return{
    restrict : 'EA',
    scope : {
      aiTitle  : '@',
      aiInfoSource : '@',
      aiInfoType : '@',
    },
    templateUrl :  'directiveStore/solotable/solo_table.html',
    //controller : function($scope, dataFactory){
    //$scope.data=dataFactory.getdata($scope.sectionLocation,$scope.sectionType);
    //},
    link : function(scope,elem,attr){
      // the link function is going to take all data requests and put them in an array of promisses
      //  for(var i=0;i< a.length;i++;){
          //if(a[i].indexOf(sectionLocation)) 
         // scope.aiTitle=attr.aiInfoType
          scope.data=dataFactory.getdata(attr.aiInfoSource,attr.aiInfoType);
          
      //  }
    }
  };
});