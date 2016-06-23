"use strict";
app.directive('d3ForceImages', function($window, projectDataFactory) {
      return {
        restrict: 'EA',
        scope: {
          aiTitle: '@',
          aiInfoNodeSource: '@',
          aiInfoEdgeSource: '@',
          aiWidth: '@',
          aiHeight: '@',
          labels:'@',
          nodeImage: '@',
          bcolor:'@',
        },
        templateUrl: 'directiveStore/d3-force-images/d3-force-images.html',
        link: function(scope, elem, attr) {
          const d3 = $window.d3;
          //const Promise = $window.bluebird;
          let width = attr.aiWidth;
          let height = attr.aiHeight;
          let nodeWidth = parseInt(attr.nodeWidth);
          let showLabels = attr.labels;
          var nodeImage = attr.nodeImage;
          let bcolor=attr.bcolor;

          console.log(nodeImage);

          var force = d3.layout.force()
            .charge(-500)
            .linkDistance(30)
            .size([width, height]);

          var svg = d3.select('#chart-force-image').append("svg")
            .attr("width", width)
            .attr("height", height)
            .style("background",bcolor);

          Promise.all([projectDataFactory.getInternal(attr.aiInfoNodeSource, 'json'), projectDataFactory.getInternal(attr.aiInfoEdgeSource, 'json')])
            .spread(function(nodeData, edgeData) {
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
                    return Math.sqrt(d.value);
                  });

               var node = svg.selectAll(".node")
                    .data(_nodes)
                    .enter().append("g")
                    .attr("class", "node")
                    .call(force.drag);

                 node.append("title")
                      .text(function(d) {
                        return d.name;
                      }); // abstract this

              // node.append('text')
              //     .text(function(d) { return d.name })
              //      .attr('fill','#D11C24')
                   // .attr("dx", 12)
                  // .attr("dy", ".35em")


              node.append("image")
                  .attr("xlink:href", function(d){
                    console.log(d);
                    console.log(d.source);
                    // return String(nodeImage);
                    return String(d.image);
                  })
                  .attr("x", -8)
                  .attr("y", -8)
                  .attr("width", 25)
                  .attr("height", 25);

                force.on("tick", function() {
                      link.attr("x1", function(d) { return d.source.x; })
                          .attr("y1", function(d) { return d.source.y; })
                          .attr("x2", function(d) { return d.target.x; })
                          .attr("y2", function(d) { return d.target.y; });

                      node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
                    });
                  }); //end of promise.all
              } // end link
            }; // end return
        });