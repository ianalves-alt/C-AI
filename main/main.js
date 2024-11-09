const { app, BrowserWindow } = require("electron");
const path = require("path");

let serve;
(async () => {
  serve = (await import("electron-serve")).default;
})();

const createWindow = async () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  if (app.isPackaged) {
    await serve({ directory: path.join(__dirname, "../out") })(win);
  } else {
    win.loadURL("http://localhost:3000");
    win.webContents.openDevTools();
    win.webContents.on("did-fail-load", () => {
      win.webContents.reloadIgnoringCache();
    });
  }
};

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
