import {Schema, model, models} from "mongoose";

const PostSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      required: [true, "Post title is required."],
    },
    category: {
      type: String,
      required: [true, "Post must have a category."],
    },
    content: {
      type: String,
      required: [true, "Post must have a content."],
    },
    img: {type: String},
    readTime: {
      type: Number,
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    likes: Number,
  },
  {timestamps: true}
);

const Post = models.Post || model("Post", PostSchema);

export default Post;
