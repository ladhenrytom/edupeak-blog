"use client";

import {Editor} from "@tinymce/tinymce-react";
import {useEffect} from "react";

export default function MyEditor({id, content, setContent, initialValue, disabled}) {
  useEffect(() => setContent(initialValue ?? content), [initialValue]);

  return (
    <>
      <Editor
        id={id}
        apiKey="bhacd51d3crfwxoo7g06ycqcr9nel8o85zgmq37wctrwkbti"
        init={{
          plugins: " anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount",
          toolbar: "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
          tinycomments_mode: "embedded",
          tinycomments_author: "Author name",
          mergetags_list: [
            {value: "First.Name", title: "First Name"},
            {value: "Email", title: "Email"},
          ],
          skin: typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches ? "oxide-dark" : "oxide",
          content_css: typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "default",
          // ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
        }}
        value={content}
        onEditorChange={(newValue, editor) => setContent(newValue)}
        initialValue={initialValue}
        disabled={disabled}
      />
    </>
  );
}
