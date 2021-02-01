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
    tables: TestTable[],
    variables: TestVariable[]
}

export interface TestVariable {
    name: string,
    description: string,
    isSensitive: boolean,
    value: string
}

export interface TestFlowJob {
    gmud: string;
    date: string;
    title: string;
    flows: TestFlow[];
    variables: TestVariable[];
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
    videoUrl: string;
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