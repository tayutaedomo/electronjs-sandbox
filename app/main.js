const electron = require('electron')
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;
const windowManager = require('electron-window-manager');
const Menu = electron.Menu;

const path = require('path');
const url = require('url');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
let configWindow;


function createWindow() {
  // Create menu.
  createMenu();

  //windowManager.init({});
  //console.log('windowManager.init', windowManager);

  const tmpl_path = 'file://' + path.join(__dirname, 'index.html');

  mainWindow = windowManager.createNew('main', 'Main', tmpl_path, false, {
    'width': 800,
    'height': 600,
    //'position': 'topLeft',
    //'layout': 'simple',
    //'showDevTools': true,
    'resizable': true
  });
  // console.log('windowManager.createNew', mainWindow);

  mainWindow.open();
  // console.log('mainWindow.object', mainWindow.object);

  mainWindow.object.on('closed', function () {
    // Refer: https://github.com/TamkeenLMS/electron-window-manager#create-url-
    mainWindow = null;
  });

  // // Create the browser window.
  // mainWindow = new BrowserWindow({width: 800, height: 600});
  //
  // // and load the index.html of the app.
  // mainWindow.loadURL(url.format({
  //   pathname: path.join(__dirname, 'index.html'),
  //   protocol: 'file:',
  //   slashes: true
  // }));
  //
  // // Open the DevTools.
  // // mainWindow.webContents.openDevTools()
  //
  // // Emitted when the window is closed.
  // mainWindow.on('closed', function () {
  //   // Dereference the window object, usually you would store windows
  //   // in an array if your app supports multi windows, this is the time
  //   // when you should delete the corresponding element.
  //   mainWindow = null
  // })
}

function createConfigWindow() {
  if (configWindow) return;

  const tmpl_path = 'file://' + path.join(__dirname, 'index_config.html');

  configWindow = windowManager.createNew('config', 'Config', tmpl_path, false, {
    'width': 400,
    'height': 300,
    //'position': 'topLeft',
    //'layout': 'simple',
    //'showDevTools': true,
    'resizable': false
  });

  configWindow.open();

  configWindow.object.on('closed', function () {
    configWindow = null;
  });
}

// Refer: https://qiita.com/Quramy/items/a4be32769366cfe55778
function createMenu() {
  // メニュー情報の作成
  var template = [
    {
      label: 'ReadUs',
      submenu: [
        {
          label: 'Quit',
          accelerator: 'Command+Q',
          click: function () {
            app.quit();
          }
        },
        {
          label: 'Preference',
          accelerator: (function() {
            if (process.platform == 'darwin')
              return 'Command+,';
            else
              return 'F2';
          })(),
          click: function() {
            createConfigWindow();
          }
        }
      ]
    },
    {
      label: 'File',
      submenu: [
        {
          label: 'Open',
          accelerator: 'Command+O',
          click: function() {
            // 「ファイルを開く」ダイアログの呼び出し
            //require('dialog').showOpenDialog({ properties: ['openDirectory']}, function(baseDir) {
            electron.dialog.showOpenDialog({ properties: ['openDirectory']}, function(baseDir) {
              if(baseDir && baseDir[0]) {
                console.log(baseDir[0]);
              }
            });
          }
        }
      ]
    },
    {
      label: 'View',
      submenu: [
        {
          label: 'Reload',
          accelerator: 'Command+R',
          click: function() {
            BrowserWindow.getFocusedWindow().reload();
          }
        },
        {
          label: 'Toggle DevTools',
          accelerator: 'Alt+Command+I',
          click: function() {
            BrowserWindow.getFocusedWindow().toggleDevTools();
          }
        }
      ]
    }
  ];

  var menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.



const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const port = 3000;
const webApp = express();

// view engine setup
webApp.set('views', path.join(__dirname, 'web', 'views'));
webApp.set('view engine', 'ejs');

webApp.use(logger('dev'));
webApp.use(bodyParser.json());
webApp.use(bodyParser.urlencoded({ extended: false }));
webApp.use(cookieParser());
webApp.use(express.static(path.join(__dirname, 'web', 'public')));

const routes = require('./web/routes/index');

webApp.use('/', routes);

const server = webApp.listen(port, function () {
  console.log('app listening at http://%s:%s', server.address().host, server.address().port);
});

