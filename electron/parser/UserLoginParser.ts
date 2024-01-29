import puppeteer from "puppeteer";
import {BTMAIN_LOGIN_URL, BTMAIN_STARTER_URL} from "../../src/core/variables";
import path = require("path");

const UserLoginParser = async (
    event: Electron.IpcMainEvent,
    args: any,
    onSuccessCallback: (token: string, date: string) => void,
    onErrorCallback: (errorMessage: string) => void
) => {
    try {

        const browser = await puppeteer.launch({
            headless: false,
            executablePath: path.resolve("public", "chromedriver.exe")
        });

        console.log(browser)

        browser.on('disconnected', () => {
           return onErrorCallback("Բրաուզերը վաղաժամ փակվել է։ Փորձեք կրկիՆ։");
        });

        const page = await browser.newPage();

        await page.goto(BTMAIN_LOGIN_URL, {
            waitUntil: "networkidle2"
        });

        let tokenGetInterval = setInterval(async () => {
            if (!page) return;
            const token = await page.evaluate(() => {
                return localStorage.getItem("token");
            });
            if (!token) return;

            clearInterval(tokenGetInterval);

            const localStorageData = await page.evaluate(() => {
                const localStorageValues = {};
                for (let i = 0; i < localStorage.length; i++) {
                    const key = localStorage.key(i);
                    // @ts-ignore
                    localStorageValues[key] = localStorage.getItem(key as any);
                }
                return localStorageValues;
            });

            await page.goto(BTMAIN_STARTER_URL);

            const dateElementContentInterval = setInterval(async () => {
                let dateElementContent = await page.$eval(".color_999", (element) => {
                    return element.textContent;
                });
                if (dateElementContent === "--" || !dateElementContent) return;
                clearInterval(dateElementContentInterval);
                onSuccessCallback(JSON.stringify(localStorageData), dateElementContent);
                await browser.close();
            }, 2000);
        }, 5000);
    } catch (error) {
        if (!error) return;
        onErrorCallback(error?.toString());
    }
}

export default UserLoginParser;