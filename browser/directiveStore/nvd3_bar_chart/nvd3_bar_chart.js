
app.directive('nvd3BarChart',function($window,projectDataFactory){
  return{
    restrict : 'EA',
    scope : {
      aiTitle  : '@',
      aiInfoSource : '@',
      aiInfoType : '@',
      aiHeight:'@',
      aiWidth:'@',
      yvalue: '@',
      label:'@',
      key:'@'
    },
    templateUrl :  'directiveStore/nvd3_bar_chart/nvd3_bar_chart.html',
    //controller : function($scope, dataFactory){
    //$scope.data=dataFactory.getdata($scope.sectionLocation,$scope.sectionType);
    //},
    link : function(scope,elem,attr){
      const d3 = $window.d3;

      var convertToXY= function(_data,_key,label,field){
              var transformed=[
                {
                  key:_key,
                  values: []
                }
              ];

              _data.forEach(function(row){
                  let newRow= {
                    "x":row[label],
                    "y":row[field]
                  }

                  transformed[0].values.push(newRow);
              })
              return transformed;
          };

        projectDataFactory.getInternal(attr.aiInfoSource,'json')
              .then(function(_data){

                _data=convertToXY(_data,attr.key,attr.label,attr.yvalue);
                console.log(_data);
                scope.data=_data;

                // chart.xAxis.rotateLabels(-45);
              })

          scope.options = {
            chart: {
                type: 'discreteBarChart',
                height: attr.aiHeight,
                width:attr.aiWidth,
                color: d3.scale.category10().range(),
                reducexticks:true,
                showValues: true,
                duration: 350,
                rotateLabels:-45
            }
        };
    }
  };
});