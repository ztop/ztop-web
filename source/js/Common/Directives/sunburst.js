'use strict';

angular.module('ztop')
  .directive('sunburst', function() {
    return {
      restrict: 'E',
      link: function(scope, elem, attrs) {
        var width = 960,
            height = 700,
            radius = Math.min(width, height) / 2;

        var x = d3.scale.linear()
            .range([0, 2 * Math.PI]);

        var y = d3.scale.sqrt()
            .range([0, radius]);

        var color = d3.scale.category20c();

        var svg = d3.select(elem[0]).append("svg")
            .attr("width", width)
            .attr("height", height)
          .append("g")
            .attr("transform", "translate(" + width / 2 + "," + (height / 2 + 10) + ")");

        var partition = d3.layout.partition()
            .value(function(d) { return d.size; });

        var arc = d3.svg.arc()
            .startAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x))); })
            .endAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x + d.dx))); })
            .innerRadius(function(d) { return Math.max(0, y(d.y)); })
            .outerRadius(function(d) { return Math.max(0, y(d.y + d.dy)); });

        scope.$watch('data', function(data) {
          if (!data) return;

          console.log(data);

          svg.selectAll('*').remove();

          var path = svg.selectAll("path")
              .data(partition.nodes(scope.data))
            .enter().append("path")
              .attr("d", arc)
              .style("fill", function(d) { return color((d.children ? d : d.parent).name); })
              .on("click", click);

          function click(d) {
            path.transition()
              .duration(750)
              .attrTween("d", arcTween(d));
          }

          d3.select(self.frameElement).style("height", height + "px");

          // Interpolate the scales!
          function arcTween(d) {
            var xd = d3.interpolate(x.domain(), [d.x, d.x + d.dx]),
                yd = d3.interpolate(y.domain(), [d.y, 1]),
                yr = d3.interpolate(y.range(), [d.y ? 20 : 0, radius]);
            return function(d, i) {
              return i
                  ? function(t) { return arc(d); }
                  : function(t) { x.domain(xd(t)); y.domain(yd(t)).range(yr(t)); return arc(d); };
            };
          }
        });
      },
      scope: {
        data: '=data'
      }
    };
  });
