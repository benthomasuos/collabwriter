
$(document).ready(function(){
  getAllItems('locations')


})


function getAllItems(type){
    console.log('Getting ' + type)
      $.get('/' + type + '/', function(resp){
            message(resp )
            populateTable(resp.data, type)
      })

}


function getOneItem(type, id){
    console.log('Getting ' + type + " : " + id)
    $.get('/' + type + '/' + id, function(resp){
          message(resp )
    })

}

function createItem(type, id){
    console.log('Creating ' + type)
    $.get('/' + type + '/create', function(resp){
          message(resp )
    })

}

function copyItem(type, id){
    console.log('Copying ' + type + " : " + id)
  $.post( '/' + type + '/copy/' + id, function(resp){
        message(resp )
  })

}


function deleteItem(type, id){
    console.log('Deleting' + type + " : " + id)
  $.post('/' + type + '/delete/' + id, function(resp){
        message(resp )
  })

}


function openModal(type){


}


function populateForm(form,data){


}


function editItem(type, id){
    console.log('Copying ' + type + " : " + id)

}




function populateTable(data, type){
    $('#adminView').html('')
  console.log(data)

  var columns = Object.keys(data[0])
  console.log(columns)

  var table = $("<table class='uk-table uk-table-middle uk-table-divider'></table>")

  var header = $("<thead></thead>").append("<tr></tr>")
  columns.forEach(function(d,i){
      var cell = $('<th class="uk-table-shrink">' + d + '</th>')

      header.append(cell)
  })
  table.append(header)
  var tableBody = $("<tbody></tbody>")
    data.forEach(function(item,i){
        console.log(item)
        var row = $("<tr></tr>")
          columns.forEach(function(d,i){
              var cell = $('<td>' + item[d] + '</td>')
              row.append(cell)
          })
          var edit = $("<td class='uk-link'><i class='fa fa-edit fa-lg'></i></td>")
          edit.on('click', function(){ editItem(item._id)} )
          var copy = $("<td class='uk-link'><i class='fa fa-copy fa-lg'></i></td>")
          copy.on('click', function(){ copyItem(type, item._id)} )
          var del = $("<td class='uk-link'><i class='fa fa-trash fa-lg'></i></td>")
          del.on('click', function(){ deleteItem(type, item._id)} )
          row.append(edit, copy, del)
          tableBody.append(row)




        })
         table.append(tableBody)

         $('#adminView').append(table)

}
