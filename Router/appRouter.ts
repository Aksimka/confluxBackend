import {Router, Request, Response} from "express";

const router: Router = Router();

router.get('/', (req, res)=>{
    console.log('App /')
});


export default router;