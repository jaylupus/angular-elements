
app.directive('soloTable',function(){
  return{
    restrict : 'E',
    scope : {
      dataSource : '@',
      dataType :  '@',
      sectionTitle : '@',
      bsGridConfig : '@'
    },
    templateUrl :  'js/catalog//solo-table/solo-table.html',
    controller : function($scope, soloTableDataFactory){
      $scope.data=soloTableDataFactory.getdata();
    }
  }
});


app.factory('soloTableDataFactory',function(){
  return{
   // this represents the result of opening a csv file turning it into a json array of objects
   // all factory function must bea promise to simplify the code
    getdata :  function(source_location,source_type){
      return [
        {firstname:'first name', lastname:'last name', age : 'age'},
        {firstname:'John', lastname:'Doe', age : '22'},
        {firstname:'Bart', lastname:'Simson', age : '10'},
        {firstname:'Donald', lastname:'Trump', age : 'Dick'}
      ];
    },
    getPiedata :  function(source_location,source_type){
      return [{
              label: "Steve",
              value: 40
            }, {
              label: "Bob",
              value: 60
            }, {
              label: "Jen",
              value: 35
            }, {
              label: "Amy",
              value: 15
            }];
    }
  }
});