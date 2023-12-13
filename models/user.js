import {Schema, model, models} from "mongoose";

const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: [true, "Email already exists!"],
      required: [true, "Email is required!"],
    },
    username: {
      type: String,
      unique: [true, "Username already exists!"],
      match: [/^(?=.{3,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 3-20 alphanumeric letters and be unique!"],
    },
    about: {
      type: String,
    },
    image: String,
    website: String,
    location: String,
    twitter: String,
    instagram: String,
    facebook: String,
    favoritedPosts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
  },
  {timestamps: true}
);

const User = models.User || model("User", UserSchema);

export default User;
