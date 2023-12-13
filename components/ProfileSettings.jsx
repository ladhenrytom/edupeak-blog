"use client";

import ImageUploader from "@/components/ImageUploader";
import {useContext, useState} from "react";
import {useSession} from "next-auth/react";
import {useUploadThing} from "@/utils/uploadthing";
import {useRouter} from "next/navigation";
import {GetFunctionsContext} from "@/components/FunctionsProvider";

export default function ProfileSettingsForm({userData}) {
  const router = useRouter();
  const {data: session} = useSession();
  const {giveFeedback} = useContext(GetFunctionsContext);

  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState(userData);
  const [imageToUpload, setImageToUpload] = useState(null);

  let isChanged = formData == userData;

  const handleChange = e => {
    const {name, value} = e.target;
    setFormData(prev => ({
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
      setFormData(prev => ({
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

  const updateProfile = async imgUrl => {
    const response = await fetch(`/api/users/${session?.user.id}`, {
      method: "PATCH",
      body: JSON.stringify({
        username: formData.username,
        about: formData.about,
        image: imgUrl ?? "",
        website: formData.website,
        twitter: formData.twitter,
        instagram: formData.instagram,
        facebook: formData.facebook,
      }),
    });
    if (response.ok) {
      giveFeedback("Profile updated successfully", "success");
      router.replace("/profile");
    } else {
      const data = await response.json();
      alert(data.message);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsProcessing(true);
    if (!imageToUpload) {
      updateProfile();
    } else {
      const resArr = await startUpload([imageToUpload]);
      const {url} = resArr[0];
      updateProfile(url);
    }
    setIsProcessing(false);
  };

  return (
    <form className="py-6 px-3 flex flex-col" onSubmit={handleSubmit}>
      <section className="xs:p-3 md:p-6 mb-6 bg-white md:rounded-md shadow-md">
        <h4 className="mb-6">User</h4>
        <div className="flex flex-col mb-3">
          <label htmlFor="email">Email</label>
          <input disabled id="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div className="flex flex-col mb-3">
          <label htmlFor="username">Username</label>
          <input id="username" name="username" value={formData.username} onChange={handleChange} />
        </div>
        <div className="flex flex-col mb-3">
          <label htmlFor="about">About</label>
          <textarea id="about" name="about" value={formData.about} maxLength={500} rows={5} onChange={handleChange} />
          <p className="self-end text-sm font-light">{formData?.about?.length}/500</p>
        </div>
      </section>

      {/* Photo */}
      <section className="xs:p-3 md:p-6 mb-6 bg-white md:rounded-md shadow-md">
        <h4 className="mb-6">Photo</h4>
        <ImageUploader selectedImage={formData.image} handleImageChange={handleImageChange} />
      </section>

      {/* social and external */}
      <section className="xs:p-3 md:p-6 mb-6 bg-white md:rounded-md shadow-md">
        <h4 className="mb-6">Basic</h4>
        <div className="flex flex-col mb-3">
          <label htmlFor="location">Location</label>
          <input id="location" name="location" value={formData.location} onChange={handleChange} />
        </div>
        <div className="flex flex-col mb-3">
          <label htmlFor="website">Website Url</label>
          <input id="website" name="website" value={formData.website} onChange={handleChange} />
        </div>
        <div className="flex flex-col mb-3">
          <label htmlFor="twitter">Twitter Handle</label>
          <input id="twitter" name="twitter" value={formData.twitter} onChange={handleChange} />
        </div>
        <div className="flex flex-col mb-3">
          <label htmlFor="instagram">Instagram Handle</label>
          <input id="instagram" name="instagram" value={formData.instagram} onChange={handleChange} />
        </div>
        <div className="flex flex-col mb-3">
          <label htmlFor="facebook">Facebook Handle</label>
          <input id="facebook" name="facebook" value={formData.facebook} onChange={handleChange} />
        </div>
      </section>

      {/* buttons */}
      <button
        type="submit"
        disabled={isProcessing || isChanged}
        className={`${isProcessing ? "bg-slate-400 cursor-wait" : "bg-slate-800 shadow shadow-slate-800 hover:bg-black"}  px-6 py-2 text-neutral-100 md:text-xl self-center rounded transition-all   ease-in duration-100 uppercase `}
      >
        Save Changes
      </button>
    </form>
  );
}
