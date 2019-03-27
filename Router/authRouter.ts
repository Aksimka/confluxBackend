import {Router, Request, Response} from "express";
import FindUserService from './../Controller/Services/FindUserService'
import ensureToken from './../Controller/Helpers/ensureToken'

const router: Router = Router();


const uuid = require("uuid");
const jwt = require("jsonwebtoken");

router.post('/tokens', (req, res)=>{
    const { login, password } = req.body;
    console.log(req.body.login, req.body.password);
    //const query = FindUserService.findUserFromLogin(login)
    FindUserService.findUserFromLogin(login).then( user => {
        jwt.sign({ user }, 'this_is_a_secret', (err, token)=> {
            res.json({
                access_token: token,
                expiresIn: new Date().getTime() + 3600,
                refresh_token: uuid()
            })
        })
    })
});

// router.post('/proto', ensureToken, (req, res)=>{
//     jwt.verify(req.token, 'this_is_a_secret', function (err, data) {
//         if(err) res.sendStatus(403);
//         else{
//             res.json({
//                 msg: 'This is protected',
//                 data: data
//             })
//         }
//     })
// });

router.post('/refresh', (req, res)=>{
    const { login, password } = req.body;

});



export default router;