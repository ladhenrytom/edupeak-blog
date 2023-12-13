import {Poppins} from "next/font/google";
import "@/styles/globals.css";
import Link from "next/link";

const poppins = Poppins({subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "600", "700", "900"]});

export const metadata = {
  title: "EduPeak Blog",
  description: "Create and share posts.",
};

export default function RootLayout({children}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <main className="w-screen min-h-screen flex">
          <div className="relative w-1/2 xs:hidden md:flex bg-neutral-100 dark:bg-slate-700 ">
            <div className="w-1/2 bg-slate-800"></div>
            <div className="w-1/2 bg-slate-800 origin-top-left -skew-x-3"></div>
            <div className="absolute top-0 bottom-0 right-0 left-0 flex justify-center items-center">
              <Link href="/">
                <h1 className=" xs:text-3xl md:text-5xl text-neutral-100 font-sans">
                  EduPeak
                  <b className=" text-orange-500 ml-6">Blog</b>
                </h1>
              </Link>
            </div>
          </div>
          <div className="xs:w-full md:w-1/2 flex justify-center items-center py-2 px-2 xs:bg-slate-800 md:bg-neutral-100 md:dark:bg-slate-700">{children}</div>
        </main>
      </body>
    </html>
  );
}
