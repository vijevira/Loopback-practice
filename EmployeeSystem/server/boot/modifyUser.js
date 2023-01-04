let loopback= require('loopback');
module.exports = function(server) {
    let User= loopback.findModel('User');
    //console.log(Object.keys(usermodel.definition.settings.acls).sort());
    User.definition.settings.acls[0].permission = 'ALLOW';
    User.defineProperty('role', {
        type: 'string', 'required': true
    });
    User.observe('before save',(ctx, next) => {
        User.validatesUniquenessOf('username');
        const loginId = ctx.options.accessToken.__data.userId;
        User.find({where:{id:loginId}},(err, res)=>{
            const role = res[0].role;
            if (role == undefined || role != 'admin'){
                let error = new Error("You are not authorized to add User");
                error.status = 400;
                return next(error);
            }
            let data = ctx.instance || ctx.data;
            console.log('New User added succcesfully : ',data);
            next();
        });
        
    })
}