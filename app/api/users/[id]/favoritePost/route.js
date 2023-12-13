import Post from "@/models/post";
import User from "@/models/user";
import {connectToDB} from "@/utils/database";

export const GET = async (request, {params}) => {
  const userId = params.id;

  try {
    await connectToDB();

    const user = await User.findById(userId);

    if (!user) return new Response("User not found", {status: 404});

    const favoritedPosts = user.favoritedPosts;

    return new Response(JSON.stringify(favoritedPosts), {status: 200});
  } catch (error) {
    return new Response("Error getting favorited post", {status: 500});
  }
};

export const POST = async (request, {params}) => {
  const userId = params.id;
  const {postId} = await request.json();

  try {
    await connectToDB();

    const user = await User.findById(userId);
    let post = await Post.findById(postId);

    if (!user) return new Response("User not signed in", {status: 504});

    if (user.favoritedPosts.includes(postId)) return new Response("You already favorited this post", {status: 504});

    user.favoritedPosts.push(postId);
    post.likes = post.likes + 1;

    await user.save();
    await post.save();

    return new Response("Post successfully added to your liked posts", {status: 200});
  } catch (error) {
    return new Response("Error favoriting post", {status: 500});
  }
};

export const PATCH = async (request, {params}) => {
  const userId = params.id;
  const {postId} = await request.json();

  try {
    await connectToDB();

    const user = await User.findById(userId);
    let post = await Post.findById(postId);

    const newFavoritedPosts = user.favoritedPosts.filter(p => p._id != postId);

    user.favoritedPosts = newFavoritedPosts;
    post.likes = post.likes - 1;

    await user.save();
    await post.save();

    return new Response("Successfully removed post from favorites", {status: 200});
  } catch (error) {
    return new Response("Error removing post", {status: 500});
  }
};
