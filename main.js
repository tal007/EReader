const electron = require('electron');

const { app, BrowserWindow, Menu } = electron;
const path = require('path');

if (process.mas) app.setName('Your Electron App Name');

let mainWindow;

function createWindow() {
  const windowOptions = {
    width: 1220,
    height: 780,
    minWidth: 1220,
    minHeight: 780,
    webPreferences: {
      nodeIntegration: true, // 不集成 Nodejs
      webSecurity: false,
    },
    title: app.getName(),
  };

  if (process.platform === 'linux') {
    windowOptions.icon = path.join(__dirname, '/app/ico/your-ico.png');
  }

  mainWindow = new BrowserWindow(windowOptions);
  const startUrl =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:4000'
      : path.join(__dirname, '/build/index.html');
  // mainWindow.loadURL(path.join('file://', __dirname, '/index.html'));
  mainWindow.loadURL(startUrl);
  // mainWindow.webContents.openDevTools();

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', () => {
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu); // 设置菜单部分
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (mainWindow === null) createWindow();
});

app.on('browser-window-created', () => {
  const reopenMenuItem = findReopenMenuItem();
  if (reopenMenuItem) reopenMenuItem.enabled = false;
});

app.on('window-all-closed', () => {
  const reopenMenuItem = findReopenMenuItem();
  if (reopenMenuItem) reopenMenuItem.enabled = true;
  app.quit();
});

/**
 * 注册键盘快捷键
 * 其中：label: '切换开发者工具',这个可以在发布时注释掉
 */
let template = [
  {
    label: 'Edit ( 操作 )',
    submenu: [
      {
        label: 'Copy ( 复制 )',
        accelerator: 'CmdOrCtrl+C',
        role: 'copy',
      },
      {
        label: 'Paste ( 粘贴 )',
        accelerator: 'CmdOrCtrl+V',
        role: 'paste',
      },
      {
        label: 'Reload ( 重新加载 )',
        accelerator: 'CmdOrCtrl+R',
        click(item, focusedWindow) {
          if (focusedWindow) {
            // on reload, start fresh and close any old
            // open secondary windows
            if (focusedWindow.id === 1) {
              BrowserWindow.getAllWindows().forEach((win) => {
                if (win.id > 1) {
                  win.close();
                }
              });
            }
            focusedWindow.reload();
          }
        },
      },
    ],
  },
  {
    label: 'Window ( 窗口 )',
    role: 'window',
    submenu: [
      {
        label: 'Minimize ( 最小化 )',
        accelerator: 'CmdOrCtrl+M',
        role: 'minimize',
      },
      {
        label: 'Close ( 关闭 )',
        accelerator: 'CmdOrCtrl+W',
        role: 'close',
      },
      {
        label: '切换开发者工具',
        // eslint-disable-next-line wrap-iife
        accelerator: (function () {
          if (process.platform === 'darwin') {
            return 'Alt+Command+I';
          }
          return 'Ctrl+Shift+I';
        })(),
        click(item, focusedWindow) {
          if (focusedWindow) {
            focusedWindow.toggleDevTools();
          }
        },
      },
      {
        type: 'separator',
      },
    ],
  },
  {
    label: 'Help ( 帮助 ) ',
    role: 'help',
    submenu: [
      {
        label: 'FeedBack ( 意见反馈 )',
        click() {
          electron.shell.openExternal('https://forum.iptchain.net');
        },
      },
    ],
  },
];

/**
 * 增加更新相关的菜单选项
 */
function addUpdateMenuItems(items, position) {
  if (process.mas) return;

  const version = electron.app.getVersion();
  const updateItems = [
    {
      label: `Version ${version}`,
      enabled: false,
    },
    {
      label: 'Checking for Update',
      enabled: false,
      key: 'checkingForUpdate',
    },
    {
      label: 'Check for Update',
      visible: false,
      key: 'checkForUpdate',
      click() {
        electron.autoUpdater.checkForUpdates();
      },
    },
    {
      label: 'Restart and Install Update',
      enabled: true,
      visible: false,
      key: 'restartToUpdate',
      click() {
        electron.autoUpdater.quitAndInstall();
      },
    },
  ];

  // eslint-disable-next-line prefer-spread
  items.splice.apply(items, [position, 0].concat(updateItems));
}

function findReopenMenuItem() {
  const menu = Menu.getApplicationMenu();
  if (!menu) return;

  let reopenMenuItem;
  menu.items.forEach((item) => {
    if (item.submenu) {
      item.submenu.items.forEach((item) => {
        if (item.key === 'reopenMenuItem') {
          reopenMenuItem = item;
        }
      });
    }
  });
  return reopenMenuItem;
}

// 针对Mac端的一些配置
if (process.platform === 'darwin') {
  const name = electron.app.getName();
  template.unshift({
    label: name,
    submenu: [
      {
        label: 'Quit ( 退出 )',
        accelerator: 'Command+Q',
        click() {
          app.quit();
        },
      },
    ],
  });

  // Window menu.
  template[3].submenu.push(
    {
      type: 'separator',
    },
    {
      label: 'Bring All to Front',
      role: 'front',
    }
  );

  addUpdateMenuItems(template[0].submenu, 1);
}

// 针对Windows端的一些配置
if (process.platform === 'win32') {
  const helpMenu = template[template.length - 1].submenu;
  addUpdateMenuItems(helpMenu, 0);
}
