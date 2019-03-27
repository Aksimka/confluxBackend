import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import * as mongoose from 'mongoose';


import {Router, Request, Response} from "express";
const router: Router = Router();

import UserRouter from './Router/userRouter'
import AuthRouter from './Router/authRouter'
import AppRouter from './Router/appRouter'

mongoose.set('useCreateIndex', true);

mongoose.connect('mongodb://localhost/conflux', { useNewUrlParser: true}).then((res)=>{
    console.log('Connection is successful');
}).catch((e) => {
    throw new Error(e);
});

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use('/', AppRouter);
app.use('/auth', AuthRouter);
app.use('/user', UserRouter);


app.listen(3000, ()=> {
    console.log('App listening on 3000 port!');
});
