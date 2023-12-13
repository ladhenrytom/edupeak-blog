import {OpenInNew} from "@mui/icons-material";
import Link from "next/link";

export default function AuthorCard({authorInfo}) {
  const {username, _id, image} = authorInfo;
  return (
    <div className="bg-neutral-100 dark:text-black rounded-lg shadow-sm">
      <div className=" flex items-center p-6 border-b border-neutral-300">
        <img alt="Author's img" src={image} className="xs:w-20 xs:h-20 md:w-28 md:h-28 mr-6 object-cover rounded-full" />
        <h6 className=" text-lg font-bold">
          {username}
          <br />
          <small className="font-light">Author</small>
        </h6>
      </div>

      <div className="flex justify-center p-6">
        <Link href={`/profile/${_id}`} className="text-sm  flex items-center hover:text-orange-500 duration-300">
          <OpenInNew fontSize="small" className="mr-2" />
          View all posts
        </Link>
      </div>
    </div>
  );
}
