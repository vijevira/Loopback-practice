'use strict';
const { AccessToken } = require('loopback');
let loopback = require('loopback');
module.exports = function (Recommendations) {
    const User = loopback.findModel('User');
    Recommendations.observe('before save', function (ctx, next) {
        if (ctx.options.accessToken) {
            const loginId = ctx.options.accessToken.__data.userId;
            User.find({ where: { id: loginId } }, (err, res) => {
                const role = res[0].role;
                const username = res[0].username;
                let data = ctx.data || ctx.instance;
                if (role == undefined || (role != 'admin' && role != 'M')) {
                    let error = new Error("You are not authorized to add recommendations!");
                    error.status = 400;
                    return next(error);
                }
                if (role == 'M' && username != data.assignedby) {
                    let error = new Error("You cannot assign on behalf of different users!");
                    error.status = 400;
                    return next(error);
                }
                console.log('Recommendation added succesfully : ', data)
                next();
            });
        }
        else {
            next();
        }

    });

    Recommendations.beforeRemote('find', (ctx, unused, next) => {
        const loginId = ctx.req.accessToken.__data.userId;
        User.find({ where: { id: loginId } }, (err, res) => {
            const role = res[0].role;
            const username = res[0].username;
            if (role == 'undefined') {
                let error = new Error("You are not authorized to see recommendations!");
                error.status = 400;
                return next(error);
            }
            if (role == 'admin') {
                Recommendations.find((err, res) => {
                    next();
                });

            } else if (role == 'M') {
                Recommendations.find({ where: { assignedby: username } }, (err, res) => {
                    ctx.res.send(res);
                    //next();
                });
            } else {
                Recommendations.find({ where: { assignedto: username } }, (err, res) => {
                    ctx.res.send(res);

                });
            }

        });
    });

    Recommendations.markAsRead = function (id, cb) {
        let response = { "result": "updated successfully" };
        cb(null, response);
    }
    Recommendations.remoteMethod('markAsRead', {
        accepts: { arg: 'id', type: 'string' },
        returns: { arg: 'message', type: 'string' }
    })

    Recommendations.beforeRemote('markAsRead', (ctx, unused, next) => {
        const loginId = ctx.req.accessToken.__data.userId;
        let username;
        User.find({ where: { id: loginId } }, (err, res) => {
            username = res[0].username;
        });
        Recommendations.find({ where: { id: id } }, (err, res) => {
            const assignedto = res[0].assignedto;
            const role = res[0].role;
            if (role == undefined || role != 'U' || username != assignedto) {
                let error = new Error("This recommendation is not assigned to you!");
                error.status = 400;
                return next(error);
            }
            Recommendations.upsertWithWhere({ id: id }, { status: true }, (err, res) => {
                console.log(res);
            });
        });
    });

};
