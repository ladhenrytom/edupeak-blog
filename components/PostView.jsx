"use client";

import {IconButton, Tooltip} from "@mui/material";
import {Edit, Favorite, FavoriteBorder, ThumbUp} from "@mui/icons-material";
import PostCard from "@/components/PostCard";
import AuthorCard from "@/components/AuthorCard";
import CommentsFeed from "@/components/CommentsFeed";
import {useRouter} from "next/navigation";
import {useSession} from "next-auth/react";
import {sanitize} from "isomorphic-dompurify";
import {useContext, useEffect, useState} from "react";
import {GetFunctionsContext} from "@/components/FunctionsProvider";

export default function PostView({post, relatedPosts, viewer}) {
  const postId = post._id;
  const {data: session} = useSession();
  const userId = session?.user.id;
  const router = useRouter();
  const {getDate, giveFeedback, openSigninModal} = useContext(GetFunctionsContext);
  const {day, month, year} = getDate(post.updatedAt);
  const [favoritedPosts, setFavoritedPosts] = useState(viewer?.favoritedPosts ?? []);
  const [postLikes, setPostLikes] = useState(post.likes);
  let isFavorited = favoritedPosts.includes(postId);

  async function likePost() {
    if (!userId) {
      openSigninModal();
    } else {
      const res = await fetch(`/api/users/${userId}/favoritePost`, {method: "POST", body: JSON.stringify({postId})});
      if (res.ok) {
        getUserFavoritedPosts();
        getPostLikes();
        giveFeedback("Post added to favorites", "success");
      } else {
        giveFeedback("Action could not be completed", "error");
      }
    }
  }

  async function unlikePost() {
    const res = await fetch(`/api/users/${userId}/favoritePost`, {method: "PATCH", body: JSON.stringify({postId})});
    if (res.ok) {
      getUserFavoritedPosts();
      getPostLikes();
      giveFeedback("Post removed from favorites", "success");
    } else {
      giveFeedback("Action could not be completed", "error");
    }
  }

  async function getUserFavoritedPosts() {
    const res = await fetch(`/api/users/${userId}/favoritePost`, {cache: "no-store"});

    const data = await res.json();

    data && setFavoritedPosts(data);
  }

  async function getPostLikes() {
    const res = await fetch(`/api/posts/${postId}/likes`);
    if (res.ok) {
      const data = await res.json();
      setPostLikes(data);
    } else giveFeedback("Could not get the number of likes for this post", "error");
  }

  function createMarkup(html) {
    const clean = sanitize(html);
    return {
      __html: clean,
    };
  }

  useEffect(() => {
    userId && getUserFavoritedPosts();
    getPostLikes();
  }, [userId]);

  return (
    <aside className="flex md:flex-row xs:flex-col">
      {/* left side */}
      <div className=" md:w-2/3 xs:py-6 xs:px-2 md:p-10 md:mr-10">
        <div className="flex xs:flex-col md:flex-row font-mono text-sm text-neutral-400 mb-6">
          {/* date of post */}
          <p>Last updated on {`${month} ${day}, ${year}`}</p>
          <p className="md:ml-2">- {post.readTime} mins read</p>
        </div>

        {/* tile of post */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="xs:text-2xl md:text-4xl font-semibold mb-6">{post.title}</h1>
            {postLikes > 0 && (
              <span className="bg-slate-500 text-white text-sm flex justify-center items-center w-fit  py-1 px-3 rounded-md">
                <b>
                  {postLikes} {postLikes > 1 ? "likes" : "like"}
                </b>
                <ThumbUp fontSize="inherit" className="ml-3" />
              </span>
            )}
          </div>
          {userId === post.author._id ? (
            <Tooltip arrow title="Edit this post">
              <IconButton onClick={() => router.push(`/edit/${postId}`)}>
                <Edit />
              </IconButton>
            </Tooltip>
          ) : isFavorited ? (
            <Tooltip arrow title="Unlike this post">
              <IconButton onClick={unlikePost}>
                <Favorite className="text-red-500" />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip arrow title="Like this post">
              <IconButton onClick={likePost}>
                <FavoriteBorder className="dark:text-neutral-400" />
              </IconButton>
            </Tooltip>
          )}
        </div>

        {/* post image/video if any  */}
        <img loading="lazy" alt="post image" src={post.img} className="w-full xs:h-72 md:h-96 my-6 object-cover rounded-md" />

        {/* notes */}
        <div dangerouslySetInnerHTML={createMarkup(post?.content)}></div>

        <div className="xs:py-6 xs:px-2 md:p-6 my-10 border-t border-neutral-300">
          {/* comments */}
          <div className="mt-6">
            <CommentsFeed postId={postId} comments={post.comments} />
          </div>
        </div>
      </div>

      {/* right side////////////////////////////// */}
      <div className="md:w-1/3 xs:px-2 xs:py6 md:p-10">
        {/* author's card */}
        <AuthorCard authorInfo={post.author} />

        {/* related posts */}
        <div className="w-full">
          <h6 className="py-2 border-b border-neutral-400 mt-6">
            <b>Related Posts</b>
          </h6>

          {/* posts */}
          <div className="p-6 grid grid-cols-1 gap-6 w-full">
            {relatedPosts.slice(0, 3).map(p => (
              <PostCard key={p._id} post={p} />
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
