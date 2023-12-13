export default function SkewedDiv() {
  return (
    <div className="relative w-full h-72 text-neutral-50 bg-slate-800 flex justify-center items-center">
      <img alt="background" src="/logo-darkBg.png" className="absolute xs:hidden md:block left-0 right-0 mx-auto opacity-5 -rotate-12 z-0" />
      <div className=" text-center">
        <h1 className="xs:text-3xl md:text-5xl  font-sans">
          EduPeak
          <b className=" text-orange-500 ml-6">Blog</b>
        </h1>
        <h6 className="mt-6 text-neutral-400">Stay updated with events, promotional sales. Get the latest information on courses.</h6>
      </div>
      <svg className="absolute top-full w-full h-full fill-slate-800 rotate-180 z-10">
        <path d="M0,32L48,80C96,128,192,224,288,224C384,224,480,128,576,90.7C672,53,768,75,864,96C960,117,1056,139,1152,149.3C1248,160,1344,160,1392,160L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
      </svg>
    </div>
  );
}
