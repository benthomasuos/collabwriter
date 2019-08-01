$(document).ready(function(){
  var docId = document.getElementById('docId').innerHTML
  getDocument(docId)


})

var thisDoc = undefined


function getDocument(id){
  console.log(id)
  $.get('/docs/'+id, resp => {
        thisDoc = resp.data
        renderDoc(thisDoc)
  })


}



function shareLink(){


}
