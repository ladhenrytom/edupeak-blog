import Post from "@/models/post";
import Category from "@/models/category";
import {connectToDB} from "@/utils/database";

export const POST = async request => {
  const {title, author, category, content, image, readTime} = await request.json();

  try {
    await connectToDB();

    const newPost = await Post.create({
      title,
      author,
      category,
      content,
      img: image,
      comments: [],
      readTime,
    });

    const foundCategory = await Category.findOne({category});

    if (!foundCategory) Category.create({category});

    return new Response(JSON.stringify(newPost), {status: 201});
  } catch (error) {
    return new Response("Failed to create a new post", {status: 500});
  }
};
