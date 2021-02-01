
import puppeteer from 'puppeteer';
import { Converter } from 'ffmpeg-stream';
import { exit } from 'process';
require('dotenv').config()

var run = async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    var outFile = 'C:\\Temp\\video\\' + new Date().getTime() + '.webm';
    const conv = new Converter() // create converter
    const input = conv.createInputStream({ f: 'image2pipe', r: 30 }) // create input writable stream
    conv.createOutputToFile(outFile, { vcodec: 'libvpx', pix_fmt: 'yuv420p' }) // output to file

    await recordVideo(input, page, setup);

    console.log('writing end');
    input.end();
    await conv.run();
    console.log('writing end');
    exit();
}

run();

let lastFrame;
let firstFrame;
let passedFirstFrame = false;
let startCapture = false;


let recordVideo = (input, page: puppeteer.Page, setup): Promise<any[]> => {
    return new Promise(async (resolve, reject) => {
        let frames: any[] = [];
        let session;

        let repeatFramesInterval;

        let start = async () => {

            repeatFramesInterval = setInterval(() => {
                if (lastFrame) {
                    if (lastFrame != firstFrame || !passedFirstFrame) {
                        passedFirstFrame = true;
                        input.write(lastFrame);
                    }
                }
            }, 1000 / 30);

            page.goto('https://www.nexbank.com/', { timeout: 0 });

            page.on('requestfinished', async response => {
                if (!startCapture) {
                    startCapture = true;
                    console.log('FIRST REQUEST FINISHED');
                    session= await page.target().createCDPSession();
                    await session.send('Page.startScreencast', { format: 'jpeg' });
                    session.on('Page.screencastFrame', (event, sessionId) => {
                        if (!firstFrame)
                            firstFrame = lastFrame;
        
                        lastFrame = null;
                        console.log('captured screen');
                        lastFrame = Buffer.from(event.data, 'base64');
                        input.write(lastFrame);
                        session.send('Page.screencastFrameAck', { sessionId }).catch(() => { });
                    });
                }
            });
        }

        let stop = async () => {
            clearInterval(repeatFramesInterval);
            console.log('event ENDED');
            await session.send('Page.stopScreencast');
            resolve(frames);
            await page.close();
        }

        await setup(start, stop);
    });
}

let setup = async (start, stop) => {
    start();
    await new Promise((resolve, reject) => setTimeout(resolve, 50000));
    stop();
}