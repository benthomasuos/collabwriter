$(document).ready(function(){

  getDocuments()



})


function getDocuments(){

  $.get("/docs", resp => {
    console.log(resp)
    var docs = resp.data
    displayDocs(docs)
  })

}

function displayDocs(docs){

  var div = d3.select('#docGallery')

  var doc = div.selectAll('a')
                .data(docs).enter()
                .append('a')
                .attr('href', d => '/docs/' + d._id + '/edit')
                .attr('class','uk-card uk-card-default uk-flex uk-flex-column uk-margin-small uk-padding-small')

            doc.append('div')
                .style('font-weight', '600')
                .html(d => d.title)

            doc.append('div')
                .style('font-size','0.875em')
                .html(d => d.author)


}
