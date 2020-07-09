const express = require("express")
const session = require("express-session")
const mongo_session = require("connect-mongodb-session")
const createError = require("http-errors")
const logger = require('morgan')
const mongoose = require("mongoose")
const path = require("path")

// Import middleware
const { user_middleware } = require("./middleware/user")
const { messages_middleware } = require("./middleware/messages")


// Import routers
const index = require("./routers/index")
const authRouter = require("./routers/auth")


// Constants
const DEBUG = !(process.env.NODE_ENV == "production")
const MONGO_URI = "mongodb://mongo:mongo@localhost:27017"
// Todo: Move postgres uri in app file if possible
// const POSTGRES_URI = "postgres://tester:postgres@localhost:5432/develop"

const app = express()
const MongoStore = mongo_session(session)
const session_store = MongoStore({
    uri: MONGO_URI,
    databaseName: DEBUG ? "develop" : process.env.SESSION_DB || process.exit(1),
    collecttion: "sessions",
})


// Settings
app.set("view engine", "pug")
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, 'public')));

session_store.on("error", err => {
    console.error("Session store error!")
    process.exit(1)
})


// Middleware
//* logger
app.use(logger("dev"))
//* bodyParser
app.use(express.urlencoded({ extended: false }));
//* sessions
app.use(session({
    secret: DEBUG ? "keyboardcat" : process.env.SESSION_SECRET || process.exit(2),
    store: session_store,
    resave: false,
    saveUninitialized: false
}))

// Custom
app.use(user_middleware)
app.use(messages_middleware)


// Routing
app.use(index)
app.use(authRouter)


// Errors handling
//* catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

//* error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('global/error');
});


//* databases
const { pg } = require("./util/postgres")


const auth_launch = async () => {
    try {
        await pg.sync({ logging: false, force: false, alter: false })
        await mongoose.connect(
            MONGO_URI,
            { useNewUrlParser: true, useUnifiedTopology: true }
        )
        app.listen(8000)
    } catch {
        console.error("Database authentication failed!")
        process.exit(1)
    }
}
auth_launch()

module.exports.DEBUG = DEBUG
module.exports.MONGO_URI = MONGO_URI
