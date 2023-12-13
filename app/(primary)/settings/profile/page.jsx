import {authConfig} from "@/auth.config";
import {getServerSession} from "next-auth";
import ProfileSettingsForm from "@/components/ProfileSettings";
import {getUserDataById} from "@/utils/functions";

export default async function ProfileSettings() {
  const session = await getServerSession(authConfig);
  const id = session?.user.id;
  const userData = await getUserDataById(id);
  return (
    <div>
      {/* personal data */}
      <ProfileSettingsForm userData={userData} />
    </div>
  );
}
