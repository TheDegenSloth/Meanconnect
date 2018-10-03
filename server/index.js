const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const uuidv4 = require('uuid/v4');
const sc2 = require('steemconnect');
const scope = ['login', 'vote', 'comment', 'delete_comment', 'comment_options', 'custom_json', 'claim_reward_balance'];

const steem = new sc2.Initialize({
    app: 'development.app', // replace this with the name of your app
    callbackURL: 'http://localhost:4200', // Url just for testing
    accessToken: '',
    scope: scope,
});

app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/meanconnect', { useNewUrlParser: true });

const Schema = mongoose.Schema;

const UserModel = new Schema({
    admin: Boolean,
    firstlogindate: Date,
    image: String,
    ip: String,
    lastlogindate: Date,
    session: String,
    userlevel: Number,
    username: {
        unique: true,
        type: String
    },
});

const User = mongoose.model('UserModel', UserModel);

const apiRoutes = express.Router();
let reqUser;

function auth(token, callback) {
    steem.setAccessToken(token);
    steem.me((err, res) => {
        callback(err, res);
    });
}

// route middleware to verify a token
apiRoutes.use(function (req, res, next) {
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    if (token) {
        // verifies secret and checks exp
        auth(token, (err, res) => {
            if (err) {
                return res.status(401).send({
                    success: false,
                    message: 'Failed to authenticate token.'
                });
            } else {
                reqErr = undefined;
                reqUser = undefined;
                User.findOne({ username: res.user }, function (e, user) {
                    reqErr = e;
                    reqUser = user;
                    next();
                });
            }
        });
    } else {
        // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
});

app.use('/api', apiRoutes);

app.listen(3000, function () {
    console.log('App listening on port 3000!')
});

//Verify users logged in
app.get('/api/verify', function (req, res) {
    console.log('get /api/verify');
    return res.status(200).send(reqUser || {});
}, () => {
    return res.status(401).send({
        success: false,
        message: 'Failed to authenticate token.'
    });
});

app.get('/api/users', function (req, res) {
    console.log('get /api/users');
    if (reqUser.admin) {
        User.find({}, function (err, result) {
            if (err) throw err;
            res.status(200).send(result);
        });
    } else {
        res.status(403).send({ message: 'Forbidden' });
    }
});

//logging in after already been signed in
app.post('/api/relogin', function (req, res) {
    console.log('post /api/relogin', req.body);
    if (reqUser.admin) {
        User.findOne({
            username: req.body.username,
            session: req.body.session,
        }, function (err, user) {
            if (!user) {
                res.status(403).send({ message: 'Wrong credential' });
            } else {
                user.lastlogindate = new Date();
                user.session = uuidv4();
                user.save(function (err, result) {
                    if (!err) {
                        console.log('Saved', result);
                        res.status(200).send(result);
                    } else {
                        res.status(500).send(err);
                    }
                })
            }
        });
    } else {
        req.status(403).send({ message: 'Forbidden' });
    }
});


//Adding users via the admin page
app.post('/api/users', function (req, res) {
    console.log('post /api/users', req.body);
    User.findOne({
        username: req.body.username,
    }, function (err, user) {
        if (!user) {
            var user = new User(req.body);
            user.firstlogindate = new Date();
            user.lastlogindate = new Date();
            user.ip = req.connection.remoteAddress;
            user.session = uuidv4();
            console.log('Adding', user);
            user.save(function (err, result) {
                if (!err) {
                    console.log('Added', result);
                    res.status(200).send(result);
                } else {
                    res.status(500).send(err);
                }
            });
        } else {
            user.lastlogindate = new Date();
            if (req.body.image) {
                user.image = req.body.image;
            }
            user.image = req.body.image;
            user.session = uuidv4();
            user.save(function (err, result) {
                if (!err) {
                    console.log('Saved', result);
                    res.status(200).send(result);
                } else {
                    res.status(500).send(err);
                }
            })
        }
    });
});

//list of users to read out on the admin page
app.put('/api/users', function (req, res) {
    console.log('post /api/users', req.body);
    User.findOne({
        username: req.body.username,
    }, function (err, user) {
        if (user) {
            user.lastlogindate = new Date();
            user.admin = req.body.admin;
            user.ip = req.connection.remoteAddress;
            user.userlevel = req.body.userlevel;
            user.save(function (err, result) {
                if (!err) {
                    console.log('Saved', result);
                    res.status(200).send(result);
                } else {
                    res.status(500).send(err);
                }
            })
        }
    });
});
