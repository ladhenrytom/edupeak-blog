"use client";

import {Facebook, Instagram, Link, Place, Schedule, Twitter, VerifiedUser} from "@mui/icons-material";
import PostCard from "@/components/PostCard";
import {useRouter} from "next/navigation";
import {Container} from "@mui/material";
import BackButton from "./BackButton";

export default function Profile({userData, userPosts, userComments, userImage, id}) {
  const router = useRouter();

  function getYear(date) {
    const year = new Date(date).getFullYear();
    return year;
  }

  return (
    <div className="dark:bg-slate-800 dark:text-neutral-300">
      <Container className="py-6">
        <div className="mb-6">
          <BackButton />
        </div>
        <div className="flex flex-col p-6">
          <aside className="flex xs:flex-col md:flex-row justify-between md:items-start">
            <div className="mb-3 flex xs:flex-col md:flex-row md:items-center">
              <img alt="user image" src={id ? userData.image : userImage} className="xs:w-28 xs:h-28 md:w-36 md:h-36 object-cover mr-6 xs:mb-2 md:mb-0 rounded-md shadow-md" />
              <div className=" space-y-2">
                <h1 className="font-semibold xs:text-2xl md:text-4xl mb-2">{userData.username}</h1>
                <span className="xs:flex-col md:flex-row flex  text-neutral-500 xs:text-xs md:text-sm xs:mb-0 md:mb-2">
                  <p className=" xs:mb-2 md:mb-0 xs:mr-0 md:mr-3 flex items-center">
                    <VerifiedUser fontSize="small" className="mr-1" />
                    Member since {getYear(userData.createdAt)}.
                  </p>
                  {id && (
                    <p className=" flex items-center xs:mb-2 md:mb-0 ">
                      <Schedule fontSize="small" className="mr-1" />
                      Last seen 3 years ago
                    </p>
                  )}
                </span>

                <span className="xs:flex-col md:flex-row flex  text-neutral-500 xs:text-xs md:text-sm">
                  {userData.website && (
                    <p className="flex items-center xs:mb-2 md:mb-0 xs:mr-0 md:mr-3 cursor-pointer">
                      <Link fontSize="small" className="mr-1" />
                      {userData.website}
                    </p>
                  )}
                  {userData.location && (
                    <p className=" flex items-center xs:mb-2 md:mb-0">
                      <Place fontSize="small" className="mr-1" />
                      {userData.location}
                    </p>
                  )}
                </span>
                <span className="xs:flex-col md:flex-row flex  text-neutral-500 xs:text-xs md:text-sm">
                  {userData.twitter && (
                    <p className="flex items-center xs:mb-2 md:mb-0 xs:mr-0 md:mr-3 cursor-pointer">
                      <Twitter fontSize="small" className="mr-1 text-blue-400" />
                      {userData.twitter}
                    </p>
                  )}
                  {userData.facebook && (
                    <p className=" flex items-center xs:mb-2 md:mb-0">
                      <Facebook fontSize="small" className="mr-1 text-blue-700" />
                      {userData.facebook}
                    </p>
                  )}
                </span>
                <span className="xs:flex-col md:flex-row flex  text-neutral-500 xs:text-xs md:text-sm">
                  {userData.instagram && (
                    <p className="flex items-center xs:mb-2 md:mb-0 xs:mr-0 md:mr-3 cursor-pointer">
                      <Instagram fontSize="small" className="mr-1 text-orange-400" />
                      {userData.instagram}
                    </p>
                  )}
                </span>
              </div>
            </div>
            {!id && (
              <button className="text-neutral-100 bg-orange-500 hover:bg-orange-700 py-2 px-3 xs:mb-3 md:mb-0 rounded shadow" onClick={() => router.push("/settings/profile")}>
                Edit profile
              </button>
            )}
          </aside>

          <aside className="flex xs:flex-col md:flex-row justify-between">
            <div className="xs:w-full md:w-3/12 xs:mb-6 md:mb-0">
              <h4 className=" mb-3">Stats</h4>
              <div className="border border-neutral-200 rounded grid grid-cols-2 gap-3 p-3">
                <div>
                  <h6 className="text-lg font-semibold mb-1">{userPosts?.length}</h6>
                  <p className="font-light text-sm">post{userPosts?.length > 1 && "s"}</p>
                </div>
                <div>
                  <h6 className="text-lg font-semibold mb-1">19</h6>
                  <p className="font-light text-sm">reputation</p>
                </div>
                <div>
                  <h6 className="text-lg font-semibold mb-1">{userData.favoritedPosts?.length}</h6>
                  <p className="font-light text-sm">Liked Posts</p>
                </div>
                <div>
                  <h6 className="text-lg font-semibold mb-1">{userComments.length}</h6>
                  <p className="font-light text-sm">comments</p>
                </div>
              </div>
            </div>
            <div className="xs:w-full md:w-8/12 space-y-6">
              <div className="mb-6">
                <h4 className=" mb-3">About</h4>
                <p className="text-sm font-light">{userData.about}</p>
              </div>
              <div>
                <h4 className=" mb-3">Top Posts</h4>
                <div className="xs:flex xs:flex-col md:grid md:grid-cols-2 gap-6 xs:space-y-6 md:space-y-0">
                  {userPosts.map(p => (
                    <PostCard key={p._id} post={p} />
                  ))}
                </div>
              </div>
              <div>
                <h4 className=" mb-3">Liked Posts</h4>
                <div className="xs:flex xs:flex-col md:grid md:grid-cols-2 gap-6">
                  {userData.favoritedPosts?.map(p => (
                    <PostCard key={p._id} post={p} />
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </div>
  );
}
