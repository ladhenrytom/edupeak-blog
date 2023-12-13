import Comment from "@/models/comment";
import {connectToDB} from "@/utils/database";

export const GET = async (request, {params}) => {
  try {
    await connectToDB();

    const comment = await Comment.findById(params.id)
      .populate("creator")
      .populate("replies")
      .populate({path: "replies", populate: {path: "creator"}});

    if (!comment) return new Response("Comment not found", {status: 404});

    return new Response(JSON.stringify(comment.replies), {status: 200});
  } catch (error) {
    return new Response("Internal server error", {status: 500});
  }
};

export const POST = async (request, {params}) => {
  const {creator, content} = await request.json();
  try {
    await connectToDB();

    const reply = await Comment.create({creator, content, replies: []});

    const comment = await Comment.findById(params.id);

    if (!comment) return new Response("Comment to be uodated not found", {status: 404});

    comment.replies.push(reply);

    await comment.save();

    return new Response(JSON.stringify(comment.replies), {status: 200});
  } catch (error) {
    return new Response("Internal server error", {status: 500});
  }
};
