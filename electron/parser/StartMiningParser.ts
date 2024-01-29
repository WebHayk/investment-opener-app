import puppeteer from "puppeteer";
import {BTMAIN_LOGIN_URL, BTMAIN_STARTER_URL} from "../../src/core/variables";
import path = require("path");

const StartMiningParser = async (
    event: Electron.IpcMainEvent,
    args: any,
    onSuccessCallback: (token: string, date: string) => void
) => {

    const browser = await puppeteer.launch({
        headless: "new",
        executablePath: path.resolve(__dirname, "..", "..", "chromedriver.exe")
    });

    const page = await browser.newPage();

    await page.goto(BTMAIN_LOGIN_URL, {
        waitUntil: "networkidle2"
    });

    await page.evaluate((token: string) => {
        return localStorage.setItem("token", token);
    }, args);

    await page.goto(BTMAIN_STARTER_URL, {
        waitUntil: "networkidle2"
    });

    let startMiningButton = await page.waitForSelector(".button");

    if (!startMiningButton) return;

    await startMiningButton.click();

    await page.waitForTimeout(5000);

    const localStorageData = await page.evaluate(() => {
        const localStorageValues = {};
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            // @ts-ignore
            localStorageValues[key] = localStorage.getItem(key as any);
        }
        return localStorageValues;
    });

    const dateElementContentInterval = setInterval(async () => {
        let dateElementContent = await page.$eval(".color_999", (element) => {
            return element.textContent;
        });
        if (dateElementContent === "--" || !dateElementContent) return;
        clearInterval(dateElementContentInterval);
        onSuccessCallback(JSON.stringify(localStorageData), dateElementContent);
        await browser.close();
    }, 2000);
}

export default StartMiningParser;