import {authConfig} from "@/auth.config";
import {getServerSession} from "next-auth";
import Profile from "@/components/Profile";
import {getUserCommentsById, getUserDataById, getUserPostsById} from "@/utils/functions";

export default async function MyProfile() {
  const session = await getServerSession(authConfig);
  const id = session?.user.id;
  const userData = await getUserDataById(id);
  const userPosts = await getUserPostsById(id);
  const userComments = await getUserCommentsById(id);

  return (
    <div>
      <Profile userData={userData} userPosts={userPosts} userComments={userComments} userImage={session?.user.image} />
    </div>
  );
}
