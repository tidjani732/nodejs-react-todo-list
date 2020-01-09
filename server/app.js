require('dotenv').config();
import express from 'express';
import http from "http";
import { connect } from 'mongoose';
import cors from 'cors';
import { json, urlencoded } from 'body-parser';
import { join } from 'path';
import session from 'express-session';
const MongoDBStore = require('connect-mongodb-session')(session);
import swaggerJSDoc from 'swagger-jsdoc';
import { serve, setup } from 'swagger-ui-express';

import csrf from 'csurf';
import flash from 'connect-flash';

import webRoutes from './routes/webRoutes';
import apiRoutes from './routes/apiRoutes';
import logger from './util/logger';
import { getNum, socketInit } from "./util/socket";


const app = express();
const port = process.env.S_PORT;
const MONGO_URL = process.env.MONGO_URL;

const server = http.createServer(app);
const io = socketInit(server);

io.on('connection', (socks) => {
    logger.info('New connection');


    socks.on('disconnect', () => {
        logger.info('We just loosed a User..');
    });
});

const options = {
    swaggerDefinition: {
        OpenAPI: '2.0',
        info: {
            title: 'Todo Api',
            version: '1.0.0',
        },
    },
    apis: ['./routes/apiRoutes.js'],
};

const swaggerSpec = swaggerJSDoc(options);

app.use('/api-doc', serve, setup(swaggerSpec));

const store = new MongoDBStore({
    uri: MONGO_URL,
    collection: 'sessions'
});

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(express.static(join(__dirname, 'public')));

app.use('/api', apiRoutes);

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(
    session({
        secret: process.env.SAM_SECRET,
        resave: false,
        saveUninitialized: false,
        store: store
    })
);

const csrfProtection = csrf();
app.use(csrfProtection);
app.use(flash());

app.use((req, res, next) => {
    res.locals.logged = req.session.logged;
    res.locals.csrfToken = req.csrfToken();
    next();
});


app.use(webRoutes);

app.use((error, req, res, next) => {
    logger.error(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});

connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    server.listen(port, () => {
        logger.info(`Server running at ${port} (-_-)! ${getNum()}`);
    })
})
