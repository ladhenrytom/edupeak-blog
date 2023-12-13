import Post from "@/models/post";
import {connectToDB} from "@/utils/database";

export const GET = async (request, {params}) => {
  const postId = params.id;

  try {
    await connectToDB();

    const post = await Post.findById(postId);

    if (!post) return new Response("Post not found", {status: 404});

    return new Response(JSON.stringify(post.likes), {status: 200});
  } catch (error) {
    return new Response("Error getting post likes", {status: 500});
  }
};
