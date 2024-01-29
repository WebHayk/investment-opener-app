import {app, BrowserWindow, ipcMain} from 'electron';
import * as path from 'path';
import installExtension, {REACT_DEVELOPER_TOOLS} from "electron-devtools-installer";
import UserLoginParser from "./parser/UserLoginParser";
import StartMiningParser from "./parser/StartMiningParser";
import {spawn} from "child_process";

let win: any;

function createWindow() {
    win = new BrowserWindow({
        width: 600,
        fullscreenable: false,
        height: 600,
        resizable: false,
        webPreferences: {
            devTools: true,
            preload: path.join(__dirname, 'preload.js')
        }
    });

    if (app.isPackaged) {
        // 'build/index.html'
        win.loadURL(`file://${__dirname}/../index.html`);

        win.webContents.on("new-window", (event: any, url: string) => {
            const existingWindow = BrowserWindow.getAllWindows().find((win) => {
                return win.webContents.getURL() === url;
            });

            if (existingWindow) {
                event.preventDefault();
                existingWindow.focus();
            }
        });
    } else {
        win.loadURL('http://localhost:3000/index.html');

        win.webContents.openDevTools();

        // Hot Reloading on 'node_modules/.bin/electronPath'
        require('electron-reload')(__dirname, {
            electron: path.join(__dirname,
                '..',
                '..',
                'node_modules',
                '.bin',
                'electron' + (process.platform === "win32" ? ".cmd" : "")),
            forceHardReset: true,
            hardResetMethod: 'exit'
        });
    }
}

app
    .whenReady()
    .then(() => {
        // DevTools
        installExtension(REACT_DEVELOPER_TOOLS)
            .then((name) => console.log(`Added Extension:  ${name}`))
            .catch((err) => console.log('An error occurred: ', err));

        createWindow();

        app.on('activate', () => {
            if (BrowserWindow.getAllWindows().length === 0) {
                createWindow();
            }
        });

        /** account connection event **/
        ipcMain.on("accountConnect", async (event, args) => {
            try {
                await UserLoginParser(
                    event,
                    args,
                    (
                        session: any,
                        date: string
                    ) => {
                        win.send("accountConnect", session, date);
                    },
                    (errorMessage: string) => {
                        win.send("accountConnect", null, null, errorMessage);
                    }
                );
            } catch (error) {
                console.log(error);
            }
        });

        /** mining starter **/
        ipcMain.on("startMining", async (event, args) => {
            try {
                await StartMiningParser(
                    event,
                    args,
                    (
                        session: any,
                        date: string
                    ) => {
                        win.send("startMining", session, date);
                    }
                );
            } catch (error) {
                console.log(error);
            }
        });

        app.on('window-all-closed', () => {
            if (process.platform !== 'darwin') {
                app.quit();
            }
        });
    });
