const { app, BrowserWindow, Tray, Menu, ipcMain, screen, globalShortcut } = require('electron');
const path = require('path');
const root = path.join(__dirname, '..');
let island, full, tray;

if (!app.requestSingleInstanceLock()) app.quit();

function createIsland() {
  const W = 460, H = 300, { width } = screen.getPrimaryDisplay().workAreaSize;
  island = new BrowserWindow({
    width: W, height: H, // di sebelah kanan NUSA (yang ada di tengah) supaya tidak bertabrakan
    x: Math.round(Math.min(width / 2 + 330, width - W / 2 - 10) - W / 2), y: 6,
    frame: false, transparent: true, resizable: false, skipTaskbar: true, hasShadow: false,
    alwaysOnTop: true, focusable: true, show: false,
    webPreferences: { preload: path.join(__dirname, 'preload.js') },
  });
  island.setAlwaysOnTop(true, 'screen-saver');
  island.setIgnoreMouseEvents(true, { forward: true });
  island.loadFile(path.join(root, 'island.html'));
  island.once('ready-to-show', () => island.showInactive());
}

function openFull() {
  if (full && !full.isDestroyed()) return full.show(), full.focus();
  full = new BrowserWindow({
    width: 1100, height: 760, minWidth: 380, backgroundColor: '#0f1412', autoHideMenuBar: true,
    title: 'Dompet', icon: path.join(__dirname, 'icon.png'),
  });
  full.loadFile(path.join(root, 'index.html'));
}

app.whenReady().then(() => {
  createIsland();
  tray = new Tray(path.join(__dirname, 'tray.png'));
  tray.setToolTip('Dompet');
  tray.setContextMenu(Menu.buildFromTemplate([
    { label: 'Buka Dompet', click: openFull },
    { label: 'Catat cepat (Ctrl+Alt+D)', click: () => island.webContents.send('quick-add') },
    { type: 'separator' },
    { label: 'Mulai saat Windows menyala', type: 'checkbox', checked: app.getLoginItemSettings().openAtLogin,
      click: i => app.setLoginItemSettings({ openAtLogin: i.checked }) },
    { label: 'Keluar', click: () => app.quit() },
  ]));
  tray.on('click', openFull);
  globalShortcut.register('Control+Alt+D', () => { island.focus(); island.webContents.send('quick-add'); });
});

ipcMain.on('hover', (_, on) => {
  island.setIgnoreMouseEvents(!on, { forward: true });
  if (on) island.focus();
});
ipcMain.on('open-app', openFull);
app.on('window-all-closed', () => {}); // tetap hidup di tray
app.on('will-quit', () => globalShortcut.unregisterAll());
