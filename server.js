const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const port = process.env.PORT || 8080;

// Sample data for demonstration
const videos = [
  {
    id: '1',
    title: 'Twin Turbo Supra Build',
    description: 'A quick look at a 1000hp Supra build.'
  },
  {
    id: '2',
    title: 'Fixing P0302 on a Buick Regal',
    description: 'Step-by-step misfire diagnosis and repair.'
  },
  {
    id: '3',
    title: 'Drift Car POV on Track',
    description: 'Ride along in a Nissan S13 drift build.'
  }
];

function serveStaticFile(res, filepath, contentType, statusCode = 200) {
  fs.readFile(filepath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Not found');
    } else {
      res.writeHead(statusCode, { 'Content-Type': contentType });
      res.end(data);
    }
  });
}

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  if (pathname === '/') {
    return serveStaticFile(res, path.join(__dirname, 'public', 'index.html'), 'text/html');
  }
  if (pathname === '/search') {
    return serveStaticFile(res, path.join(__dirname, 'public', 'search.html'), 'text/html');
  }
  if (pathname.startsWith('/static/')) {
    const filePath = path.join(__dirname, 'public', pathname.replace('/static/', ''));
    const ext = path.extname(filePath).toLowerCase();
    const mimeTypes = {
      '.css': 'text/css',
      '.js': 'application/javascript',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.webp': 'image/webp'
    };
    return serveStaticFile(res, filePath, mimeTypes[ext] || 'application/octet-stream');
  }
  // API routes
  if (pathname === '/api/feed') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ videos }));
  }
  if (pathname === '/api/search') {
    const q = parsedUrl.query.q ? parsedUrl.query.q.toLowerCase() : '';
    const results = {
      videos: videos.filter((v) => v.title.toLowerCase().includes(q)),
      forum: [],
      parts: []
    };
    res.writeHead(200, { 'Content-Type': 'application/json' });
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const port = process.env.PORT || 8080;

// Sample data for demonstration
const videos = [
  {
    id: '1',
    title: 'Twin Turbo Supra Build',
    description: 'A quick look at a 1000hp Supra build.'
  },
  {
    id: '2',
    title: 'Fixing P0302 on a Buick Regal',
    description: 'Step-by-step misfire diagnosis and repair.'
  },
  {
    id: '3',
    title: 'Drift Car POV on Track',
    description: 'Ride along in a Nissan S13 drift build.'
  }
];

function serveStaticFile(res, filepath, contentType, statusCode = 200) {
  fs.readFile(filepath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Not found');
    } else {
      res.writeHead(statusCode, { 'Content-Type': contentType });
      res.end(data);
    }
  });
}

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  if (pathname === '/') {
    return serveStaticFile(res, path.join(__dirname, 'public', 'index.html'), 'text/html');
  }
  if (pathname === '/search') {
    return serveStaticFile(res, path.join(__dirname, 'public', 'search.html'), 'text/html');
  }
  if (pathname.startsWith('/static/')) {
    const filePath = path.join(__dirname, 'public', pathname.replace('/static/', ''));
    const ext = path.extname(filePath).toLowerCase();
    const mimeTypes = {
      '.css': 'text/css',
      '.js': 'application/javascript',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.webp': 'image/webp'
    };
    return serveStaticFile(res, filePath, mimeTypes[ext] || 'application/octet-stream');
  }
  // API routes
  if (pathname === '/api/feed') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ videos }));
  }
  if (pathname === '/api/search') {
    const q = parsedUrl.query.q ? parsedUrl.query.q.toLowerCase() : '';
    const results = {
      videos: videos.filter((v) => v.title.toLowerCase().includes(q)),
      forum: [],
      parts: []
    };
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(results));
  }
  if (pathname === '/api/parts') {
    const query = parsedUrl.query;
    const partName = query.q || 'Oil Filter';
    const part = {
      id: 'p1',
      name: partName,
      offers: [
        {
          vendor: 'exampleVendor',
          total_cents: 1999,
          price_cents: 1499,
          shipping_cents: 500,
          affiliate_url: 'https://example.com/buy?part=' + encodeURIComponent(partName)
        }
      ]
    };
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ parts: [part], sort: 'total_cents' }));
  }

  // 404 fallback
  res.writeHead(404);
  res.end('Not found');
});

server.listen(port, () => {
  console.log(`Live site running at http://localhost:${port}`);
});    return res.end(JSON.stringify(results));
  }
  if (pathname === '/api/parts') {
    const query = parsedUrl.query;
    const partName = query.q || 'Oil Filter';
    const part = {
      id: 'p1',
      name: partName,
      offers: [
        {
          vendor: 'exampleVendor',
          total_cents: 1999,
          price_cents: 1499,
          shipping_cents: 500,
          affiliate_url: 'https://example.com/buy?part=' + encodeURIComponent(partName)
        }
      ]
    };
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ parts: [part], sort: 'total_cents' }));
  }

  // 404 fallback
  res.writeHead(404);
  res.end('Not found');
});

server.listen(port, () => {
  console.log(`Live site running at http://localhost:${port}`);
});
