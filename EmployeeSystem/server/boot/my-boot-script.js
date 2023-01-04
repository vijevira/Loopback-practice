

module.exports = function(app) {
    var db = app.dataSources.db;
    let User = app.models.User;
    
    const details = {
        name : 'admin',
        username : 'admin',
        email: 'admin@domai.com', 
        password: 'pass123',
        role : 'admin'
    }
    db.connector.autoupdate(User,(err,res)=>{
      console.log("auto db update");
    });
    //UsersDetails.session = details;
    // ds.autoUpdate();
    // UsersDetails.create(details, function(err, userInstance) {
    //   console.log('Admin User Created. Details are : ', userInstance);
    // });
}