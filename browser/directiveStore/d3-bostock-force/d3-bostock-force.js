"use strict";
app.directive('bostockForceExample', function($window, projectDataFactory) {
      return {
        restrict: 'EA',
        scope: {
          aiTitle: '@',
          aiInfoNodeSource: '@',
          aiInfoEdgeSource: '@',
          aiWidth: '@',
          aiHeight: '@',
          nodeWidth: '@',
          groupField:'@',
          labelField:'@',
          colorSet:'@'
        },
        templateUrl: 'directiveStore/d3-bostock-force/d3-bostock-force.html',
        link: function(scope, elem, attr) {
          const d3 = $window.d3;
          //const Promise = $window.bluebird;
          let width = attr.aiWidth;
          let height = attr.aiHeight;
          let nodeWidth = parseInt(attr.nodeWidth);

          var color = d3.scale.category20(); // abstract this

          if(attr.colorSet==="10") {
            color = d3.scale.category10();
          }


          var force = d3.layout.force()
            .charge(-120)
            .linkDistance(30)
            .size([width, height]);

          var svg = d3.select('#chart-bostock-force-example').append("svg")
            .attr("width", width)
            .attr("height", height);


          Promise.all([projectDataFactory.getInternal(attr.aiInfoNodeSource, 'json'), projectDataFactory.getInternal(attr.aiInfoEdgeSource, 'json')])
            .spread(function(nodeData, edgeData) {
                console.log(nodeData);
                console.log(edgeData);

                var _nodes = nodeData;
                var _links = edgeData;

                force
                  .nodes(_nodes)
                  .links(_links)
                  .start();

                var link = svg.selectAll(".link")
                  .data(_links)
                  .enter().append("line")
                  .attr("class", "link")
                  .style("stroke-width", function(d){
                    console.log(d);
                    return Math.sqrt(d.value);
                  });

                var node = svg.selectAll(".node")
                  .data(_nodes)
                  .enter().append("circle")
                  .attr("class", "node")
                  .attr("r", nodeWidth)
                  .style("fill", function(d) {
                    return color(d.group);
                  }) // abstract group
                  .call(force.drag);

                node.append("title")
                  .text(function(d) {
                    return d.name;
                  }); // abstract this

                force.on("tick", function() {
                    link.attr("x1", function(d) {
                        return d.source.x;
                      })
                      .attr("y1", function(d) {
                        return d.source.y;
                      })
                      .attr("x2", function(d) {
                        return d.target.x;
                      })
                      .attr("y2", function(d) {
                        return d.target.y;
                      });

                    node.attr("cx", function(d) {
                        return d.x;
                      })
                      .attr("cy", function(d) {
                        return d.y;
                      });
                    });
                  }); //end of promise.all
              } // end link
            }; // end return
        });