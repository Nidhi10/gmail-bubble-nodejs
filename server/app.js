
const express = require("express");
const path = require('path');
const app = express();
// const listLabels = require('./gmail.js');
const PORT = process.env.PORT || 3001;

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

// Handle GET /api req from Server
app.get('/api', function(req,res) {
    res.json({"message": "Hello from Server"});
})


// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  });

app.listen(PORT, () => {
    console.log("server listening on PORT: " + PORT);
})