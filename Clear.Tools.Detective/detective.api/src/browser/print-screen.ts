import puppeteer from 'puppeteer';
import { TestImageCommand } from '../detective/model/test.model';
import * as fs from 'fs';
import AsyncFunction from '../utils/asyncFunction';

export default class PrintScreen {
    browser: puppeteer.Browser | null;
    contexts: puppeteer.BrowserContext[] = [];
    headless: boolean;

    options = {
        ignoreHTTPSErrors: true,
        headless: true,
        devtools: false, // not needed so far, we can see websocket frames and xhr responses without that.
        //dumpio: true,
        defaultViewport: { //--window-size in args
            width: 1280,
            height: 720
        },
        args: [
            /* TODO : https://peter.sh/experiments/chromium-command-line-switches/
              there is still a whole bunch of stuff to disable
            */
            //'--crash-test', // Causes the browser process to crash on startup, useful to see if we catch that correctly
            // not idea if those 2 aa options are usefull with disable gl thingy
            '--disable-canvas-aa', // Disable antialiasing on 2d canvas
            '--disable-2d-canvas-clip-aa', // Disable antialiasing on 2d canvas clips
            // '--disable-gl-drawing-for-tests', // BEST OPTION EVER! Disables GL drawing operations which produce pixel output. With this the GL output will not be correct but tests will run faster.
            //'--disable-dev-shm-usage', // ???
            '--no-zygote', // wtf does that mean ?
            '--use-gl=desktop', // better cpu usage with --use-gl=desktop rather than --use-gl=swiftshader, still needs more testing.
            '--enable-webgl',
            '--hide-scrollbars',
            '--mute-audio',
            '--no-first-run',
            '--disable-infobars',
            '--disable-breakpad',
            '--incognito',
            //'--ignore-gpu-blacklist',
            '--window-size=1280,720', // see defaultViewport
            //'--user-data-dir=./chromeData', // created in index.js, guess cache folder ends up inside too.
            '--no-sandbox', // meh but better resource comsuption
            '--disable-setuid-sandbox'] // same
    };

    constructor(
        private tempFolder: string,
        headless: boolean = true) {
        this.options.headless = headless;
        fs.mkdirSync(tempFolder, { recursive: true });
    }

    async init() {
        if (this.browser) {
            return;
        }

        console.log("Initializing");
        this.browser = await puppeteer.launch(this.options);
    }

    async createBrowserContext() {
        await this.init();
        if (this.browser == null)
            throw 'Browser cannot be null';

        const context = await this.browser.createIncognitoBrowserContext();
        this.contexts.push(context);
        return context;
    }

    async print(filename: string, command: TestImageCommand, page: puppeteer.Page, closePage: boolean, postPrintAction?: Function): Promise<string> {
        console.log('Printing file: ' + filename + ' URL: ' + command.url);
        await this.init();

        if (this.browser == null)
            throw "Puppeteer browser cannot be null";

        if (command == null)
            throw "Image command cannot be null";

        await page.setViewport({
            width: 1920,
            height: 1080,
            deviceScaleFactor: 1,
        });

        if (command.action) {
            await AsyncFunction.create(['page'], command.action).call(this, page);
        } else {
            await page.goto(command.url, { timeout: 0 });
        }

        const path = this.tempFolder + "/" + filename;
        await page.screenshot({ path: path });

        if (postPrintAction)
            await postPrintAction(page);

        if (closePage) {
            page.close();
        }

        return path;
    }

    async close() {
        if (this.browser == null)
            throw "Browser cannot be null";

        await this.browser.close();
        this.browser = null;
        this.contexts.forEach(context => {
            context.close();
        });
        this.contexts = [];
    }
}