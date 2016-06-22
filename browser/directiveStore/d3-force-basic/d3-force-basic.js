"use strict";
app.directive('forceBasic', function($window,projectDataFactory){
  return {
    restrict : 'EA',
    scope : {
      aiTitle  : '@',
      aiInfoSource : '@',
      aiWidth:'@',
      aiHeight:'@',
      nodeWidth:'@'

    },
    templateUrl :  'directiveStore/d3-force-basic/d3-force-basic.html',
    link : function(scope,elem,attr){
      const d3 = $window.d3;
      let w = attr.aiWidth;
      let h = attr.aiHeight;
      let nodeWidth= attr.nodeWidth;
      let colors = {
          "lightgray": "#819090",
          "gray": "#708284",
          "mediumgray": "#536870",
          "darkgray": "#475B62",
          "darkblue": "#0A2933",
          "darkerblue": "#042029",
          "paleryellow": "#FCF4DC",
          "paleyellow": "#EAE3CB",
          "yellow": "#A57706",
          "orange": "#BD3613",
          "red": "#D11C24",
          "pink": "#C61C6F",
          "purple": "#595AB7",
          "blue": "#2176C7",
          "green": "#259286",
          "yellowgreen": "#738A05"
        };
        //5764766789ad8a8a23011d7e
    projectDataFactory.getInternal(attr.aiInfoSource,'json')
              .then(function(_data){
                scope.data=_data;
                return _data
        }).then(function(_data){
            console.log(_data)
            let nodes = _data.nodes;
            var links = [];

            for (var i = 0; i < nodes.length; i++) { // split nodes and links...
              if(nodes[i].target !== undefined){
                for (var x=0; x < nodes[i].target.length; x++){
                    links.push({
                      source:nodes[i],
                      target:nodes[nodes[i].target[x]]
                    })
                  }
              }
            }


            var myChart = d3.select('#chart-force-basic')
                .append('svg')
                .attr('width',w)
                .attr('height',h)

            var force = d3.layout.force()
                .nodes(nodes)
                .links([])
                .gravity(0.3)
                .charge(-1000)
                .size([w,h])

            var link = myChart.selectAll('line')
                .data(links).enter().append('line')
                .attr('stroke', colors.gray)

            var node = myChart.selectAll('circle')
                .data(nodes).enter()
                .append('g')
                .call(force.drag)

            node.append('circle')
                .attr('cx', function(d) {return d.x})
                .attr('cy', function(d) {return d.y})
                .attr('r',nodeWidth)
                .attr('fill', function(d,i){
                  if (i>0) { // change color based on level
                    return colors.pink;
                  } else {
                    return colors.blue
                  }
                })

            node.append('text')
                .text((d)=>{console.log(d.name); return d.name})
                .attr('font-family','Roboto Slab')
                .attr('fill', function(d,i){
                  if (i>0) { // change color based on level
                    return colors.mediumgray;
                  } else {
                    return colors.darkblue
                  }
                })
                .attr('font-size',function(d,i){
                  if (i>0) { // change font based on level
                    return '1em';
                  } else {
                    return '1.3em';
                  }
                })

            force.on('tick', function(e){
              node.attr('transform', function(d,i){
                return 'translate('+ d.x +','+d.y +')';
                  })

              link
                .attr('x1',(d)=> {return d.source.x})
                .attr('y1',(d)=> {return d.source.y})
                .attr('x2',(d)=> {return d.target.x})
                .attr('y2',(d)=> {return d.target.y})
            })

            force.start();
        })// end _data promise
   }// end link
  }; // end return
});