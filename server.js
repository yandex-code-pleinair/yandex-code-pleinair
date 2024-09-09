const http = require('http'),
  fs = require('fs'),
  path = require('path'),
  HEADERS = {
    'Content-Type': 'text/html',
    'Cross-Origin-Opener-Policy': 'same-origin',
    'Cross-Origin-Resource-Policy': 'cross-origin',
    'Cross-Origin-Embedder-Policy': 'require-corp',
    'Origin-Agent-Cluster': '?1',
  }

function runServer(name, port) {
  http.createServer((req, res) => {
    console.log(name, req.url)
    fs.readFile(path.join(__dirname, req.url), (err, data) => {
      err
        ? res.writeHead(500).end(`Error loading ${name}: ${err}`)
        : res.writeHead(200, HEADERS).end(data)
    })
  }).listen(port, () => console.log(`${name} server running at http://localhost:3000`))
}

runServer('main', 3000)
runServer('subpage', 4000)
