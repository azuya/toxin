var app = require('app');
var BrowserWindow = require('browser-window');
var path = require('path');
var url = require('url');

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
    title: 'Toxify'
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
});
