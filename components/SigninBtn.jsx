"use client";

import {signIn} from "next-auth/react";

export default function SigninBtn({type, providers}) {
  const url = typeof window !== "undefined" && new URLSearchParams(window.location.search).get("callbackUrl");
  return (
    <div className="py-3 space-y-3">
      {providers &&
        Object.values(providers).map(provider => (
          <button
            key={provider.name}
            className="self-center flex justify-center items-center text-sm font-normal md:text-neutral-700 md:dark:text-neutral-400 py-2 px-6 border border-neutral-400 hover:border-neutral-700 rounded-2xl"
            onClick={() => signIn(provider.id, {callbackUrl: url ?? ""})}
          >
            <img alt="" src={`/${provider.id}.png`} className="w-5 h-5 mr-3 object-cover" />
            Sign {type ? "up" : "in"} with {provider.name}
          </button>
        ))}
    </div>
  );
}
