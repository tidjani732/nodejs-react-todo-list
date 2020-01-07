require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const csrf = require('csurf');
const flash = require('connect-flash');

const webRoutes = require('./routes/webRoutes');
const apiRoutes = require('./routes/apiRoutes');
const logger = require('./util/logger')


const app = express();
const port = process.env.S_PORT;
const MONGO_URL = process.env.MONGO_URL;

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

app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const store = new MongoDBStore({
    uri: MONGO_URL,
    collection: 'sessions'
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

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
    logger.error(errors);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});

mongoose
    .connect(MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        app.listen(port, () => {
            logger.info(`Server running at ${port} (-_-)!`);
        })
    })
