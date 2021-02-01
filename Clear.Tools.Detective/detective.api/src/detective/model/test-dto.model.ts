export interface TestEvidence {
    gmud: string;
    date: string;
    title: string;
    flows: TestFlow[];
    status: TestEvidenceStatus;
    errorMessages: any[];
    generated: EvidenceGenerated | null;
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
    name: string,
    tables: TestTableDto[],
    variables: TestVariable[]
}

export interface TestVariable {
    name: string,
    description: string,
    isSensitive: boolean,
    value: string
}


export interface TestTableDto {
    name: string;
    description: string;
    headers: string[];
    lines: TestTableLineDto[];
}

export interface TestTableLineDto {
    description: string;
    texts: TestColumnText[];
    commands: FlowCommandDto[];
    videoUrl: string;
    result?: string;
}

export interface TestColumnText {
    text: string,
    isDynamic: boolean,
    step?: number
}

export interface FlowCommandDto {
    url: string;
    isCode: boolean;
    action?: string;
}