// Create web server
// Create a web server that listens on port 3000 and serves the following HTML file. The file should be created as a separate HTML file and served by the web server.

// <!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8">
//   <title>Comment Box</title>
// </head>
// <body>
//   <h1>Leave a Comment</h1>
//   <form action="/create-comment" method="POST">
//     <label for="name">Name:</label><br>
//     <input type="text" id="name" name="name"><br>
//     <label for="comment">Comment:</label><br>
//     <textarea id="comment" name="comment"></textarea><br>
//     <button type="submit">Submit</button>
//   </form>
// </body>
// </html>

// The server should respond to POST requests to /create-comment by logging the submitted form data and sending a 302 redirect back to the form's page. The server should respond to GET requests to /create-comment by sending a 404 error.

// Your server should log the submitted form data. For example, if the user submits the form with the name "Alice" and the comment "I love your site!", the server should log the following:

// { name: 'Alice', comment: 'I love your site!' }
// Your server should also log the HTTP method and the request path. For example, if the user submits the form, the server should log the following:

// POST /create-comment
// GET /create-comment

const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/create-comment') {
    res.statusCode = 404;
    res.end();
  } else if (req.method === 'POST' && req.url === '/create-comment') {
    let data = '';

    req.on('data', chunk => {
      data += chunk;
    });

    req.on('end', () => {
      console.log(JSON.parse(data));
      console.log(`${req.method} ${req.url}`);
      res.statusCode = 302;
      res.setHeader('Location', '/create-comment');
      res.end();
    });
  } else {
    res.statusCode = 404;
    res.end();
  }
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});
