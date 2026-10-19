import { VisualKind } from "../../data/subjects";

/**
 * Унікальна анімована ілюстрація (SVG motion-graphics) для кожного предмета.
 */
export default function SubjectVisual({ kind, hue, className = "" }: { kind: VisualKind; hue: string; className?: string }) {
  const map: Record<VisualKind, JSX.Element> = {
    math: <MathViz hue={hue} />,
    ukrainian: <LettersViz hue={hue} letters={["Ї", "Ґ", "Є", "І", "Щ", "Ж"]} main="Ї" />,
    english: <SpeechViz hue={hue} words={["Hello!", "How are you?", "I’m fine", "Let’s talk"]} />,
    history: <TimelineViz hue={hue} />,
    biology: <DnaViz hue={hue} />,
    physics: <AtomViz hue={hue} />,
    chemistry: <MoleculeViz hue={hue} />,
    german: <LettersViz hue={hue} letters={["Ä", "Ö", "Ü", "ß", "Ei", "Sch"]} main="ß" />,
  };
  return (
    <div className={`relative aspect-square w-full ${className}`} aria-hidden>
      <div className="absolute inset-[15%] rounded-full opacity-30 blur-3xl" style={{ background: hue }} />
      <div className="relative h-full w-full">{map[kind]}</div>
    </div>
  );
}

const Grid = () => (
  <g stroke="rgba(255,255,255,0.06)" strokeWidth="1">
    {Array.from({ length: 11 }, (_, i) => (
      <g key={i}>
        <line x1={i * 40} y1="0" x2={i * 40} y2="400" />
        <line x1="0" y1={i * 40} x2="400" y2={i * 40} />
      </g>
    ))}
  </g>
);

function MathViz({ hue }: { hue: string }) {
  const sine = Array.from({ length: 81 }, (_, i) => {
    const x = i * 5;
    const y = 200 - Math.sin((i / 80) * Math.PI * 3) * 90;
    return `${i === 0 ? "M" : "L"}${x},${y.toFixed(1)}`;
  }).join(" ");
  return (
    <svg viewBox="0 0 400 400" className="h-full w-full">
      <Grid />
      <line x1="0" y1="200" x2="400" y2="200" stroke="rgba(255,255,255,0.25)" />
      <line x1="200" y1="0" x2="200" y2="400" stroke="rgba(255,255,255,0.25)" />
      <path id="sine" d={sine} fill="none" stroke={hue} strokeWidth="2.5" strokeDasharray="900" strokeDashoffset="900">
        <animate attributeName="stroke-dashoffset" from="900" to="0" dur="3s" fill="freeze" />
      </path>
      <circle r="7" fill={hue}>
        <animateMotion dur="6s" repeatCount="indefinite" path={sine} />
      </circle>
      <g transform="translate(300 90)">
        <polygon points="0,-40 35,20 -35,20" fill="none" stroke="#fff" strokeOpacity=".6" strokeWidth="1.5">
          <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="14s" repeatCount="indefinite" />
        </polygon>
      </g>
      <g transform="translate(90 320)">
        <circle r="34" fill="none" stroke="#fff" strokeOpacity=".5" strokeDasharray="4 6">
          <animateTransform attributeName="transform" type="rotate" from="360" to="0" dur="18s" repeatCount="indefinite" />
        </circle>
        <text textAnchor="middle" dy="8" fill="#fff" fontFamily="Instrument Serif" fontStyle="italic" fontSize="26">π</text>
      </g>
      <text x="70" y="80" fill="#fff" fillOpacity=".8" fontFamily="Instrument Serif" fontStyle="italic" fontSize="30">
        f(x) = sin x
        <animate attributeName="fill-opacity" values=".2;.9;.2" dur="4s" repeatCount="indefinite" />
      </text>
    </svg>
  );
}

function LettersViz({ hue, letters, main }: { hue: string; letters: string[]; main: string }) {
  return (
    <svg viewBox="0 0 400 400" className="h-full w-full">
      <circle cx="200" cy="200" r="150" fill="none" stroke="rgba(255,255,255,.1)" />
      <circle cx="200" cy="200" r="100" fill="none" stroke="rgba(255,255,255,.08)" strokeDasharray="3 8" />
      <g>
        <animateTransform attributeName="transform" type="rotate" from="0 200 200" to="360 200 200" dur="40s" repeatCount="indefinite" />
        {letters.map((l, i) => {
          const a = (i / letters.length) * Math.PI * 2;
          const x = 200 + Math.cos(a) * 150;
          const y = 200 + Math.sin(a) * 150;
          return (
            <g key={l} transform={`translate(${x} ${y})`}>
              <g>
                <animateTransform attributeName="transform" type="rotate" from="0" to="-360" dur="40s" repeatCount="indefinite" />
                <circle r="24" fill="rgba(0,0,0,.6)" stroke={hue} strokeOpacity=".6" />
                <text textAnchor="middle" dy="8" fill="#fff" fontFamily="Instrument Serif" fontStyle="italic" fontSize="22">{l}</text>
              </g>
            </g>
          );
        })}
      </g>
      <text x="200" y="232" textAnchor="middle" fill="#fff" fontFamily="Instrument Serif" fontStyle="italic" fontSize="110">
        {main}
      </text>
      <path d="M130 262 C 170 280, 230 244, 270 262" fill="none" stroke={hue} strokeWidth="3" strokeLinecap="round" strokeDasharray="160" strokeDashoffset="160">
        <animate attributeName="stroke-dashoffset" values="160;0;0;160" keyTimes="0;.4;.8;1" dur="4s" repeatCount="indefinite" />
      </path>
    </svg>
  );
}

