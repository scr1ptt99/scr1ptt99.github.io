import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import ScrollProgress from "./ScrollProgress";
import CustomCursor from "./CustomCursor";
import Preloader from "./Preloader";
import PageTransition from "./PageTransition";
import SiteMap from "../sections/SiteMap";
import CtaFooter from "../sections/CtaFooter";

export default function Layout() {
  return (
    <div className="relative min-h-screen bg-black text-white">
      <Preloader />
      <CustomCursor />
      <ScrollProgress />
      <div className="grain" aria-hidden />
      <Navbar />
      <PageTransition>
        <main>
          <Outlet />
        </main>
        <SiteMap />
        {/* Фінальна секція кожної сторінки — CTA з HLS-відео та футером */}
        <CtaFooter />
      </PageTransition>
    </div>
  );
}
