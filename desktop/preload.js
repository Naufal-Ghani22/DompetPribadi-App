const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('island', {
  hover: on => ipcRenderer.send('hover', on),
  openApp: () => ipcRenderer.send('open-app'),
  onQuickAdd: cb => ipcRenderer.on('quick-add', cb),
});
