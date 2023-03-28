const http = require('http'); // http module 
const app = require('./app');

const port = process.env.PORT || 3000;
const server = http.createServer(app);

server.listen(port, () => {
  console.log('server started at port ' + port);
});
 