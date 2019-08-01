$(document).ready(function(){

})


var renderDiv = d3.select('#renderBox')
var body = ""
var titleBox = d3.select("#titleEditor")
var bodyBox = d3.select("#bodyEditor")

var converter = new showdown.Converter();


function renderDoc(){
  renderDiv.html('')
  renderTitle()
  renderBody()
}


function renderTitle(){

    renderDiv.append('h1')
            .html(thisDoc.title)
}


function renderBody(){
  var html = renderDiv.html()
  var body = converter.makeHtml(thisDoc.body)
  renderDiv.html(html + body)

}




function extractReferences(){



}


function extractFigures(){



}
