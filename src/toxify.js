var app = require('app');
var BrowserWindow = require('browser-window');
var path = require('path');
var url = require('url');
var ipc = require('ipc');

require('crash-reporter').start();

var mainWindow = null;

app.on('window-all-closed', function() {
  if (process.platform != 'darwin')
    app.quit();
});

app.on('ready', function() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    title: 'Toxify',
    frame: false,
    'web-preferences': {
      'overlay-scrollbars': true
    }
  });

  var targetPath = path.resolve(__dirname, '..', 'static', 'index.html');
  var targetUrl = url.format({
    protocol: 'file',
    pathname: targetPath,
    slashes: true
  });

  mainWindow.loadUrl(targetUrl);
  mainWindow.on('closed', function() {
    mainWindow = null;
  });
  mainWindow.toggleDevTools()
});

ipc.on('quit', function() {
  // The client wants to quit
  // :(
  app.quit();
});
