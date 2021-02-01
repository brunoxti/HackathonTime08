export interface TestEvidence {
    _id: string;
    gmud: string;
    date: string;
    title: string;
    flows: TestFlow[];
    status: TestEvidenceStatus;
    errorMessages: any[];
    generated: EvidenceGenerated;
    createdAt: Date
}

export enum TestEvidenceStatus {
    New,
    Processing,
    Done,
    Error
}

export interface EvidenceGenerated {
    date: Date,
    files: EvidenceFile[]
}

export interface EvidenceFile {
    path: string,
    name: string
}


export interface TestFlow {
    _id: string,
    name: string,
    tables: TestTable[];
}

export interface TestFlowJob {
    gmud: string;
    date: string;
    title: string;
    flows: TestFlow[];
}

export interface TestTable {
    name: string;
    description: string;
    headers: string[];
    lines: TestTableLine[];
}

export interface TestTableLine {
    description: string;
    texts: TestColumnText[];
    commands: FlowCommand[];
}

export interface TestColumnText {
    text: string,
    isDynamic: boolean,
    step?: number
}

export interface FlowCommand {
    url: string;
    isCode: boolean;
    action?: string;
}