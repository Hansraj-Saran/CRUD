const express = require('express');
const routes = require('./Routes/routes.js');

const app = express();
// Serve static files
app.use(express.static(__dirname + '/public'));
app.use('/', routes);

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
