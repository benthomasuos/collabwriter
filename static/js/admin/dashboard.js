

$(document).ready(function(){
    colourItems()


})



function colourItems(){
    var items = $('.nav-grid')
    items.each(function(i,d){
        var box = $(this).find('div')
        box.each(function(i,d){
            console.log(i)
            d.style.backgroundColor = d3.interpolateCool((i+1)/box.length)
            d.style.color = '#333'
        })
    })

}
