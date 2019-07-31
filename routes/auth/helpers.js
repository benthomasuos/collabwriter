
var exports = module.exports = {};




exports.checkAccess = function(data, user, callback){
    console.log('Checking access rights')
    console.log(data.length)
    console.log(typeof(data))

    if(data.length > 0 ){
        var allowedData = data.filter(d => {
                        var data = isAccessOk(d, user)
                        if(data){
                            return data
                        }

                })
            callback(allowedData)
    }
    else{
        var allowedData = isAccessOk(data, user)
        callback(allowedData)


        }


}

function isAccessOk(item, user){
    //console.log(item)
    switch(item.access_level){
        case "private":
            if( user.roles.includes('admin') || item.created_by == user.firstname + " " + user.surname || item.owned_by == user.firstname + " " + user.surname  ){
                return item
            }
            break;
        case("mapp"):
            if( user.roles.includes('mapp')){
                return item
            }
            break;
        case("public"):
            return item
            break;
        default:
            console.log("Can't access this")
            break;
    }
}

module.export = exports
