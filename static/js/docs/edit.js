$(document).ready(function(){
  initEditor()

  var docId = document.getElementById('docId').innerHTML
  getDocument(docId)


})

var thisDoc = undefined
var saveTimer = null


function getDocument(id){
  console.log(id)
  $.get('/docs/'+id, resp => {
        thisDoc = resp.data
        populateDocument(thisDoc)
        renderDoc(thisDoc)
  })


}





function initEditor(){

    titleBox = d3.select('#titleEditor')
                 .append('textarea')

     titleBox.on('input', function(){
         clearTimeout(saveTimer)
         thisDoc.title = d3.select(this).property('value')
         renderDoc()
         initSave()

     })


  bodyBox = d3.select('#bodyEditor')
              .append('textarea')

  bodyBox.on('input', function(){
      clearTimeout(saveTimer)
      thisDoc.body = d3.select(this).property('value')
      renderDoc()
      initSave()
  })

}



function populateDocument(doc){
    titleBox.property('value',doc.title)
    bodyBox.property('value',doc.body)

}


function initSave(){
  saveTimer = setTimeout(function(){
      saveDoc()
  },3000)

}

function saveDoc(){
  status('Saving document','black')
  console.log(thisDoc)

  $.ajax({
    url: '/docs/' + thisDoc._id,
    method: 'PUT',
    contentType: "application/json",
    processData: false,
    data: JSON.stringify(thisDoc),
    success: function(){
      status('Saved document successfully.', 'green')
      console.log('Save Completed')
    },
    error: function (){console.log('Save Error')}
  })

}
