import { Schema } from "mongoose";

const comments = new Schema(
  {
    text: { type: String, required: true, trim: true },
    task: { type: Schema.Types.ObjectId, ref: "Task", required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    mentions: [
      {
        user: { type: Schema.Types.ObjectId, ref: "User" },
        offset: { type: Number },
        length: { type: Number },
      },
    ],
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    reactions: [
      {
        emoji: { type: String },
        user: { type: Schema.Types.ObjectId, ref: "User" },
      },
    ],
    attachments: [
      {
        filename: { type: String },
        fileUrl: { type: String },
        fileType: { type: String },
        fileSize: { type: Number },
        uploadedBy: { type: Schema.Types.ObjectId, ref: "User" },
        uploadedAt: { type: Date, default: Date.now },
      },
    ],
    isEdited: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const Project = mongoose.model("Comment", comments);

export default Project;
