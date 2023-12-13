import PostForm from "@/components/PostForm";
import {getOnePostById} from "@/utils/functions";

const UpdatePost = async ({params}) => {
  const id = params.id;

  const post = await getOnePostById(id);

  return (
    <div className="xs:px-2 xs:py-6 md:p-10 bg-neutral-100">
      <PostForm post={post} type="edit" />
    </div>
  );
};

export default UpdatePost;
