import puppeteer from 'puppeteer';
import { Converter } from 'ffmpeg-stream';
import { Writable } from 'stream';
require('dotenv').config()

export default class Recorder {
    private converter: Converter;
    private input: Writable;
    private lastFrame;
    private fps: number;
    private page: puppeteer.Page;
    private isStarted: boolean = false;
    private isCaptureStarted: boolean = false;
    private session: puppeteer.CDPSession;
    private fillInterval;

    constructor(page: puppeteer.Page, fps: number = 60) {
        this.page = page;
        this.fps = fps;
        this.converter = new Converter();
    }

    public async start() {
        if (this.isStarted)
            throw 'Cannot start recording, there is a recording running';

        this.isStarted = true;
        console.log('Starting capture');
        this.createInput();
        this.startCapture();
    }

    public async end(outFile: string) {
        console.log('Stopping capture');
        clearInterval(this.fillInterval);
        await this.session?.send('Page.stopScreencast');
        this.createOutput(outFile);
        this.input?.end();
        await this.converter?.run();
        console.log('File saved ' + outFile);

        this.isStarted = false;
    }

    private async startCapture() {
        this.page.on('requestfinished', async response => {
            if (!this.isCaptureStarted) {
                this.isCaptureStarted = true;
                console.log('FIRST REQUEST FINISHED');

                this.session = await this.page.target().createCDPSession();
                await this.session.send('Page.startScreencast', { format: 'jpeg', everyNthFrame: 2 });
                this.session.on('Page.screencastFrame', (event, sessionId) => {
                    this.lastFrame = undefined;
                    console.log('captured screen');
                    this.lastFrame = Buffer.from(event.data, 'base64');
                    this.input.write(this.lastFrame);
                    this.session.send('Page.screencastFrameAck', { sessionId }).catch(() => { });
                });

                this.fillFrameInterval();
            }
        });
    }

    private fillFrameInterval() {
        if (false && !this.fillInterval)
            this.fillInterval = setInterval(() => {
                if (this.lastFrame) {
                    this.input.write(this.lastFrame);
                }
            }, 1000 / this.fps);
    }

    private createInput() {
        this.input = this.converter.createInputStream({ f: 'image2pipe', r: this.fps }) // create input writable stream
    }

    private createOutput(outFile: string) {
        this.converter?.createOutputToFile(outFile, { vcodec: 'libvpx-vp9', pix_fmt: 'yuv420p' }) // output to file
    }
}