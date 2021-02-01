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
import { TextRun } from 'docx';
import PrintScreen from '../../../browser/print-screen';
import { v4 as uuidv4 } from 'uuid';
import { ImageEvidenceElement, ImageEvidenceBenchMark, ImageEvidence } from '../../model/image-evidence.model';
import BenchMark from '../../../utils/benchmark';
import { TestImageCommand, TestTable, TestTableLine } from '../../model/test.model';
import { LayoutUtils } from '../layout-utils';
import { imageSize } from 'image-size';
import { TestColumnText } from '../../model/test-dto.model';

const sizeOf = require('image-size');

export default class LayoutV1 {

    public async createImageEvidenceElement(doc: Document, evidence: ImageEvidence): Promise<ImageEvidenceElement> {
        const imageEvidence = new ImageEvidenceElement(await LayoutUtils.createImageRun(doc, evidence.image, 0.322), evidence);
        return imageEvidence;
    }

    public createTable(table: TestTable) {
        const line = (data: TestColumnText[], index) => {
            let rows = [LayoutUtils.cell((index + 1), table.headers[0].percent, 18, table.headers[0].color, table.headers[0].fill)];
            rows = rows.concat(data.map((v, i) => LayoutUtils.cell(v.text, table.headers[i + 1].percent, 18, table.headers[i + 1].color, table.headers[i + 1].fill)));
            return rows;
        };
        const lines = table.lines.map((v, i) => new TableRow({ children: line(v.texts, i) }));

        const cell_header = (text, size) => LayoutUtils.cell(text, size, 18, "ffffff", "5b9bd5");

        const tableElement = new Table({
            rows: [
                new TableRow({
                    children: table.headers.map((v) => cell_header(v.text, v.percent)),
                }),
                ...lines
            ],
            width: LayoutUtils.widthPercent(100),
            columnWidths: [100, 1000],
            margins: {
                top: 30,
                bottom: 30,
                left: 150,
                right: 80,
            },
        });
        return tableElement;
    }

    async createImage(doc, number, line: TestTableLine, isLastImage: boolean) {
        let imageElements = new Array();
        const title = line.description;
        imageElements.push(LayoutUtils.paragraph(`   ${number}.    ${title}`, 18, "000000", true));
        imageElements.push(LayoutUtils.paragraph("", 12));
        for (const command of line.commands) {
            const imageBenchmark = await this.createImageBenchmark(doc, <ImageEvidence>command.image);
            imageElements.push(imageBenchmark.infoTable);
            imageElements.push(new Paragraph(imageBenchmark.image));
            imageElements.push(LayoutUtils.paragraph("", 14));
        }

        if (!isLastImage) {
            imageElements.push(LayoutUtils.paragraph("", 16));
            imageElements.push(LayoutUtils.paragraph("", 16));
        }

        return imageElements;
    }

    async createImages(doc, table: TestTable) {
        let imageElements = new Array();
        for (const k in table.lines) {
            const isLastLine = table.lines.length == (parseInt(k) + 1);
            imageElements = imageElements.concat(await this.createImage(doc, (parseInt(k) + 1), table.lines[k], isLastLine));
        }
        return imageElements;
    }

    async createImageBenchmark(doc, evidence: ImageEvidence): Promise<ImageEvidenceBenchMark> {
        const evidenceElement = await this.createImageEvidenceElement(doc, evidence);

        const cell_label = (text) => LayoutUtils.cell(text, 5, 12);
        const cell_value = (text) => LayoutUtils.cell(text, 95, 12);
        const line = (label, value) => new TableRow({
            children: [
                cell_label(label),
                cell_value(value)
            ],
        });

        const date =
            ("00" + evidence.date.getDate()).slice(-2)
            + "/" + ("00" + (evidence.date.getMonth() + 1)).slice(-2)
            + "/" + evidence.date.getFullYear() + " "
            + ("00" + evidence.date.getHours()).slice(-2) + ":"
            + ("00" + evidence.date.getMinutes()).slice(-2)
            + ":" + ("00" + evidence.date.getSeconds()).slice(-2);
        + ":" + evidence.date.getMilliseconds();

        const table = new Table({
            rows: [
                line("URL", evidence.url),
                line("Data", date + " Load time " + evidence.duration + "ms"),
            ],
            width: LayoutUtils.widthPercent(100),
            columnWidths: [100, 1100],
            //margins: this.margin_full(30, 80, 30, 150)
        });

        const imageBenchmark = new ImageEvidenceBenchMark(table, evidenceElement.image);

        return imageBenchmark;
    }

    public createHeader(gmud: string, date: string) {
        const cell_label = (text) => LayoutUtils.cell(text, 20, 20);
        const cell_value = (text) => LayoutUtils.cell(text, 80, 20, "0432ff");
        const line = (label, value) => new TableRow({
            children: [
                cell_label(label),
                cell_value(value)
            ],
        });
        const table = new Table({
            rows: [
                line("GMUD", gmud),
                line("Data / Hora", date),
            ],
            width: LayoutUtils.widthPercent(100),
            columnWidths: [100, 1000],
            margins: LayoutUtils.marginFull(30, 80, 30, 150)
        });
        return table;
    }

    async createImageBlock(doc: Document, tables: TestTable[]) {
        let testimages = new Array();
        for (const k in tables) {
            testimages.push(LayoutUtils.paragraph((tables.length + parseInt(k) + 1) + ".    Evidências dos Testes - " + tables[k].name, 20, "000000", true));
            testimages.push(LayoutUtils.paragraph("", 18));
            testimages = testimages.concat(await this.createImages(doc, tables[k]));
        }

        return testimages;
    }

    public createTableBlock(tables: TestTable[]) {
        const elements = tables.reduce((a, c, i) =>
            a.concat([
                LayoutUtils.paragraph((i + 1) + ".    Lista dos Cenários de Teste - " + c.name, 20, "000000", true),
                LayoutUtils.paragraph(""),
                LayoutUtils.paragraph(c.description, 20, "000000", false, true),
                LayoutUtils.paragraph(""),
                this.createTable(c),
                LayoutUtils.paragraph(""),
                LayoutUtils.paragraph("")]), new Array());

        return elements;
    }

    public async createPageHeader(doc: Document, title: string, gmud: string, date: string): Promise<Header> {
        return new Header({
            children: [
                LayoutUtils.paragraphWithTexts([
                    LayoutUtils.text("          "),
                    await LayoutUtils.createImageRun(doc, "./src/assets/logo-xp.jpg", 0.6),
                    LayoutUtils.text("    " + title, 28, "000000", true)
                ]),
                LayoutUtils.paragraph(""),
                this.createHeader(gmud, date),
                LayoutUtils.paragraph(""),
                LayoutUtils.paragraph(""),
                LayoutUtils.paragraph(""),
            ],
        });
    }
}