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

  var doc = div.selectAll('div')
                .data(docs).enter()
                .append('div')
                .attr('class','uk-card uk-card-default')


      var header = doc.append('div')
                      .attr('class','uk-card-header')

      var title = header.append('div')
                        .attr('class','uk-card-header')
                        .append('div')
                        .attr('class','uk-width-expand')
                        .append('h4')
                        .attr('class','uk-text-meta uk-margin-remove-top')
                        .html(d => d.title)


      var body = doc.append('div')
                    .attr('class','uk-card-body')
                    .html(d => d.author || 'Ben M Thomas')

      var footer = doc.append('div')
                      .attr('class','uk-card-header')
                      .append('a')
                      .attr('href',d => '/docs/' + d._id + '/edit')
                      .html('Edit')


}
