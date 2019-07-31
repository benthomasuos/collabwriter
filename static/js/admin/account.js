var user = {}
var inputs = $("form").find(":input")
$(document).ready(function(){
    popUser()


})

inputs.on('change', function(){
    var name = this.getAttribute('name')
    user[name] = this.value
    $('#updateBtn').prop('disabled', false)
})




function popUser(){
    inputs.each((i,d)=>{
        var name = d.getAttribute('name')
        user[name] = d.value
    })
}


function refreshToken(){
    var token = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 24; i++){
        token += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    $('#apiToken').html(token);
    user.api_token = token
    updateUser()

}


function updateUser(){

    $.ajax({
        url: 'account',
        method: "PUT",
        data: user,
        complete: function(resp){
            message(resp)
            $('#updateBtn').prop('disabled', true)
        }
    })


}
