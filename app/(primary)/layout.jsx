import {Poppins} from "next/font/google";
import "@/styles/globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Provider from "@/components/SessionProvider";
import FunctionsProvider from "@/components/FunctionsProvider";

const poppins = Poppins({subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "600", "700", "900"]});

export const metadata = {
  title: "EduPeak Blog",
  description: "Create and share posts.",
};

export default function RootLayout({children}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Provider>
          <FunctionsProvider>
            <main className="w-screen flex flex-col min-h-screen">
              <Nav />
              <div className="mb-auto">{children}</div>
              <Footer />
            </main>
          </FunctionsProvider>
        </Provider>
      </body>
    </html>
  );
}

//  <NextSeo
//    title="React in-app notifications example | Powered by Knock"
//    description="In-app notification feed and toasts, powered by Knock"
//    openGraph={{
//      title: "React in-app notifications example | Powered by Knock",
//      description: "In-app notification feed and toasts, powered by Knock",
//      url: "https://knock-in-app-notifications-react.vercel.app",
//    }}
//    twitter={{
//      handle: "@knocklabs",
//      site: "@knocklabs",
//      cardType: "summary_large_image",
//    }}
//  />;
