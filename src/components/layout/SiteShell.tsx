import type { ReactNode } from "react";
import SmoothScroll from "./SmoothScroll";
import Preloader from "./Preloader";
import Cursor from "./Cursor";
import Navbar from "./Navbar";
import Footer from "./Footer";

/** Chrome shared by every page. The preloader only plays on the first page of a session. */
export default function SiteShell({ children }: { children: ReactNode }) {
  return (
    <>
      <SmoothScroll />
      <Preloader />
      <Cursor />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