function SpeechViz({ hue, words }: { hue: string; words: string[] }) {
  return (
    <svg viewBox="0 0 400 400" className="h-full w-full">
      {words.map((w, i) => {
        const x = i % 2 === 0 ? 40 : 150;
        const y = 50 + i * 72;
        const width = w.length * 13 + 40;
        return (
          <g key={w} opacity="0">
            <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.1;.85;1" dur="8s" begin={`${i * 0.8}s`} repeatCount="indefinite" />
            <animateTransform attributeName="transform" type="translate" values="0 20;0 0;0 0;0 -10" keyTimes="0;.1;.85;1" dur="8s" begin={`${i * 0.8}s`} repeatCount="indefinite" />
            <rect x={x} y={y} width={width} height="48" rx="24" fill={i % 2 ? hue : "rgba(255,255,255,.08)"} stroke="rgba(255,255,255,.2)" />
            <text x={x + 20} y={y + 31} fill={i % 2 ? "#000" : "#fff"} fontFamily="Barlow" fontSize="18" fontWeight="500">{w}</text>
          </g>
        );
      })}
      <g transform="translate(110 360)">
        {Array.from({ length: 18 }, (_, i) => (
          <rect key={i} x={i * 10} y="-20" width="5" height="40" rx="2.5" fill={hue} opacity=".8">
            <animate attributeName="height" values="6;36;10;28;6" dur={`${0.9 + (i % 5) * 0.17}s`} repeatCount="indefinite" />
            <animate attributeName="y" values="-3;-18;-5;-14;-3" dur={`${0.9 + (i % 5) * 0.17}s`} repeatCount="indefinite" />
          </rect>
        ))}
      </g>
    </svg>
  );
}

function TimelineViz({ hue }: { hue: string }) {
  const events = [
    { y: 60, year: "988" },
    { y: 130, year: "1648" },
    { y: 200, year: "1917" },
    { y: 270, year: "1991" },
    { y: 340, year: "2014" },
  ];
  return (
    <svg viewBox="0 0 400 400" className="h-full w-full">
      <line x1="200" y1="30" x2="200" y2="370" stroke="rgba(255,255,255,.15)" strokeWidth="2" />
      <line x1="200" y1="30" x2="200" y2="370" stroke={hue} strokeWidth="2" strokeDasharray="340" strokeDashoffset="340">
        <animate attributeName="stroke-dashoffset" values="340;0;0" keyTimes="0;.7;1" dur="6s" repeatCount="indefinite" />
      </line>
      {events.map((e, i) => (
        <g key={e.year}>
          <circle cx="200" cy={e.y} r="7" fill="#000" stroke={hue} strokeWidth="2">
            <animate attributeName="r" values="7;7;12;7" keyTimes={`0;${(i * 0.14).toFixed(2)};${(i * 0.14 + 0.05).toFixed(2)};1`} dur="6s" repeatCount="indefinite" />
          </circle>
          <text
            x={i % 2 ? 225 : 175}
            y={e.y + 10}
            textAnchor={i % 2 ? "start" : "end"}
            fill="#fff"
            fontFamily="Instrument Serif"
            fontStyle="italic"
            fontSize="30"
            opacity=".2"
          >
            {e.year}
            <animate attributeName="opacity" values=".2;.2;1;.6" keyTimes={`0;${(i * 0.14).toFixed(2)};${(i * 0.14 + 0.05).toFixed(2)};1`} dur="6s" repeatCount="indefinite" />
          </text>
        </g>
      ))}
      <g transform="translate(320 70)" opacity=".5">
        <circle r="36" fill="none" stroke="#fff" strokeDasharray="2 5" />
        <line x1="0" y1="0" x2="0" y2="-26" stroke="#fff" strokeWidth="2">
          <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="6s" repeatCount="indefinite" />
        </line>
        <line x1="0" y1="0" x2="16" y2="0" stroke={hue} strokeWidth="2">
          <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="72s" repeatCount="indefinite" />
        </line>
      </g>
    </svg>
  );
}

