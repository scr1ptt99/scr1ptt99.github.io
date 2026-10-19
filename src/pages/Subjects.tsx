import PageHero from "../components/ui/PageHero";
import SubjectsGrid from "../components/sections/SubjectsGrid";
import Formats from "../components/sections/Formats";
import GlyphOrbit from "../components/visuals/GlyphOrbit";
import MagneticButton from "../components/ui/MagneticButton";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export default function Subjects() {
  useDocumentTitle("Предмети");
  return (
    <>
      <PageHero
        eyebrow="Предмети"
        title={"Обирайте предмет —\nми підберемо підхід"}
        highlight={["підхід"]}
        text="Математика, історія, мови та природничі науки. Підвищення рівня знань з репетитором і підготовка до НМТ — офлайн на Осокорках або онлайн."
        crumbs={[{ label: "Предмети" }]}
        aside={<GlyphOrbit size={440} />}
      >
        <div className="mt-10 flex flex-wrap gap-4">
          <MagneticButton to="/kontakty" variant="accent">Записатися</MagneticButton>
          <MagneticButton to="/nmt" variant="glass">Підготовка до НМТ</MagneticButton>
        </div>
      </PageHero>
      <SubjectsGrid withHeading={false} />
      <Formats />
    </>
  );
}
