import {FileUpload} from "@mui/icons-material";

export default function ImageUploader({selectedImage, handleImageChange}) {
  return (
    <div className="w-full">
      <div className="flex flex-col bg-white rounded-md shadow-md px-2 pt-2 pb-3">
        <img alt="" src={selectedImage} className=" w-full mb-6 rounded-md" />
        <label htmlFor="img" className="flex items-center text-neutral-50 bg-orange-500 px-3 py-2 self-center rounded-md shadow-md cursor-pointer">
          Select Image <FileUpload className="ml-3" />
        </label>
        <input type="file" accept="image/*" id="img" name="image" className="hidden" onChange={handleImageChange} />
      </div>
    </div>
  );
}
