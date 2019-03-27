const {Router, Request, Response} = require("express");
//import FindUserService from './../Controller/Services/FindUserService'
const ensureToken = require('../Controller/Helpers/ensureToken');

const router = Router();


const uuid = require('uuid');
const jwt = require('jsonwebtoken');

router.post('/tokens', (req, res)=>{
    const { login, password } = req.body;
    console.log('new router!');
    //const query = FindUserService.findUserFromLogin(login)
    console.log(uuid());
    // FindUserService.findUserFromLogin(login).then( user => {
    //     res.send(user)
    // })
});

router.post('/proto', ensureToken, (req, res)=>{
    jwt.verify(req.token, 'this_is_a_secret', function (err, data) {
        if(err) res.sendStatus(403);
        else{
            res.json({
                msg: 'This is protected',
                data: data
            })
        }
    })
});

router.post('/refresh', (req, res)=>{
    const { login, password } = req.body;

});



module.exports = router;