"use client";

import {ArrowRightAlt} from "@mui/icons-material";
import {useRouter} from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button className="flex items-center text-orange-500 xs:ml-2 md:ml-10 hover:font-black" onClick={() => router.back()}>
      <ArrowRightAlt className="mr-2 rotate-180" /> back
    </button>
  );
}
