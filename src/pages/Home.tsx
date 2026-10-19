import Hero from "../components/sections/Hero";
import Facts from "../components/sections/Facts";
import SubjectsGrid from "../components/sections/SubjectsGrid";
import Statement from "../components/sections/Statement";
import Approach from "../components/sections/Approach";
import Formats from "../components/sections/Formats";
import Services from "../components/sections/Services";
import NmtTeaser from "../components/sections/NmtTeaser";
import BlogTeaser from "../components/sections/BlogTeaser";
import FaqSection from "../components/sections/FaqSection";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export default function Home() {
  useDocumentTitle();
  return (
    <>
      <Hero />
      <Facts />
      <SubjectsGrid />
      <Statement />
      <Approach />
      <Formats />
      <Services />
      <NmtTeaser />
      <BlogTeaser />
      <FaqSection />
    </>
  );
}
