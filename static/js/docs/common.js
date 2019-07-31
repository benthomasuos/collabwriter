$(document).ready(function(){


})


function getDocument(query){

    var queryString = $.param(query)

    $.get('/samples?' + queryString, function(resp){
        console.log(resp)
    })


}


function listSamples(samples){


}




function getProcess(process){
    if(process == "fast"){
        $.get('/processing/fast/runs', function(resp){
            console.log(resp)
            listProcess(resp.data)
        })

    }
    if(process == "pbf"){
        $.get('/processing/pbf/builds', function(resp){
            console.log(resp)
            listProcess(resp.data)
        })

    }

}


function getChar(type,samples){


}


function zipProcessSamples(){


}
