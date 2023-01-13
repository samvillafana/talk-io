const express = require('express');
const session = require('express-session');
const cors = require("cors");
const exphbs = require('express-handlebars')
const homeRoutes = require('./controllers');


const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;


const handlebars= exphbs.create({})

const sess = {
  secret: process.env.DB_SECRET_SESSION,
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));
app.engine('handlebars',handlebars.engine)
app.set('view engine', "handlebars")
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(homeRoutes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening on port ' + PORT));
});