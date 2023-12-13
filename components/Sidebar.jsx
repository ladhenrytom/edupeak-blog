"use client";
import {usePathname} from "next/navigation";

import {AccountBox, Campaign, PersonOutline} from "@mui/icons-material";
import Link from "next/link";

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <div className="flex flex-col py-6 ">
      {links.map((l, i) => (
        <Link
          key={i}
          href={`/settings/${l.target}`}
          className={`${pathname === `/settings/${l.target}` ? "bg-slate-800 text-neutral-100 font-bold hover:bg-slate-800" : "text-neutral-700 font-light hover:bg-slate-200"} flex items-center py-3 px-6  hover:font-bold  transition-all`}
        >
          {l.icon}
          <h6 className="ml-2">{l.link}</h6>
        </Link>
      ))}
    </div>
  );
}

const links = [
  {link: "Profile", icon: <PersonOutline />, target: "profile"},
  {link: "Account", icon: <AccountBox />, target: "account"},
  {link: "Notifications", icon: <Campaign />, target: "notifications"},
];
