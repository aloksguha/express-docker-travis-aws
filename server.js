let express = require('express');
let bodyParser = require('body-parser');
let app = express();

let users = require('./modules/users');
let apps = require('./modules/apps');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.text());
app.use(bodyParser.json({
  type: 'application/json'
}));

app.use('/healthcheck', require('express-healthcheck')({
  healthy: function() {
    return {
      everything: 'is ok'
    };
  },
  unhealthy: function() {
    return {
      something: 'is not ok.'
    };
  }
}));

const port = 3000;


app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to my user application.'
  });
});

app.route('/users')
  .get(users.getUsers)
  .post(users.addUser);


app.route('/users/:id')
  .get(users.getUser)
  .put(users.updateUser)
  .delete(users.deleteUser);

app.route('/users/:userId/apps')
  .get(apps.getApps)
  .post(apps.createApp);

app.route('/users/:userId/apps/:appId')
  .delete(apps.removeApp);

app.listen(port, (success) => {
  console.log('express server started at : ' + port);
});

module.exports = app;
