import SigninBtn from "@/components/SigninBtn";
import {getProviders} from "next-auth/react";

export default async function SignupPage() {
  const providers = await getProviders();
  return (
    <div className="w-full flex flex-col xs:px-6 lg:px-36 xs:text-neutral-100 md:text-black md:dark:text-white">
      <h1 className="xs:flex md:hidden self-center items-center xs:text-3xl md:text-5xl  font-sans mb-12">
        EduPeak
        <b className=" text-orange-500 ml-3">Blog</b>
      </h1>
      <h1 className=" self-center">Join Us</h1>
      <div className="self-center">
        <SigninBtn type="signup" providers={providers} />
      </div>
    </div>
  );
}
