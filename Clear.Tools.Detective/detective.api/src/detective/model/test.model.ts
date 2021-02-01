import { ImageEvidence } from "./image-evidence.model";
import { TestColumnText } from "./test-dto.model";

export class TestFlowJob {
    constructor(
        public gmud: string,
        public date: string,
        public title: string,
        public tables: TestTable[],
        public destination?: string) { }
}

export class TestTable {
    constructor(
        public name: string,
        public description: string,
        public headers: TestTableHeader[],
        public lines: TestTableLine[]) { }
}

export class TestTableLine {
    public result: string;
    public commands : TestImageCommand[];
    public videoUrl: string;
    constructor(
        public description: string,
        public texts: TestColumnText[],
        commands: (TestImageCommand | string)[]) {
        this.commands = commands.map(x => typeof x == "object" ? x : new TestImageCommand(x));
    }
}

export class TestImageCommand {
    constructor(
        public url: string,
        public action?: string,
        public image?: ImageEvidence,
    ) { }
}

export class TestTableHeader {
    constructor(
        public text: string,
        public percent: number,
        public fill: string = "d9d9d9",
        public color: string = "000000") { }
}