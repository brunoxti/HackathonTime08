import { PictureRun, Table } from "docx";

export class ImageEvidence {
    constructor(
        public url: string,
        public image: string,
        public date: Date,
        public duration: number
    ) { }
}

export class ImageEvidenceElement {
    constructor(
        public image: PictureRun,
        public evidence: ImageEvidence) { }
}

export class ImageEvidenceBenchMark {
    constructor(
        public infoTable: Table,
        public image: PictureRun
    ) { }

    public getElements() {
        return [this.infoTable, this.image];
    }
}