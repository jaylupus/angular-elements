
app.factory('dataFactory', function() {
  return {

    getPiedata: function(source_location, source_type) {
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

app.directive('barGraph', function($window, dataFactory) {
  return {
    restrict: 'E',
    templateUrl: 'js/catalog/d3-bar-graph-1/bar-graph.html',
    link: function(scope, elem, attrs) {
      var d3 = $window.d3;
      var width = 400;
      var height = 400;
      var radius = 200;
      var colors = d3.scale.category10();

      var piedata = dataFactory.getPiedata();

      var pie = d3.layout.pie()
        .value(function(d) {
          return d.value;
        })

      var arc = d3.svg.arc()
        .outerRadius(radius)

      var myChart = d3.select('#chart').append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', 'translate(' + (width - radius) + ',' + (height - radius) + ')')
        .selectAll('path').data(pie(piedata)) //returns an array of arcs
        .enter().append('g')
        .attr('class', 'slice')

      var slices = d3.selectAll('g.slice')
        .append('path')
        .attr('fill', function(d, i) {
          return colors(i);
        })
        .attr('d', arc) // passing in the arc function

      var text = d3.selectAll('g.slice')
        .append('text')
        .text(function(d, i) {
          //data object..
          return d.data.label;
        })
        .attr('text-anchor', 'middle')
        .attr('fill', 'white')
        .attr('transform', function(d) {
          d.innerRadius = 0;
          d.outerRadius = radius;
          return 'translate(' + arc.centroid(d) + ')'

        })
    }
  }
});