


function logIn(){
        var data = {
            username: $('#username').val(),
            password: $('#password').val()
        }

        $.ajax({
          url: '/auth/login',
          method: "POST",
          data: data,
          success: function(resp){
            message(resp)
            setTimeout(function(){
              console.log('Now taking you to ' + resp.redirect)
              window.location.replace(resp.redirect)
          }, 1000)


        },
        error: function(resp){
          message(resp)
        }

      })



}
