"use client";

import MyEditor from "@/components/MyEditor";
import {useSession} from "next-auth/react";
import {GetFunctionsContext} from "@/components/FunctionsProvider";
import {useContext, useState} from "react";

export default function CreateComment({postId, setDisplayedComments}) {
  const {data: session} = useSession();
  const {giveFeedback, openSigninModal} = useContext(GetFunctionsContext);
  const [commentContent, setCommentContent] = useState("");

  async function createComment() {
    if (!session?.user.id) {
      openSigninModal();
    } else {
      if (!commentContent?.length > 0) {
        alert("Comment field cannot be empty");
      } else {
        // execute create comment
        const res = await fetch(`/api/posts/${postId}/comments`, {
          method: "POST",
          body: JSON.stringify({creator: session?.user.id, content: commentContent}),
        });
        if (res.ok) {
          const {comments, newCommentId} = await res.json();
          console.log(newCommentId);
          setDisplayedComments(comments);
          giveFeedback("Your comment was successfully added!", "success");
          setCommentContent("");
          //execute notification
          const notifRes = await fetch("/api/notifications/notify", {
            method: "POST",
            body: JSON.stringify({
              actor: session?.user,
              postId,
              newCommentId,
              workflow: "new-comment",
            }),
          });
          if (notifRes.ok) {
            giveFeedback("Notified!", "success");
          } else {
            const data = await notifRes.json();
            giveFeedback("Not Notified!", "error");
            alert(data);
          }
        } else {
          giveFeedback("Something bad happened", "error");
        }
      }
    }
  }

  return (
    <div className="flex flex-col space-y-6">
      <h4 className=" ">Drop a comment about this post</h4>
      <MyEditor content={commentContent} setContent={setCommentContent} disabled={!session?.user.id} />
      <button className="text-neutral-100 text-sm bg-orange-500 mt-3 py-2 px-3 rounded self-start shadow" onClick={createComment}>
        {session?.user.id ? "Add Comment" : "Signin to comment"}
      </button>
    </div>
  );
}
