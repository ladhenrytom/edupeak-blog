import PostForm from "@/components/PostForm";

export default function CreatePost() {
  return (
    <div className="xs:px-2 xs:py-6 md:p-10 bg-neutral-100">
      <PostForm type="create" />
    </div>
  );
}
