"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("electronAPI", {
  // Settings management
  store: {
    get: (key) => electron.ipcRenderer.invoke("store:get", key),
    set: (key, value) => electron.ipcRenderer.invoke("store:set", key, value),
    delete: (key) => electron.ipcRenderer.invoke("store:delete", key)
  },
  // File system operations
  fs: {
    selectDownloadFolder: () => electron.ipcRenderer.invoke("fs:select-download-folder"),
    getDownloadPath: () => electron.ipcRenderer.invoke("fs:get-download-path"),
    openFile: (filePath) => electron.ipcRenderer.invoke("fs:open-file", filePath),
    showInFolder: (filePath) => electron.ipcRenderer.invoke("fs:show-in-folder", filePath),
    getStorageInfo: () => electron.ipcRenderer.invoke("fs:get-storage-info"),
    analyzeFiles: () => electron.ipcRenderer.invoke("fs:analyze-files")
  },
  // Window controls
  window: {
    minimize: () => electron.ipcRenderer.invoke("window:minimize"),
    maximize: () => electron.ipcRenderer.invoke("window:maximize"),
    close: () => electron.ipcRenderer.invoke("window:close")
  },
  // Event listeners
  onMainProcessMessage: (callback) => {
    electron.ipcRenderer.on("main-process-message", (_, message) => callback(message));
  },
  // Remove listeners
  removeAllListeners: (channel) => {
    electron.ipcRenderer.removeAllListeners(channel);
  }
});
