const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const errorHandler = require('errorhandler');
const methodOverride = require('method-override');

const app = express();
const publicDir = process.argv[2] || path.join(__dirname, '/public');
const hostname = process.env.HOSTNAME || 'localhost';
const port = parseInt(process.env.PORT, 10) || 4567;

app.get('/', (req, res) => {
  res.sendFile(path.join(publicDir, '/index.html'));
});

app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(express.static(publicDir));
app.use(errorHandler({
  dumpExceptions: true,
  showStack: true,
}));

console.log("Static server showing %s listening at http://%s:%s", publicDir, hostname, port);
app.listen(port, hostname);
