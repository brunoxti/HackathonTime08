import mongoose, { Schema } from "mongoose";
import { TestEvidence } from "../detective/model/test-dto.model";

export type EvidenceDocument = mongoose.Document & TestEvidence;

const evidenceSchema = new mongoose.Schema({
    gmud: String,
    date: String,
    title: String,
    flows: Schema.Types.Mixed,
    status: Schema.Types.Mixed,
    errorMessages: Schema.Types.Mixed,
    generated: Schema.Types.Mixed
}, { timestamps: true });

const Evidence = mongoose.model<EvidenceDocument>("evidence", evidenceSchema);

export default Evidence;