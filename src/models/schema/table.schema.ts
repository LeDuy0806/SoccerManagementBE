import { ITable } from '@/interfaces';
import { Schema, model } from 'mongoose';
import { SCHEMA } from './schema-name';
import { ObjectId } from 'mongodb';

const tableSchema = new Schema<ITable>({
    name: { type: String, required: true },
    teams: [{ type: ObjectId, required: true, ref: SCHEMA.TEAM }],
    leaderBoard: [
        { type: ObjectId, required: true, ref: SCHEMA.STATISTICALTEAM },
    ],
    matches: [{ type: ObjectId, required: true, ref: SCHEMA.MATCH }],
    tags: { type: String, required: true },
});

export const Table = model<ITable>(SCHEMA.TABLE, tableSchema);
