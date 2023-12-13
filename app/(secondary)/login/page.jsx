import SigninBtn from "@/components/SigninBtn";
import {getServerSession} from "next-auth";
import {getProviders} from "next-auth/react";

export default async function LoginPage() {
  const providers = await getProviders();
  const session = await getServerSession();
  return (
    <div className="w-full flex flex-col xs:px-6 lg:px-36 xs:text-neutral-100 md:text-black md:dark:text-white ">
      <h1 className="xs:flex md:hidden self-center items-center xs:text-3xl md:text-5xl  font-sans mb-12">
        EduPeak
        <b className=" text-orange-500 ml-3">Blog</b>
      </h1>
      <h1 className=" self-center">Welcome</h1>
      <div className="self-center">
        <SigninBtn providers={providers} />
      </div>
    </div>
  );
}
