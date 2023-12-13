"use client";

import {useState} from "react";

export default function AccountSettings() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({curr_pass: "", new_pass: "", new_pass_copy: ""});

  const handleChange = e => {
    const {name, value} = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    setIsProcessing(true);
  };

  return (
    <div>
      {/* rest password */}
      <form className="py-6" onSubmit={handleSubmit}>
        <section className="xs:p-3 md:p-6 mb-6 flex flex-col bg-white md:rounded-md shadow-md">
          <h4 className="mb-6">Account</h4>
          <p className="mb-6 text-sm">
            If your account was created using social account authentication, you may prefer to add an email log in. If you signed up with a social media account, please reset the password for your primary email address (tomiwasemilore@gmail.com) in
            order to enable this. Please note that email login is in addition to social login rather than a replacement for it, so your authenticated social account will continue to be linked to your account.
          </p>
          <div className="flex flex-col mb-3">
            <label htmlFor="curr_pass">Current Password</label>
            <input required id="curr_pass" name="curr_pass" value={formData.curr_Pass} onChange={handleChange} />
          </div>
          <div className="flex flex-col mb-3">
            <label htmlFor="new_pass">New Password</label>
            <input required id="new_pass" name="new_pass" value={formData.new_Pass} onChange={handleChange} />
          </div>
          <div className="flex flex-col mb-3">
            <label htmlFor="new_pass_copy">Re-enter New Password</label>
            <input id="new_pass_copy" name="new_pass_copy" value={formData.new_pass_copy} onChange={handleChange} />
          </div>

          {/* button */}
          <button
            type="submit"
            disabled={isProcessing}
            className={`${isProcessing ? "bg-slate-400" : "bg-slate-800 shadow shadow-slate-800 hover:bg-black"}  px-6 py-2 text-neutral-100 md:text-xl self-center rounded transition-all   ease-in duration-100 uppercase `}
          >
            Reset Password
          </button>
        </section>
      </form>

      {/* delete account */}
      <section className="xs:p-3 md:p-6 mb-6 flex flex-col bg-white md:rounded-md shadow-md">
        <h4 className="mb-6 text-orange-700">Danger Zone</h4>
        <div className="mb-6">
          <h6 className="mb-3">Delete Account</h6>
          <p className=" text-sm ">
            Deleting your account will: Delete your profile, along with your authentication associations. This does not include applications permissions. You will have to remove them yourself: GitHub profile settings Delete any and all content you
            have, such as articles, comments, or your reading list. Allow your username to become available to anyone.
          </p>
        </div>

        {/* button */}
        <button
          type="submit"
          disabled={isProcessing}
          className={`${isProcessing ? "bg-orange-300" : "bg-orange-700 shadow shadow-orange-800 hover:bg-orange-800"}  px-6 py-2 text-neutral-100 md:text-xl self-center rounded transition-all   ease-in duration-100 uppercase `}
        >
          Delete Account
        </button>
      </section>
    </div>
  );
}
