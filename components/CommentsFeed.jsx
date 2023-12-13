"use client";

import {KeyboardArrowDown, KeyboardArrowUp} from "@mui/icons-material";
import {IconButton} from "@mui/material";
import {useState} from "react";
import CreateComment from "@/components/CreateComment";
import Comment from "@/components/Comment";

export default function CommentsFeed({postId, comments}) {
  const [showComments, setShowComments] = useState(false);
  const [displayedComments, setDisplayedComments] = useState(comments);

  return (
    <div className="relative flex flex-col">
      {/* create comment section */}
      <div className="mt-3">
        <CreateComment postId={postId} setDisplayedComments={setDisplayedComments} />
      </div>

      <div className="flex items-center mt-12">
        <h4 className="font-mono text-base mr-6">Comments ({displayedComments.length})</h4>
        {/* <IconButton className="text-black dark:text-neutral-400  p-0 hover:bg-transparent" onClick={() => setShowComments(prev => !prev)}>
          {showComments ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
        </IconButton> */}
      </div>

      {/* {showComments && ( */}
      <div className="flex flex-col duration-100 ease-in mt-6">
        {displayedComments.map((c, i) => (
          <Comment key={i} comment={c} />
        ))}
      </div>
      {/* )} */}
    </div>
  );
}
