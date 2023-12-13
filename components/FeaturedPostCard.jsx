"use client";

import {Schedule} from "@mui/icons-material";
import {useRouter} from "next/navigation";
import {GetFunctionsContext} from "@/components/FunctionsProvider";
import {useContext} from "react";

export default function FeaturedPostCard({post}) {
  const router = useRouter();
  const {getDate} = useContext(GetFunctionsContext);
  const {day, month, year} = getDate(post?.createdAt);

  return (
    <div className="relative w-full h-fit text-black ">
      <div className="absolute top-0 bottom-0 left-0 right-0 bg-black opacity-20 z-10 "></div>
      <img loading="lazy" alt="Featured post image" src={post?.img} className="w-full h-96 object-cover z-0 " />
      <div className="absolute top-6 xs:left-2 md:left-6 max-w-fit flex flex-col bg-neutral-100 p-6  shadow-lg z-20">
        <h1 className="xs:text-xl md:text-4xl max-w-md">{post?.title}</h1>
        <span className="self-start flex items-center text-sm my-2 hover:cursor-pointer hover:underline" onClick={() => router.push(`/profile/${post?.author._id}`)}>
          by
          <b className="ml-2">{post?.author.username}</b>
        </span>
        <p className="text-xs font-mono flex xs:flex-col md:flex-row md:items-center mb-2">
          <span className="flex items-center">
            <Schedule fontSize="inherit" className="mr-2" /> {`${month} ${day}, ${year}`}
          </span>{" "}
          <b className=" md:ml-2">- {post?.readTime} mins read</b>
        </p>
        <p className="xs:hidden md:block text-xs font-light opacity-60 max-w-lg mb-auto">Check out our featured post of the day! Quite an interesting read.</p>
        <button className="self-start flex text-sm text-orange-400 font-medium hover:underline mt-6" onClick={() => router.push(`/posts/${post?._id}`)}>
          Continue reading...
        </button>
      </div>
    </div>
  );
}
