import { Navigate, useParams } from "react-router-dom";
import { Clock } from "lucide-react";
import { POSTS, getPost, formatDate } from "../data/posts";
import Breadcrumbs from "../components/ui/Breadcrumbs";
import SplitText from "../components/ui/SplitText";
import Reveal from "../components/ui/Reveal";
import Aurora from "../components/visuals/Aurora";
import MagneticButton from "../components/ui/MagneticButton";
import { PostCard } from "../components/sections/BlogTeaser";
import { usePageScroll } from "../hooks/useScrollProgress";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export default function BlogPost() {
  const { slug } = useParams();
  const post = getPost(slug);
  useDocumentTitle(post?.title);
  const { y } = usePageScroll();
  if (!post) return <Navigate to="/404" replace />;
  const others = POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <article>
        <header className="relative overflow-hidden pb-16 pt-36 md:pt-44">
          <Aurora hue={post.hue} />
          <span
            className="pointer-events-none absolute right-[-5%] top-24 font-heading text-[30vw] italic leading-none text-white/[0.04]"
            style={{ transform: `translateY(${y * 0.3}px)` }}
            aria-hidden
          >
            {post.glyph}
          </span>
          <div className="relative mx-auto max-w-3xl px-6">
            <Reveal>
              <Breadcrumbs items={[{ label: "Блог", to: "/blog" }, { label: post.category }]} />
            </Reveal>
            <Reveal delay={100}>
              <div className="mb-6 flex items-center gap-3 font-body text-xs text-white/50">
                <span className="rounded-full bg-white/[0.08] px-3 py-1">{post.category}</span>
                <span>{formatDate(post.date)}</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" /> {post.readTime} хв читання
                </span>
              </div>
            </Reveal>
            <SplitText
              as="h1"
              immediate
              delay={250}
              stagger={50}
              text={post.title}
              className="font-heading text-5xl italic leading-[0.95] tracking-tight md:text-7xl"
            />
            <Reveal delay={500}>
              <p className="mt-8 font-body text-xl font-light text-white/60">{post.excerpt}</p>
            </Reveal>
          </div>
        </header>

        <div className="mx-auto max-w-3xl px-6 pb-24">
          <div className="hairline mb-12" />
          {post.body.map((b, i) => {
            if (b.type === "h")
              return (
                <Reveal key={i}>
                  <h2 className="mb-4 mt-14 font-heading text-4xl italic">{b.text}</h2>
                </Reveal>
              );
            if (b.type === "list")
              return (
                <Reveal key={i}>
                  <ul className="my-6 space-y-3">
                    {b.items.map((it) => (
                      <li key={it} className="flex gap-4 font-body text-lg font-light text-white/75">
                        <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        {it}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              );
            if (b.type === "quote")
              return (
                <Reveal key={i}>
                  <blockquote className="my-12 border-l-2 border-accent pl-8 font-heading text-3xl italic leading-snug text-white md:text-4xl">
                    {b.text}
                  </blockquote>
                </Reveal>
              );
            return (
              <Reveal key={i}>
                <p className="my-5 font-body text-lg font-light leading-relaxed text-white/75">{b.text}</p>
              </Reveal>
            );
          })}
          <Reveal>
            <div className="liquid-glass mt-16 flex flex-col items-start justify-between gap-6 rounded-[2rem] p-8 sm:flex-row sm:items-center">
              <p className="font-heading text-3xl italic">Потрібна допомога з навчанням?</p>
              <MagneticButton to="/kontakty" variant="accent">
                Записатися
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </article>

      <section className="pb-24">
        <div className="container-x">
          <Reveal>
            <h2 className="mb-10 font-heading text-5xl italic">Читайте також</h2>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-3">
            {others.map((p, i) => (
              <PostCard key={p.slug} post={p} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
