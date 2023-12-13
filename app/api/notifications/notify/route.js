import {connectToDB} from "@/utils/database";
import {Knock} from "@knocklabs/node";
import Post from "@/models/post";

const knock = new Knock(process.env.KNOCK_SECRET_API_KEY);

export const POST = async request => {
  const {actor, postId, newCommentId, workflow} = await request.json();
  try {
    await connectToDB();

    // get post creator from postId
    const {author} = await Post.findById(postId).populate("author");

    // notify user through workflow
    await knock.workflows.trigger(workflow, {
      recipients: [{id: author._id, name: author.username, email: author.email}],
      actor,
      data: {
        postId,
        newCommentId,
      },
    });

    return new Response("Notification sent", {status: 200});
  } catch (error) {
    return new Response(JSON.stringify(error.message), {status: 500});
  }
};
