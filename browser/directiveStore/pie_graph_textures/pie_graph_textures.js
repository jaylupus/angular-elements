

app.directive('pieGraphTextures', function($window) {

  return {
    restrict: 'E',
    templateUrl: 'directiveStore/pie_graph_textures/pie_graph_textures.html',
    scope: {
      aiTitle  : '@',
      aiWidth:'@',
      aiHeight:'@',
      aiRadius:'@',
      label1:'@',
      value1:'@',
      label2:'@',
      value2:'@',
      label3:'@',
      value3:'@',
      label4:'@',
      value4:'@',
      label5:'@',
      value5:'@',
      label6:'@',
      value6:'@'

    },
    link: function(scope, elem, attr) {
      var d3 = $window.d3;
      var width = attr.aiWidth || 400;
      var height = attr.aiHeight || 400;
      var radius = attr.aiRadius || 200;
      var colors = attr.colors || d3.scale.category10(); // come back to this!
      var piedata =[];

      for (var i = 1; i < 9; i++) {
        let labelString= "label"+i;
        let valueString = "value"+i;
        if(attr[labelString] && attr[valueString] && attr[labelString]!="undefined" && attr[valueString]!="undefined"){
          let _label=attr[labelString];
          let _value=attr[valueString];
          piedata.push({"label":_label,"value":_value})
        };
      }
      var pie = d3.layout.pie()
        .value(function(d) {
          return d.value;
        })

      var arc = d3.svg.arc()
        .outerRadius(radius)

    //var t = textures.circles();

    var svg = d3.select("#hello")
      .append("svg")
      .attr("width",200)
      .attr("height",200)

    var t = textures.circles()
            .radius(4)
            .fill("transparent")
            .strokeWidth(2);

    svg.call(t);

    svg.append("rect")
        .attr('y',50)
        .attr('x',50)
        .attr('width',50)
        .attr('height',20)
        .style("stroke", "blue")
      .style("fill", t.url());


      var myChart = d3.select('#pie-chart-textures').append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', 'translate(' + (width - radius) + ',' + (height - radius) + ')')
        .selectAll('path').data(pie(piedata)) //returns an array of arcs
        .enter().append('g')
        .attr('class', 'slice')

        myChart.call(t);

      var slices = d3.selectAll('g.slice')
        .append('path')
        // .attr('fill', function(d, i) {
        //   let c=colors(i)
        //   console.log(c);
        //   return t.stroke(c);
        // })
        .style('stroke', function(d,i){
          return colors(i);
        })
        .style("fill", t.url())

        .attr('d', arc) // passing in the arc function

      var text = d3.selectAll('g.slice')
        .append('text')
        .text(function(d, i) {
          //data object..
          return d.data.label;
        })
        .attr('text-anchor', 'middle')
        .attr('fill', 'black')
        .attr('transform', function(d) {
          d.innerRadius = 0;
          d.outerRadius = radius;
          return 'translate(' + arc.centroid(d) + ')'

        })
    }
  }
});