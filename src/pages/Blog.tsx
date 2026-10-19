import { useState } from "react";
import PageHero from "../components/ui/PageHero";
import Reveal from "../components/ui/Reveal";
import { PostCard } from "../components/sections/BlogTeaser";
import { POSTS } from "../data/posts";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { cn } from "../lib/cn";

export default function Blog() {
  useDocumentTitle("Блог");
  const cats = ["Усі", ...Array.from(new Set(POSTS.map((p) => p.category)))];
  const [cat, setCat] = useState("Усі");
  const list = cat === "Усі" ? POSTS : POSTS.filter((p) => p.category === cat);

  return (
    <>
      <PageHero
        eyebrow="Блог"
        title={"Корисне про\nнавчання"}
        highlight={["навчання"]}
        text="Поради для учнів і батьків: підготовка до НМТ, звички, що змінюють оцінки, і вибір репетитора."
        crumbs={[{ label: "Блог" }]}
      />
      <section className="pb-24">
        <div className="container-x">
          <Reveal>
            <div className="mb-10 flex flex-wrap gap-2">
              {cats.map((c) => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className={cn(
                    "rounded-full px-5 py-2.5 font-body text-sm transition-all duration-300",
                    cat === c ? "bg-white text-black" : "bg-white/[0.06] text-white/60 hover:text-white",
                  )}
                >
                  {c}
                </button>
              ))}
            </div>
          </Reveal>
          <div key={cat} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {list.map((p, i) => (
              <PostCard key={p.slug} post={p} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
