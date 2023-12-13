import {Schedule} from "@mui/icons-material";
import {Tooltip} from "@mui/material";
import Link from "next/link";
import {GetFunctionsContext} from "@/components/FunctionsProvider";
import {useContext} from "react";

export default function PostCard({post}) {
  const {_id, title, category, author, img, readTime, createdAt} = post;
  const {getDate} = useContext(GetFunctionsContext);
  const {day, month, year} = getDate(createdAt);

  return (
    <Link href={`/posts/${_id}`} className="w-full min-h-fit hover:scale-105 duration-300 cursor-pointer">
      <img alt="post img" src={img} loading="lazy" className="w-full h-3/5 object-cover" />
      <div className="w-full h-2/5 flex flex-col items-start xs:my-1 md:my-3">
        <p className="text-xs font-extralight w-full overflow-hidden text-ellipsis whitespace-nowrap uppercase">{category}</p>
        <Tooltip title={title}>
          <h4 className="font-semibold max-w-full whitespace-nowrap overflow-x-hidden text-ellipsis">{title}</h4>
        </Tooltip>
        <span className="flex items-center text-xs my-1 ">by {author.username}</span>
        <p className="xs:text-xs md:text-sm font-mono flex xs:flex-col md:flex-row md:items-center mb-2">
          <span className="flex items-center">
            <Schedule fontSize="inherit" className="mr-2" /> {`${month} ${day}, ${year}`}
          </span>{" "}
          <b className=" md:ml-2">- {readTime} mins read</b>
        </p>
      </div>
    </Link>
  );
}
