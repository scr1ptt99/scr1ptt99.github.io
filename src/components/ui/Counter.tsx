import { useInView } from "../../hooks/useInView";
import { useCountUp } from "../../hooks/useCountUp";

export default function Counter({
  to,
  suffix = "",
  prefix = "",
  duration = 2200,
  className,
}: {
  to: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLSpanElement>();
  const v = useCountUp(to, inView, duration);
  return (
    <span ref={ref} className={className}>
      {prefix}
      {Math.round(v).toLocaleString("uk-UA")}
      {suffix}
    </span>
  );
}
