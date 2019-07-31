var firstPwd = $('#password')
var repeatPwd = $('#confirmPassword')


repeatPwd.on('input', checkRepeatPassword)

function checkRepeatPassword(){
    
    if(firstPwd.val() != repeatPwd.val()){
        repeatPwd.addClass('invalid')
        return false
    }
    else {
        repeatPwd.removeClass('invalid')
        return true
    }

}

$('#firstName, #surname').on('input', completeName)


function completeName(){
    var shortname = $('#firstName').val() + $('#surname').val()
    $('#name').val( shortname.toLowerCase() )

}
