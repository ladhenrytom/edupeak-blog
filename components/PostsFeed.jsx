"use client";

import {Container} from "@mui/material";
import FeaturedPostCard from "@/components/FeaturedPostCard";
import PostCard from "@/components/PostCard";
import {useRef, useState} from "react";

export default function Feed({posts, categories}) {
  const ref = useRef(null);
  const [filteredPosts, setFilteredPosts] = useState(posts);
  const [category, setCategory] = useState(null);

  const filterPostsByCategory = cat => {
    setCategory(cat);
    const regex = new RegExp(cat, "i"); // 'i' flag for case-insensitive search
    const postArr = posts.filter(post => regex.test(post.category));
    if (postArr.length > 0) {
      setFilteredPosts(postArr);
      scrollToView();
    } else {
      resetPosts();
    }
  };

  function resetPosts() {
    setCategory(null);
    setFilteredPosts(posts);
    scrollToView();
  }

  function scrollToView() {
    ref.current?.scrollIntoView({behavior: "smooth"});
  }

  return (
    <div className="text-black dark:text-neutral-400">
      {/* categories */}
      <div className="bg-neutral-100 dark:bg-slate-800  pt-60 pb-12 px-10 text-center">
        <h1 className="text-lg font-bold mb-6">Featured Categories</h1>
        <div className=" flex flex-wrap justify-center items-center gap-10 ">
          <div className=" flex flex-wrap justify-center items-center gap-10 ">
            <button className=" text-md hover:text-neutral-50 hover:bg-black border border-black dark:hover:bg-slate-800 dark:border-neutral-400  py-2 px-6 duration-300 rounded" onClick={resetPosts}>
              All
            </button>
            {categories?.map((c, i) => (
              <button key={i} className=" text-md hover:text-neutral-50 hover:bg-black dark:hover:bg-slate-800 border border-black dark:border-neutral-400 py-2 px-6 duration-300 rounded" onClick={() => filterPostsByCategory(c.category)}>
                {c.category}
              </button>
            ))}
          </div>
        </div>
      </div>

      <Container>
        <div className=" pt-10 pb-10  md:px-10 xs:px-2">
          {/* featured post */}
          <div className="my-10 py-2 border-b border-neutral-300">
            <h4 className="text-lg font-semibold">Post of the day</h4>
          </div>
          <FeaturedPostCard post={filteredPosts[0]} />

          {/* posts */}
          <div className="mt-20 py-2 border-b border-neutral-300">
            <h4 className="text-lg font-semibold">Recent Posts</h4>
          </div>
          <div ref={ref} className="w-full xs:flex xs:flex-col md:grid md:grid-cols-3 justify-between gap-6 my-10">
            {filteredPosts.map((p, i) => (
              <PostCard key={i} post={p} />
            ))}
          </div>

          {/* load more button */}
          <div className=" flex justify-center ">
            <button className="text-neutral-100 py-2 px-3 bg-slate-800 hover:bg-slate-500 transition-all duration-300 rounded shadow hover:shadow-md">Load More</button>
          </div>
        </div>
      </Container>
    </div>
  );
}
