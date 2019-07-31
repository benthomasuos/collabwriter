$(document).ready(function(){

})


var renderDiv = d3.select('#renderBox')
var body = ""
var titleBox = d3.select("#titleEditor")
var bodyBox = d3.select("#bodyEditor")


function renderDoc(){
  renderDiv.html('')
  renderTitle()
  renderBody()
}


function renderTitle(){
    renderDiv.append('h1')
            .attr('class','render_h1')
            .html(thisDoc.title)
}


function renderBody(){

  renderDiv.append('div')
          .attr('class','render_body')
          .html(thisDoc.body)


}




function extractReferences(){



}


function extractFigures(){



}
