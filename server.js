const http = require('http'),
  fs = require('fs'),
  path = require('path'),
  HEADERS = {
    'Content-Type': 'text/html',
    'Cross-Origin-Opener-Policy': 'same-origin',
    'Cross-Origin-Resource-Policy': 'cross-origin',
    'Cross-Origin-Embedder-Policy': 'require-corp',
    'Origin-Agent-Cluster': '?1',
  },
  HTML_COMMON = `
    <script>setInterval(() => window.parent.postMessage({ type: 'ping', url: window.location.toString() }, '*'), 2000)</script>
    <style>body { margin: 0; width: 450px; height: 800px; }</style>
  `

function runServer(name, port) {
  http.createServer((req, res) => {
    console.log(name, req.url)
    fs.readFile(
      path.join(__dirname, req.url === '/' ? '/index.html' : req.url),
      (err, data) => {
        err
          ? res.writeHead(500)
            .end(`Error loading ${name}: ${err}`)
          : res.writeHead(200, HEADERS)
            .end(data + (name === 'sub' && req.url.endsWith('.html') ? HTML_COMMON : ''))
      })
  }).listen(port, () => console.log(`${name} server running at http://localhost:${port}`))
}

runServer('main', 3000)
runServer('sub', 4000)
