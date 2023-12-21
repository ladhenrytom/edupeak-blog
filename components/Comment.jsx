"use client";

import {Avatar, IconButton, Tooltip} from "@mui/material";
import {sanitize} from "isomorphic-dompurify";
import {useContext, useEffect, useState} from "react";
import {GetFunctionsContext} from "./FunctionsProvider";
import {Reply, KeyboardArrowDown, KeyboardArrowUp} from "@mui/icons-material";
import Link from "next/link";
import {useSession} from "next-auth/react";

export default function Comment({comment}) {
  const {data: session} = useSession();
  const {creator, content} = comment;
  const {getDate, giveFeedback, openSigninModal} = useContext(GetFunctionsContext);
  const {day, month, year} = getDate(comment.createdAt);
  const [replyContent, setReplyContent] = useState("");
  const [openReplyBox, setOpenReplyBox] = useState(false);
  const [replies, setReplies] = useState([]);
  const [showReplies, setShowReplies] = useState(false);

  function createMarkup(html) {
    const clean = sanitize(html);
    return {
      __html: clean,
    };
  }

  function openReply() {
    session?.user.id ? setOpenReplyBox(prev => !prev) : openSigninModal();
  }

  async function replyComment() {
    const res = await fetch(`/api/comments/${comment._id}/replies`, {
      method: "POST",
      body: JSON.stringify({creator: session?.user.id, content: replyContent}),
    });
    if (res.ok) {
      const data = await res.json();
      setReplies(data);
      setOpenReplyBox(false);
      setReplyContent("");
      giveFeedback("You replied", "success");
    } else {
      giveFeedback("Action not completed", "error");
    }
  }

  async function getReplies() {
    const res = await fetch(`/api/comments/${comment?._id}/replies`);
    if (res.ok) {
      const data = await res.json();
      setReplies(data);
    } else {
      giveFeedback("Could not load replies", "error");
    }
  }

  useEffect(() => {
    comment && getReplies();
  }, [comment]);

  return (
    <span id={comment._id} className={" flex justify-between mb-6 p-2 border rounded-md scroll-mt-40"}>
      <Avatar alt={creator?.username} src={creator?.image} className="w-10 h-10 mr-2 object-cover" />
      <div className="w-11/12 flex flex-col space-y-2">
        <span className="flex items-center">
          <p className="font-mono text-xs text-neutral-400">{`${month} ${day}, ${year}`} - </p>
          <Link href={`/profile/${creator?._id}`} className="text-xs ml-2">
            @{creator?.username}
          </Link>
        </span>
        <div className=" xs:text-xs md:text-sm bg-neutral-100 dark:bg-slate-700 max-h-60 p-2 rounded-md overflow-auto" dangerouslySetInnerHTML={createMarkup(content)}></div>
        <div className="self-end">
          <Tooltip title="Reply to comment">
            <IconButton onClick={openReply} className="dark:text-neutral-400">
              <Reply />
            </IconButton>
          </Tooltip>
        </div>

        {/* reply box */}
        {openReplyBox && (
          <div className="flex flex-col py-3">
            <textarea rows={4} value={replyContent} onChange={e => setReplyContent(e.target.value)} className=" border border-neutral-300 rounded-md outline-none" />
            <button className="bg-orange-400 py-2 px-3 text-neutral-100 text-xs font-normal self-end rounded-lg shadow-sm" onClick={replyComment}>
              Reply
            </button>
          </div>
        )}
        <div className=" flex mb-2 pb-2 border-b">
          <p className=" text-sm mr-3">Replies</p>
          <IconButton className="text-black dark:text-neutral-400 p-0 hover:bg-transparent" sx={{p: 0}} onClick={() => setShowReplies(prev => !prev)}>
            {showReplies ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </div>
        {showReplies && (
          <div className="flex flex-col space-y-2 h-fit overflow-auto">
            {replies.map((r, i) => (
              <Comment comment={r} key={i} />
            ))}
          </div>
        )}
      </div>
    </span>
  );
}

{
  /* <span key={i} className="flex justify-between mb-6">
                <Avatar alt={r.creator.username} src={r.creator.image} className="w-10 h-10 mr-2 object-cover" />
                <div className="w-11/12 flex flex-col space-y-2">
                  <span className="flex items-center">
                    <p className="font-mono text-xs text-neutral-400">{`${getDate(r.createdAt).month} ${getDate(r.createdAt).day}, ${getDate(r.createdAt).year}`} - </p>
                    <Link href={`/profile/${r.creator._id}`} className="text-xs ml-2">
                      @{r.creator.username}
                    </Link>
                  </span>
                  <p className=" xs:text-xs md:text-sm bg-neutral-100 dark:bg-slate-700 max-h-60 p-2 rounded-md overflow-auto">{r.content}</p>
                </div>
              </span> */
}
