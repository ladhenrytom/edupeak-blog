import {connectToDB} from "@/utils/database";

import User from "@/models/user";

export const PATCH = async (request, {params}) => {
  const {username, about, image, website, twitter, instagram, facebook} = await request.json();

  try {
    await connectToDB();

    const existingUser = await User.findById(params.id);

    if (!existingUser) return new Response("User not found", {status: 404});

    existingUser.username = username;
    existingUser.about = about;
    existingUser.image = image?.length > 0 ? image : existingUser.image;
    existingUser.website = website;
    existingUser.twitter = twitter;
    existingUser.instagram = instagram;
    existingUser.facebook = facebook;

    await existingUser.save();

    return new Response("You have successfully updated your profile", {status: 200});
  } catch (error) {
    return new Response(JSON.stringify(error), {status: 500});
  }
};
