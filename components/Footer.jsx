import Link from "next/link";

const links = ["Home", "Courses", "Help Desk", "Contact"];

export default function Footer() {
  return (
    <div className=" dark:bg-slate-700 border-t border-neutral-200 dark:border-slate-800 p-10">
      <div className="md:flex justify-between text-center ">
        <h4 className="text-2xl dark:text-neutral-100">
          <b>EduPeak</b>
        </h4>
        <div className="flex xs:flex-col md:flex-row items-center">
          {links.map((l, i) => (
            <Link key={i} href={`#${l}`} className="text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-50 flex md:mr-6 xs:my-3 md:my-0 duration-300">
              {l}
            </Link>
          ))}
        </div>
      </div>
      <div></div>
    </div>
  );
}
