import {authConfig} from "@/auth.config";
import BackButton from "@/components/BackButton";
import PostView from "@/components/PostView";
import {getOnePostById, getRelatedPosts, getUserDataById} from "@/utils/functions";
import {getServerSession} from "next-auth";

export default async function ViewPost({params}) {
  const session = await getServerSession(authConfig);
  const {id} = params;
  const post = await getOnePostById(id);
  const relatedPosts = await getRelatedPosts(id);
  const user = await getUserDataById(session?.user.id);

  return (
    <div className="py-10 dark:bg-slate-800 dark:text-neutral-400">
      {/* go back btn */}
      <BackButton />
      {/* post details */}
      <PostView post={post} relatedPosts={relatedPosts} viewer={user} />
    </div>
  );
}
