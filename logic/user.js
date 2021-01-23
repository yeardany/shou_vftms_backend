var userController = require('../controllers/user_controller');

module.exports = {

    findUser: (req, res, next, uName, uPassword, aId) => {

        if (uName === '' || uPassword === '' || aId === '')
            res.send('params missing!').end();

        userController.findUser(req, res, next, uName, uPassword, aId).then((r) => {
            console.log(r);
            res.send(r).end();
        }).catch((error) => {
            console.log(error.message)
            res.send(error.message).end()
        });
    },

    insertOneUser: (req, res, next, uName, uPassword, uRole, aId) => {

        if (uName === '' || uPassword === '' || uRole === '' || aId === '')
            res.send('params missing!').end();

        userController.insertOneUser(req, res, next, uName, uPassword, uRole, aId).then((r) => {
            console.log(r);
            res.send(r).end();
        }).catch((error) => {
            console.log(error.message)
            res.send(error.message).end()
        });
    }
}

