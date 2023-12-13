import Post from "@/models/post";
import Comment from "@/models/comment";
import {connectToDB} from "@/utils/database";

export const POST = async (request, {params}) => {
  const {id} = params;
  const {creator, content} = await request.json();

  try {
    await connectToDB();

    //create comment
    const newComment = await Comment.create({
      creator,
      content,
      replies: [],
    });

    const updatedPost = await Post.findOneAndUpdate({_id: id}, {$push: {comments: newComment._id}}, {returnDocument: "after"})
      .populate("comments")
      .populate({path: "comments", populate: {path: "creator"}})
      .then(result => {
        result.comments.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1));
        return result;
      });

    return new Response(JSON.stringify({comments: updatedPost.comments, newCommentId: newComment._id}), {status: 200});
  } catch (error) {
    return new Response("Error Updating Post", {status: 500});
  }
};

export const DELETE = async (request, {params}) => {
  const postId = params.id;
  const commentId = await request.json();

  try {
    await connectToDB();

    // Find the post by ID and remove it
    await Comment.findByIdAndRemove(id);

    return new Response("Comment deleted successfully", {status: 200});
  } catch (error) {
    return new Response("Error deleting comment", {status: 500});
  }
};
