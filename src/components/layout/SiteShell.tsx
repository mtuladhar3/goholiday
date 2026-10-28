import type { ReactNode } from "react";
import SmoothScroll from "./SmoothScroll";
import Cursor from "./Cursor";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollTop from "./ScrollTop";

/** Chrome shared by every page. */
export default function SiteShell({ children }: { children: ReactNode }) {
  return (
    <>
      <SmoothScroll />
      <Cursor />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <ScrollTop />
    </>
  );
}
