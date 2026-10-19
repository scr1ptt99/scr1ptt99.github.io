import { Link } from "react-router-dom";
import { ArrowUpRight, Clock } from "lucide-react";
import { POSTS, Post, formatDate } from "../../data/posts";
import Reveal from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";
import MagneticButton from "../ui/MagneticButton";
import TiltCard from "../ui/TiltCard";

export function PostCard({ post, index = 0 }: { post: Post; index?: number }) {
  return (
    <Reveal delay={index * 100} className="h-full">
      <TiltCard max={5} className="h-full rounded-[2rem]">
        <Link to={`/blog/${post.slug}`} data-cursor="hover" className="liquid-glass group flex h-full flex-col overflow-hidden rounded-[2rem]">
          <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden">
            <div className="absolute inset-0 opacity-30 transition-opacity duration-700 group-hover:opacity-60" style={{ background: `radial-gradient(circle at 30% 30%, ${post.hue}, transparent 65%)` }} />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:32px_32px]" />
            <span className="relative font-heading text-8xl italic transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-125 group-hover:-rotate-6">
              {post.glyph}
            </span>
            <span className="absolute left-5 top-5 rounded-full bg-black/50 px-3 py-1 font-body text-xs text-white/80 backdrop-blur">{post.category}</span>
          </div>
          <div className="flex flex-1 flex-col p-7">
            <div className="flex items-center gap-3 font-body text-xs text-white/40">
              <span>{formatDate(post.date)}</span>
              <span className="h-1 w-1 rounded-full bg-white/30" />
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" /> {post.readTime} хв
              </span>
            </div>
            <h3 className="mt-4 font-heading text-3xl italic leading-tight text-white">{post.title}</h3>
            <p className="mt-3 flex-1 font-body text-sm font-light text-white/50">{post.excerpt}</p>
            <span className="mt-6 inline-flex items-center gap-2 font-body text-sm text-accent">
              Читати
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </span>
          </div>
        </Link>
      </TiltCard>
    </Reveal>
  );
}

export default function BlogTeaser() {
  return (
    <section className="relative py-28 md:py-36">
      <div className="container-x">
        <SectionHeading
          eyebrow="Блог"
          title="Поради, що працюють"
          highlight={["працюють"]}
          action={<MagneticButton to="/blog" variant="ghost">Усі статті</MagneticButton>}
        />
        <div className="grid gap-6 md:grid-cols-3">
          {POSTS.slice(0, 3).map((p, i) => (
            <PostCard key={p.slug} post={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
