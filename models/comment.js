import mongoose from "mongoose";

const {Schema, model, models} = mongoose;

export const commentSchema = new Schema(
  {
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: String,
    replies: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  {timestamps: true}
);

const Comment = models.Comment || model("Comment", commentSchema);
export default Comment;
