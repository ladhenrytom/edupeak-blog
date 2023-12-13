"use client";

import {useRouter} from "next/navigation";
import {ArrowRightAlt, Save} from "@mui/icons-material";
import {CircularProgress, Container} from "@mui/material";
import MyEditor from "./MyEditor";
import ImageUploader from "./ImageUploader";
import {useContext, useState} from "react";
import {useSession} from "next-auth/react";
import {useUploadThing} from "@/utils/uploadthing";
import {GetFunctionsContext} from "./FunctionsProvider";

export default function PostForm({type, post}) {
  const router = useRouter();
  const {data: session} = useSession();
  const {giveFeedback} = useContext(GetFunctionsContext);
  const id = post?._id;
  const [postData, setPostData] = useState({title: post?.title ?? "", category: post?.category ?? "", image: post?.image ?? "", readTime: post?.readTime ?? 0});
  const [imageToUpload, setImageToUpload] = useState(null);
  const [content, setContent] = useState(post?.content ?? "");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleChange = e => {
    const {name, value} = e.target;
    setPostData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = event => {
    const image = event.target.files[0];
    if (image.size > 4000000) {
      alert("Image size must not exceed 4MB");
      return;
    } else {
      setPostData(prev => ({
        ...prev,
        image: URL.createObjectURL(image),
      }));
      setImageToUpload(image);
    }
  };

  const {startUpload, permittedFileInfo} = useUploadThing("imageUploader", {
    onUploadError: () => {
      alert("error occurred while uploading");
    },
  });

  async function createPost(e) {
    e.preventDefault();
    if (!postData.image) {
      alert("Please add an image to your post!");
      return;
    }
    if (!content.length > 0) {
      alert("Please add content to your post!");
      return;
    }
    setIsProcessing(true);
    const resArr = await startUpload([imageToUpload]);
    const {url} = resArr[0];
    const res = await fetch("/api/posts/new", {
      cache: "no-store",
      method: "POST",
      body: JSON.stringify({title: postData.title, author: session?.user.id, category: postData.category, image: url, readTime: postData.readTime, content: content}),
    });
    if (res.ok) {
      const {_id} = await res.json();
      setIsProcessing(false);
      giveFeedback("Post successfully created", "success");
      router.replace(`/posts/${_id}`);
    } else {
      setIsProcessing(false);
      giveFeedback("Could not create post, try again.", "error");
    }
  }

  async function updatePost(e) {
    e.preventDefault();
    setIsProcessing(true);
    const res = await fetch(`/api/posts/${id}`, {
      cache: "no-store",
      method: "PATCH",
      body: JSON.stringify({
        title: postData.title,
        category: postData.category,
        content: content,
        readTime: postData.readTime,
      }),
    });
    if (res.ok) {
      const {_id} = await res.json();
      setIsProcessing(false);
      giveFeedback("Post successfully edited", "success");
      router.replace(`/posts/${_id}`);
    } else {
      setIsProcessing(false);
      giveFeedback("Could not update post, try again.", "error");
    }
  }

  return (
    <Container className="bg-white p-6 rounded-md">
      {/* header */}
      <h1 className="xs:text-xl md:text-4xl font-semibold mb-10 capitalize">{type} Post</h1>

      {/* form */}
      <form onSubmit={type === "create" ? createPost : updatePost}>
        <div className="flex xs:flex-col md:flex-row justify-between">
          {/* left hand side */}
          <div className="xs:w-full md:w-7/12 flex flex-col xs:my-3 md:my-0">
            <label htmlFor="title">Title</label>
            <input required id="title" name="title" value={postData.title} placeholder="e.g My Title" className="mb-6" onChange={handleChange} />
            <label htmlFor="category">Category</label>
            <input required id="category" name="category" value={postData.category} placeholder="E.g Science, Business, e.t.c" className="mb-6" onChange={handleChange} />
            <label htmlFor="readTime">Read Time (mins)</label>
            <input required id="readTime" type="number" min={0} name="readTime" value={postData.readTime} placeholder="4, 5, e.t.c" className="mb-6" onChange={handleChange} />
            <label htmlFor="content">Content</label>
            <div className="mb-6">
              <MyEditor id="content" content={content} setContent={setContent} />
            </div>
          </div>

          {/* right hand side */}
          {!id && (
            <div className=" xs:w-full md:w-4/12 flex flex-col xs:my-3 md:my-0">
              <ImageUploader selectedImage={postData.image} handleImageChange={handleImageChange} />
            </div>
          )}
        </div>

        {/* buttons */}
        <div className="flex justify-center mt-12 mb-6">
          <button type="button" className="text-slate-800 md:text-lg text-bold flex items-center mr-6 rounded-md uppercase group py-2 px-3 focus:ring-2 focus:ring-slate-800" onClick={() => router.back()}>
            <ArrowRightAlt fontSize="large" className="mr-2 rotate-180 group-hover:-translate-x-1 group-hover:scale-105 transition-all duration-200 " />
            Cancel
          </button>
          <button type="submit" disabled={isProcessing} className="bg-slate-800 px-6 py-2 text-neutral-100 md:text-2xl text-bold flex items-center rounded hover:bg-black transition-all shadow  ease-in duration-100 uppercase shadow-slate-800">
            <span className="flex items-center">{isProcessing ? <CircularProgress size={25} className="text-white mr-2" /> : <Save className="mr-2" />}</span>
            {type === "create" ? "Post" : "Save"}
          </button>
        </div>
      </form>
    </Container>
  );
}

// style={{backgroundImage: "url(/tomiwa.jpg)"}}