function DnaViz({ hue }: { hue: string }) {
  const rungs = 14;
  return (
    <svg viewBox="0 0 400 400" className="h-full w-full">
      {Array.from({ length: rungs }, (_, i) => {
        const y = 40 + i * 24;
        const dur = 3;
        const begin = `${-(i / rungs) * dur}s`;
        return (
          <g key={i}>
            <line y1={y} y2={y} stroke="rgba(255,255,255,.25)" strokeWidth="2">
              <animate attributeName="x1" values="120;280;120" dur={`${dur}s`} begin={begin} repeatCount="indefinite" />
              <animate attributeName="x2" values="280;120;280" dur={`${dur}s`} begin={begin} repeatCount="indefinite" />
            </line>
            <circle cy={y} r="8" fill={hue}>
              <animate attributeName="cx" values="120;280;120" dur={`${dur}s`} begin={begin} repeatCount="indefinite" />
              <animate attributeName="r" values="9;5;9" dur={`${dur}s`} begin={begin} repeatCount="indefinite" />
            </circle>
            <circle cy={y} r="8" fill="#fff">
              <animate attributeName="cx" values="280;120;280" dur={`${dur}s`} begin={begin} repeatCount="indefinite" />
              <animate attributeName="r" values="5;9;5" dur={`${dur}s`} begin={begin} repeatCount="indefinite" />
            </circle>
          </g>
        );
      })}
    </svg>
  );
}

function AtomViz({ hue }: { hue: string }) {
  const orbits = [0, 60, 120];
  return (
    <svg viewBox="0 0 400 400" className="h-full w-full">
      <circle cx="200" cy="200" r="18" fill={hue}>
        <animate attributeName="r" values="16;20;16" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="200" cy="200" r="34" fill={hue} opacity=".15" />
      {orbits.map((rot, i) => {
        const path = "M 50 200 A 150 55 0 1 1 350 200 A 150 55 0 1 1 50 200";
        return (
          <g key={rot} transform={`rotate(${rot} 200 200)`}>
            <path d={path} fill="none" stroke="rgba(255,255,255,.3)" strokeWidth="1.2" />
            <circle r="7" fill="#fff">
              <animateMotion dur={`${2.4 + i * 0.7}s`} repeatCount="indefinite" path={path} />
            </circle>
          </g>
        );
      })}
    </svg>
  );
}

function MoleculeViz({ hue }: { hue: string }) {
  const hex = Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i - Math.PI / 2;
    return [200 + Math.cos(a) * 90, 200 + Math.sin(a) * 90] as const;
  });
  return (
    <svg viewBox="0 0 400 400" className="h-full w-full">
      <g>
        <animateTransform attributeName="transform" type="rotate" from="0 200 200" to="360 200 200" dur="30s" repeatCount="indefinite" />
        <polygon points={hex.map((p) => p.join(",")).join(" ")} fill="none" stroke="#fff" strokeOpacity=".7" strokeWidth="2" />
        <circle cx="200" cy="200" r="52" fill="none" stroke={hue} strokeWidth="2" strokeDasharray="6 6">
          <animateTransform attributeName="transform" type="rotate" from="0 200 200" to="-360 200 200" dur="10s" repeatCount="indefinite" />
        </circle>
        {hex.map(([x, y], i) => {
          const ox = 200 + (x - 200) * 1.7;
          const oy = 200 + (y - 200) * 1.7;
          return (
            <g key={i}>
              <line x1={x} y1={y} x2={ox} y2={oy} stroke="rgba(255,255,255,.35)" strokeWidth="2" />
              <circle cx={ox} cy={oy} r="12" fill="rgba(255,255,255,.1)" stroke="#fff" strokeOpacity=".5" />
              <text x={ox} y={oy + 5} textAnchor="middle" fill="#fff" fontFamily="Barlow" fontSize="13">H</text>
              <circle cx={x} cy={y} r="15" fill={hue}>
                <animate attributeName="r" values="13;17;13" dur="2s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
              </circle>
              <text x={x} y={y + 5} textAnchor="middle" fill="#000" fontFamily="Barlow" fontWeight="600" fontSize="13">C</text>
            </g>
          );
        })}
      </g>
      {[60, 120, 330, 360].map((x, i) => (
        <circle key={x} cx={x} cy="400" r={4 + i} fill="none" stroke={hue} strokeOpacity=".6">
          <animate attributeName="cy" values="410;-10" dur={`${4 + i}s`} begin={`${i}s`} repeatCount="indefinite" />
        </circle>
      ))}
    </svg>
  );
}
