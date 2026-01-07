const express = require('express');
const app = express();
const port = process.env.PORT || 6100;
const path = require('path');
const os = require('os');
const ejs = require('ejs');
const cors = require('cors');
ejs.delimiter = '?';

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'src', 'public')));

app.listen(port, '0.0.0.0', () => {
  const networkInterfaces = os.networkInterfaces();
  let hostAddress;

  for (const name in networkInterfaces) {
    const interfaces = networkInterfaces[name];
    for (const iface of interfaces) {
      if (iface.family === 'IPv4' && !iface.internal) {
        hostAddress = iface.address;
        break;
      }
    }
    if (hostAddress) break;
  }

  if (hostAddress) {
    console.log(`
      Server started at:\n
      server: http://${hostAddress}:${port}
      `);
  } else {
    console.log(`Server started on port ${port}, but could not determine host IP address.`);
  }
});