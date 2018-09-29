const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const http = require('http');
const path = require('path');
const config = require('./config');
const tokenChecker = require('./server-src/middleware/token-checker');
const models = require('./server-src/models');
const routers = require('./server-src/routers');
const errorBuilder = require('./server-src/modules/error-builder');
const errorHandler = require('./server-src/middleware/error-handler');

const app = express();
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use(express.static('dist'));
app.use('/api', tokenChecker);
app.use('/api', routers);
app.use('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});
// 404 handler
app.use((req, res, next) => {
  next(errorBuilder('Not Found', 404, true));
});
app.use(errorHandler);

models.sequelize.sync()
  .then(http.createServer(app).listen(config.dev.port))
  .then(() => console.log(`Express is running on port ${config.dev.port}`));
