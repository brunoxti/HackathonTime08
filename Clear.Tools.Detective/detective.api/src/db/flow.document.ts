import mongoose, { Schema } from "mongoose";
import { TestFlow } from "../detective/model/test-dto.model";

export type FlowDocument = mongoose.Document & TestFlow;

const flowSchema = new mongoose.Schema({
    name: String,
    tables: Schema.Types.Mixed,
    variables: Schema.Types.Mixed
}, { timestamps: true });

const Flow = mongoose.model<FlowDocument>("flow", flowSchema);

export default Flow;