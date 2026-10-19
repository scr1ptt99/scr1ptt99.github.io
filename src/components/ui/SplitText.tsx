import { ElementType, Fragment } from "react";
import { useInView } from "../../hooks/useInView";
import { cn } from "../../lib/cn";

interface SplitTextProps {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  stagger?: number;
  /** слова, які підсвічуються акцентним кольором */
  highlight?: string[];
  /** запустити одразу, не чекаючи прокрутки */
  immediate?: boolean;
}

/** Заголовок, що «виростає» по словах знизу вгору. */
export default function SplitText({
  text,
  as: Tag = "h2",
  className,
  delay = 0,
  stagger = 70,
  highlight = [],
  immediate = false,
}: SplitTextProps) {
  const { ref, inView } = useInView<HTMLElement>();
  const lines = text.split("\n");
  let i = 0;
  return (
    <Tag ref={ref} className={cn((inView || immediate) && "is-in", className)} aria-label={text.replace(/\n/g, " ")}>
      {lines.map((line, li) => (
        <Fragment key={li}>
          {line.split(" ").map((word, wi) => {
            const idx = i++;
            const hl = highlight.some((h) => word.toLowerCase().includes(h.toLowerCase()));
            return (
              <Fragment key={wi}>
                <span className="split-word" aria-hidden>
                  <span
                    className={cn("split-inner", hl && "text-gradient")}
                    style={{ ["--d" as string]: `${delay + idx * stagger}ms` }}
                  >
                    {word}
                  </span>
                </span>
                {wi < line.split(" ").length - 1 && " "}
              </Fragment>
            );
          })}
          {li < lines.length - 1 && <br />}
        </Fragment>
      ))}
    </Tag>
  );
}
