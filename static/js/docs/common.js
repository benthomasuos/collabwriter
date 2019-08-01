function status(msg, c){
  var t = d3.transition()
    .duration(750)
    .ease(d3.easeLinear);

  d3.select('#status').html(msg)
    .style('opacity', 1)
    .style('color',c)
    .transition(t)
    .delay(2000)
    .style('opacity', 0)
}
