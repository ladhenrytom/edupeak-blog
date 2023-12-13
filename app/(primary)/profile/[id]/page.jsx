import Profile from "@/components/Profile";
import {getUserCommentsById, getUserDataById, getUserPostsById} from "@/utils/functions";

const UserProfile = async ({params}) => {
  const id = params.id;
  const userData = await getUserDataById(id);
  const userPosts = await getUserPostsById(id);
  const userComments = await getUserCommentsById(id);
  return (
    <div>
      <Profile userData={userData} userPosts={userPosts} userComments={userComments} id={id} />
    </div>
  );
};

export default UserProfile;
