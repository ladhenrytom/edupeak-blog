import {connectToDB} from "@/utils/database";
import {Knock} from "@knocklabs/node";
import User from "@/models/user";

const knock = new Knock(process.env.KNOCK_SECRET_API_KEY);

export const POST = async request => {
  const {id} = await request.json();
  try {
    let identifiedUser = await knock.users.get(id);
    if (!identifiedUser) {
      await connectToDB();
      const userToIdentify = await User.findById(id);
      identifiedUser = await knock.users.identify(id, {name: userToIdentify.username});
    }
    return new Response(JSON.stringify(identifiedUser), {status: 200});
  } catch (error) {
    return new Response(JSON.stringify(error.message), {status: 500});
  }
};
