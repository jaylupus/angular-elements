
app.directive('nvd3ScatterChart',function(projectDataFactory){
  return{
    restrict : 'EA',
    scope : {
      aiTitle  : '@',
      aiInfoSource : '@',
      aiInfoType : '@',
      xvalue: '@',
      yvalue:'@',
      size:'@',
      label:'@'
    },
    templateUrl :  'directiveStore/nvd3-scatter-chart/nvd3-scatter-chart.html',
    //controller : function($scope, dataFactory){
    //$scope.data=dataFactory.getdata($scope.sectionLocation,$scope.sectionType);
    //},
    link : function(scope,elem,attr){

          var convertToXY= function(_data,x_value,y_value,size,group_field){
              var transformed=[];
              var unique_groups=[];

              _data.forEach(function(row){
                  let newRow= {
                    "x":row[x_value],
                    "y":row[y_value],
                    "size":row[size]
                  }
                  let groupIndex=unique_groups.indexOf(row[group_field]);

                  if( groupIndex ===-1 ){
                    unique_groups.push(row[group_field]);
                    transformed.push(
                    {
                      "key":row[group_field],
                      "values":[newRow]
                    })
                  } else if (groupIndex > -1) {
                    transformed[groupIndex].values.push(newRow)
                  }
              })
              return transformed;
          };

        projectDataFactory.getInternal(attr.aiInfoSource,'json')
              .then(function(data){
                scope.data=convertToXY(data,attr.xvalue,attr.yvalue,attr.size,attr.label);
              })

          scope.options = {
            chart: {
                type: 'scatterChart',
                height: 450,
                color: d3.scale.category10().range(),
                scatter: {
                    onlyCircles: true
                },
                showDistX: true,
                showDistY: true,
                tooltipContent: function(key) {
                    return '<h3>' + key + '</h3>';
                },
                duration: 350,
                xAxis: {
                    axisLabel: attr.xvalue,
                    tickFormat: function(d){
                        return d3.format('.02f')(d);
                    }
                },
                yAxis: {
                    axisLabel: attr.yvalue,
                    tickFormat: function(d){
                        return d3.format('.02f')(d);
                    },
                    axisLabelDistance: -5
                },
                zoom: {
                    //NOTE: All attributes below are optional
                    enabled: false,
                    scaleExtent: [1, 10],
                    useFixedDomain: false,
                    useNiceScale: false,
                    horizontalOff: false,
                    verticalOff: false,
                    unzoomEventType: 'dblclick.zoom'
                }
            }
        };
    }
  };
});