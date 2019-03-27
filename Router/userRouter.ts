import {Router, Request, Response} from "express";
import UserManager from './../Controller/Managers/UserManager'

const router: Router = Router();

const currentUserManager = new UserManager();

router.post('/', (req, res)=>{
    console.log('asd')
});

router.post('/registration', (req, res)=>{
    console.log(req.body.login, req.body.mail, req.body.pass);
    currentUserManager.register(req.body.login, req.body.mail, req.body.pass).then((response) => {
        res.send(response)
    });
});
router.post('/auth', (req, res)=>{
    console.log(req.body.login, req.body.pass);
    currentUserManager.auth(req.body.login, req.body.pass).then((response) => {
        res.send(response)
    });
});

router.post('/login', (req, res)=>{
    const { login, password } = req.body;
    currentUserManager.login(login, password).then((response) => {
        res.send(response)
    })
});


export default router;