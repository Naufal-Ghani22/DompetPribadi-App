const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('island', {
  hover: on => ipcRenderer.send('hover', on),
  openApp: () => ipcRenderer.send('open-app'),
  quit: () => ipcRenderer.send('quit'),
  menu: () => ipcRenderer.send('menu'),
  onQuickAdd: cb => ipcRenderer.on('quick-add', cb),
});
