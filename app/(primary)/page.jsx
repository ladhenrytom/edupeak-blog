import Feed from "@/components/PostsFeed";
import SkewedDiv from "@/components/SkewedDiv";
import {getAllPosts, getCategories} from "@/utils/functions";

export default async function Home() {
  const allcategories = await getCategories();
  const allPosts = await getAllPosts();

  return (
    <div className="bg-neutral-50 dark:bg-slate-800 ">
      {/* skewed div */}
      <SkewedDiv />

      {/* posts feed */}
      <Feed posts={allPosts} categories={allcategories} />
    </div>
  );
}
