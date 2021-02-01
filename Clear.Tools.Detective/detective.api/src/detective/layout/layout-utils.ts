import {
    Document,
    HorizontalPositionAlign,
    HorizontalPositionRelativeFrom,
    Media,
    Packer,
    Paragraph,
    Footer,
    Header,
    Table,
    TableCell,
    TableRow,
    WidthType,
    VerticalPositionAlign,
    VerticalPositionRelativeFrom,
    AlignmentType, PictureRun
} from 'docx';
import * as fs from 'fs';
import { TextRun } from 'docx';
import PrintScreen from '../../browser/print-screen';
import { v4 as uuidv4 } from 'uuid';
import { ImageEvidenceElement, ImageEvidenceBenchMark } from '../model/image-evidence.model';
import BenchMark from '../../utils/benchmark';
import { TestTable } from '../model/test.model';

const sizeOf = require('image-size');

export class LayoutUtils {
    static marginFull(top: number, right: number, bottom: number, left: number) {
        return {
            top: top,
            bottom: bottom,
            left: left,
            right: right,
        }
    }
    
    static widthPercent(percent: number) {
        return {
            size: percent,
            type: WidthType.PERCENTAGE,
        }
    }
    
    static shading(color: string = "000000", fill: string = "ffffff") {
        return {
            fill: fill,
            color: color,
        };
    }
    
    static text(text: any, size: number = 20, color: string = "000000", bold: boolean = false, underline: boolean = false) {
        return new TextRun({
            text: text,
            bold: bold,
            underline: underline,
            font: "Arial",
            size: size,
            color: color
        } as any);
    }
    
    static paragraph(text, size = 20, color = "000000", bold = false, underline = false) {
        return new Paragraph({
            children: [
                this.text(text, size, color, bold, underline)
            ]
        });
    }
    
    static paragraphWithTexts(children) {
        return new Paragraph({
            children: children
        });
    }
    
    static cell(text, percent, fontSize = 20, color = "000000", fill = "ffffff") {
        return new TableCell({
            children: [this.paragraph(text, fontSize, color)],
            width: this.widthPercent(percent),
            margins: this.marginFull(30, 80, 30, 150),
            shading: this.shading(color, fill)
        });
    }
    
    static createImageRun(doc, url: string, factor: number = 1, w?: number, h?: number): Promise<PictureRun> {
        return new Promise((resolve, reject) => {
            sizeOf(url, function (err, size) {
                if (err) {
                    console.log(err);
                    return reject(err);
                }
    
                w = (w != null ? w : size.width) * factor;
                h = (h != null ? h : size.height) * factor;
                const image = Media.addImage(doc, fs.readFileSync(url), w, h);
                resolve(image);
            });
        });
    }
}