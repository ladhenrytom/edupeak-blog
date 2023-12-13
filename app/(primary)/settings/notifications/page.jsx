"use client";

import {useState} from "react";

export default function NotificationsSettings() {
  const initalCheckboxes = options.map(o => o.status);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState(initalCheckboxes);

  const handleChange = i => {
    const updatedCheckedState = formData.map((item, index) => (index === i ? !item : item));
    setFormData(updatedCheckedState);
  };

  const handleSubmit = e => {
    e.preventDefault();
    setIsProcessing(true);
  };

  return (
    <div>
      {/* rest password */}
      <form className="py-6 flex flex-col" onSubmit={handleSubmit}>
        <section className="xs:p-3 md:p-6 mb-6 flex flex-col items-start bg-white md:rounded-md shadow-md">
          <h4 className="mb-6">Email Notifications</h4>
          {options.map((o, i) => (
            <label key={i} htmlFor={o.name} className="flex mb-4 cursor-pointer">
              <input id={o.name} type="checkbox" name={o.name} checked={formData[i]} onChange={() => handleChange(i)} className="w-5 h-5 p-0 m-0 mr-3 accent-orange-600" />
              {o.label}
            </label>
          ))}
        </section>
        {/* button */}
        <button
          type="submit"
          disabled={isProcessing}
          className={`${isProcessing ? "bg-slate-400" : "bg-slate-700 shadow shadow-slate-800 hover:bg-black"}  px-6 py-2 text-neutral-100 md:text-xl self-center rounded transition-all   ease-in duration-100 uppercase `}
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

const options = [
  {
    name: "weekly_emails",
    label: "Send me weekly newsletter emails",
    status: false,
  },
  {
    name: "new_follower",
    label: "Send me an email when someone new follows me",
    status: true,
  },
  {
    name: "new_mention",
    label: "Send me an email when someone mentions me",
    status: true,
  },
];
