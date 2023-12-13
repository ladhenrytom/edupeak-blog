import Post from "@/models/post";
import Category from "@/models/category";
import User from "@/models/user";
import Comment from "@/models/comment";
import {connectToDB} from "./database";

// get all posts
export const getAllPosts = async () => {
  try {
    await connectToDB();

    let posts = await Post.find().populate("author").exec();

    posts = JSON.parse(JSON.stringify(posts));

    return posts;
  } catch (error) {
    throw new Error("Failed to fetch all posts");
  }
};

// get a specific post
export const getOnePostById = async id => {
  try {
    await connectToDB();

    let post = await Post.findById(id)
      .populate(["author", "comments"])
      .populate({path: "comments", populate: {path: "creator"}})
      .then(result => {
        result.comments.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1));
        return result;
      });
    if (!post) return new Response("Post Not Found", {status: 404});

    post = JSON.parse(JSON.stringify(post));

    return post;
  } catch (error) {
    throw new Error("Internal Server Error");
  }
};

// delete a post
export const deletePost = async id => {
  try {
    await connectToDB();

    // Find the prompt by ID and remove it
    await Post.findByIdAndRemove(id);

    return new Response("Post deleted successfully", {status: 200});
  } catch (error) {
    return new Response("Error deleting Post", {status: 500});
  }
};

// get related posts
export const getRelatedPosts = async id => {
  try {
    await connectToDB();

    const referencePost = await Post.findById(id).exec();

    let posts = await Post.find({category: referencePost.category}).populate("author").exec();

    posts = JSON.parse(JSON.stringify(posts));

    return posts;
  } catch (error) {
    throw new Error("Failed to fetch related posts");
  }
};

// get categories
export const getCategories = async () => {
  try {
    await connectToDB();

    let categories = await Category.find().exec();

    categories = JSON.parse(JSON.stringify(categories));

    return categories;
  } catch (error) {
    throw new Error("Failed to get categories");
  }
};

// find a user by id
export const getUserDataById = async id => {
  try {
    await connectToDB();

    let userData = await User.findById(id)
      .populate("favoritedPosts")
      .populate({path: "favoritedPosts", populate: {path: "author"}})
      .exec();

    userData = JSON.parse(JSON.stringify(userData));

    return userData;
  } catch (error) {
    throw new Error("Failed to fetch user's information");
  }
};

// find a user's post by id
export const getUserPostsById = async id => {
  try {
    await connectToDB();

    let posts = await Post.find({author: id}).populate("author").exec();

    posts = JSON.parse(JSON.stringify(posts));

    return posts;
  } catch (error) {
    throw new Error("Failed to fetch posts created by user");
  }
};

// get a user's comments
export const getUserCommentsById = async id => {
  try {
    await connectToDB();

    let comments = await Comment.find({creator: id}).exec();

    comments = await JSON.parse(JSON.stringify(comments));

    return comments;
  } catch (error) {
    throw new Error("Failed to fetch comments created by user");
  }
};
