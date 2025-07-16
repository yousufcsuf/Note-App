import { Schema, model, InferSchemaType } from "mongoose";

const noteSchema = new Schema(
  {
    title: { type: String, required: true },
    text: { type: String },
  },
  { timestamps: true }
);

// ✅ Correct type inference from schema
type Note = InferSchemaType<typeof noteSchema>;

export default model<Note>("Note", noteSchema);
