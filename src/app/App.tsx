import { useState, useEffect, useLayoutEffect, useRef, useCallback } from 'react';
import { motion } from 'motion/react';
import { Mail, Linkedin, Github, ChevronDown, MapPin, Calendar, ImagePlus, User, Instagram, Facebook } from 'lucide-react';

import { translations, Lang } from './translations';

function XIcon({ size = 22, style }: { size?: number; style?: React.CSSProperties }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={style}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117Z" />
    </svg>
  );
}

// ─── Palette ───────────────────────────────────────────────────────────────
const C = {
  bg0:      '#0b1120',
  bg1:      '#101624',
  bg2:      '#141c2e',
  card:     '#1a2236',
  border:   '#253044',
  accent:   '#3e7cb1',
  accentHi: '#5a9fd4',
  text:     '#e0e6ed',
  muted:    '#b8c1d1',
  faint:    '#7a8ba0',
};

// ─── Image Placeholder ──────────────────────────────────────────────────────
function ImgPlaceholder({ width = '100%', height = 180, round = false, label = 'Add Image' }: {
  width?: string | number;
  height?: number;
  round?: boolean;
  label?: string;
}) {
  return (
    <div
      style={{
        width,
        height,
        borderRadius: round ? '50%' : '10px',
        border: `2px dashed ${C.border}`,
        background: `${C.accent}0a`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '6px',
        color: C.faint,
        fontSize: '0.72rem',
        letterSpacing: '0.05em',
        userSelect: 'none',
      }}
    >
      <ImagePlus size={20} style={{ color: C.accent, opacity: 0.5 }} />
      <span>{label}</span>
    </div>
  );
}

// ─── Animated Network Canvas ────────────────────────────────────────────────
function NetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  const init = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const NODE_COUNT = 55;
    const MAX_DIST = 160;

    interface Node {
      x: number; y: number;
      vx: number; vy: number;
      r: number;
    }

    const nodes: Node[] = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.5 + 1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > canvas.width)  n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            const alpha = (1 - dist / MAX_DIST) * 0.18;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(62,124,177,${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      for (const n of nodes) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(90,159,212,0.55)';
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  useEffect(() => {
    const cleanup = init();
    return cleanup;
  }, [init]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0, opacity: 0.9 }}
    />
  );
}

// ─── Section Heading ────────────────────────────────────────────────────────
function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-center mb-16 uppercase tracking-widest"
      style={{
        fontFamily: 'Oswald, sans-serif',
        fontSize: 'clamp(2rem, 4vw, 3rem)',
        fontWeight: 700,
        color: C.text,
        letterSpacing: '0.12em',
      }}
    >
      <span style={{ borderBottom: `3px solid ${C.accent}`, paddingBottom: '8px' }}>
        {children}
      </span>
    </motion.h2>
  );
}

// ─── Divider ────────────────────────────────────────────────────────────────
function Divider() {
  return (
    <div style={{ height: '1px', background: `linear-gradient(90deg, transparent, ${C.border}, transparent)` }} />
  );
}

// ─── Card ───────────────────────────────────────────────────────────────────
function Card({ children, className = '', delay = 0, hover = true }: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  hover?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={hover ? { y: -4, borderColor: C.accentHi } : undefined}
      className={`rounded-xl p-7 ${className}`}
      style={{
        background: C.card,
        border: `1px solid ${C.border}`,
        transition: 'border-color 0.2s',
      }}
    >
      {children}
    </motion.div>
  );
}

// ─── Tag ────────────────────────────────────────────────────────────────────
function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="px-2.5 py-1 rounded text-xs font-medium"
      style={{
        background: `${C.accent}22`,
        color: C.accentHi,
        border: `1px solid ${C.accent}44`,
        fontFamily: 'Inter, sans-serif',
      }}
    >
      {children}
    </span>
  );
}

// ─── Tech Border Keyframes ────────────────────────────────────────────────────
const TECH_KEYFRAMES = `
  @keyframes techBorderCW  { to { stroke-dashoffset: -1000; } }
  @keyframes techBorderCCW { to { stroke-dashoffset:  1000; } }
`;

// ─── TechBorderOverlay — drop inside any position:relative card ───────────────
function TechBorderOverlay({ rx = 12 }: { rx?: number }) {
  const [hovered, setHovered] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);
  const [dims, setDims] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const parent = svgRef.current?.parentElement;
    if (!parent) return;

    const ro = new ResizeObserver(([e]) => {
      setDims({ w: e.contentRect.width, h: e.contentRect.height });
    });
    ro.observe(parent);

    const onEnter = () => setHovered(true);
    const onLeave = () => setHovered(false);
    parent.addEventListener('mouseenter', onEnter);
    parent.addEventListener('mouseleave', onLeave);

    return () => {
      ro.disconnect();
      parent.removeEventListener('mouseenter', onEnter);
      parent.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  const { w, h } = dims;
  if (w === 0) return <svg ref={svgRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', width: 0, height: 0 }} />;

  const perim = 2 * (w + h);
  const dash = 80;
  const gap = perim - dash;

  return (
    <svg
      ref={svgRef}
      style={{
        position: 'absolute', inset: 0,
        width: w, height: h,
        pointerEvents: 'none', overflow: 'visible', zIndex: 10,
        opacity: hovered ? 1 : 0, transition: 'opacity 0.3s',
      }}
    >
      <rect x={1.5} y={1.5} width={w - 3} height={h - 3} rx={rx}
        fill="none" stroke={C.accentHi} strokeWidth={1.5} strokeLinecap="square"
        strokeDasharray={`${dash} ${gap}`}
        style={{ animation: 'techBorderCW 4s linear infinite' }}
      />
      <rect x={1.5} y={1.5} width={w - 3} height={h - 3} rx={rx}
        fill="none" stroke={C.accent} strokeWidth={1.5} strokeLinecap="square"
        strokeDasharray={`${dash} ${gap}`} strokeDashoffset={perim / 2}
        style={{ animation: 'techBorderCCW 4s linear infinite' }}
      />
    </svg>
  );
}

function TechLineButton({
  children, onClick, primary = false,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  primary?: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const [dims, setDims] = useState({ w: 160, h: 50 });

  useLayoutEffect(() => {
    if (btnRef.current) {
      const r = btnRef.current.getBoundingClientRect();
      setDims({ w: r.width, h: r.height });
    }
  }, []);

  const pad = 5;
  const svgW = dims.w + pad * 2;
  const svgH = dims.h + pad * 2;
  const perim = 2 * (svgW + svgH);
  const dash = 64;
  const gap  = perim - dash;

  return (
    <div
      style={{ position: 'relative', display: 'inline-block' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <button
        ref={btnRef}
        onClick={onClick}
        className="px-8 py-3 rounded font-semibold tracking-widest text-sm uppercase transition-all"
        style={{
          fontFamily: 'Oswald, sans-serif',
          background: primary ? C.accent : 'transparent',
          color: primary ? '#fff' : C.muted,
          border: primary ? 'none' : `1px solid ${C.border}`,
        }}
        onMouseEnter={e => {
          if (primary) e.currentTarget.style.background = C.accentHi;
          else { e.currentTarget.style.borderColor = C.accent; e.currentTarget.style.color = C.text; }
        }}
        onMouseLeave={e => {
          if (primary) e.currentTarget.style.background = C.accent;
          else { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.muted; }
        }}
      >
        {children}
      </button>

      {/* Animated tech border overlay */}
      <svg
        style={{
          position: 'absolute',
          top: -pad, left: -pad,
          width: svgW, height: svgH,
          pointerEvents: 'none',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.25s',
          overflow: 'visible',
        }}
      >
        {/* Line 1 — clockwise, bright accent */}
        <rect
          x={1.5} y={1.5}
          width={svgW - 3} height={svgH - 3}
          rx={6}
          fill="none"
          stroke={C.accentHi}
          strokeWidth={1.8}
          strokeLinecap="square"
          strokeDasharray={`${dash} ${gap}`}
          strokeDashoffset={0}
          style={{ animation: 'techBorderCW 4s linear infinite' }}
        />
        {/* Arrow tick at head of line 1 */}
        <rect
          x={1.5} y={1.5}
          width={svgW - 3} height={svgH - 3}
          rx={6}
          fill="none"
          stroke={C.accentHi}
          strokeWidth={2.5}
          strokeLinecap="butt"
          strokeDasharray={`4 ${perim - 4}`}
          strokeDashoffset={-dash + 4}
          style={{ animation: 'techBorderCW 4s linear infinite' }}
        />

        {/* Line 2 — counter-clockwise, softer accent */}
        <rect
          x={1.5} y={1.5}
          width={svgW - 3} height={svgH - 3}
          rx={6}
          fill="none"
          stroke={C.accent}
          strokeWidth={1.8}
          strokeLinecap="square"
          strokeDasharray={`${dash} ${gap}`}
          strokeDashoffset={perim / 2}
          style={{ animation: 'techBorderCCW 4s linear infinite' }}
        />
        {/* Arrow tick at head of line 2 */}
        <rect
          x={1.5} y={1.5}
          width={svgW - 3} height={svgH - 3}
          rx={6}
          fill="none"
          stroke={C.accent}
          strokeWidth={2.5}
          strokeLinecap="butt"
          strokeDasharray={`4 ${perim - 4}`}
          strokeDashoffset={perim / 2 + dash - 4}
          style={{ animation: 'techBorderCCW 4s linear infinite' }}
        />
      </svg>
    </div>
  );
}

// ─── Cert types ──────────────────────────────────────────────────────────────
type CertEntry = { name: string; year?: string; verify?: string; image?: string };

// ─── CertImageCard ────────────────────────────────────────────────────────────
function CertImageCard({ cert, delay, onClick }: { cert: CertEntry; delay: number; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.4 }}
      style={{ cursor: 'pointer' }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image frame */}
      <div style={{
        position: 'relative', overflow: 'hidden', borderRadius: 10,
        border: `1px solid ${hovered ? C.accent : C.border}`,
        transition: 'border-color 0.2s, box-shadow 0.2s',
        boxShadow: hovered ? `0 4px 24px ${C.accent}44` : '0 2px 8px rgba(0,0,0,0.25)',
        background: '#f0f0f0',
        aspectRatio: '4/3',
      }}>
        <img
          src={cert.image}
          alt={cert.name}
          style={{
            width: '100%', height: '100%', objectFit: 'cover', display: 'block',
            transform: hovered ? 'scale(1.04)' : 'scale(1)',
            transition: 'transform 0.35s ease',
          }}
        />
        {/* Hover overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: hovered ? 'rgba(62,124,177,0.18)' : 'transparent',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'background 0.2s',
        }}>
          {hovered && (
            <motion.span
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                background: 'rgba(10,20,40,0.82)', color: C.accentHi,
                fontFamily: 'Oswald, sans-serif', fontSize: '0.7rem',
                letterSpacing: '0.12em', textTransform: 'uppercase',
                padding: '7px 16px', borderRadius: 6,
                border: `1px solid ${C.accent}66`,
              }}
            >
              Click to View
            </motion.span>
          )}
        </div>
      </div>

      {/* Name + year */}
      <div style={{ marginTop: 10, paddingBottom: 2 }}>
        <p style={{ fontSize: '0.82rem', color: C.text, fontWeight: 500, lineHeight: 1.35, margin: 0 }}>
          {cert.name}
        </p>
        {cert.year && (
          <p style={{ fontSize: '0.68rem', color: C.faint, marginTop: 3, margin: 0 }}>{cert.year}</p>
        )}
      </div>
    </motion.div>
  );
}

// ─── CertGroup — issuer heading + image card grid ─────────────────────────────
function CertGroup({ issuer, certs, groupIndex, onViewImage }: {
  issuer: string;
  certs: CertEntry[];
  groupIndex: number;
  onViewImage: (src: string) => void;
}) {
  const visible = certs.filter(c => c.image);
  if (visible.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: groupIndex * 0.08 }}
      style={{ marginBottom: '3rem' }}
    >
      {/* Issuer header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '1.25rem' }}>
        <h3 style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 700, fontSize: '1.05rem', color: C.accent, margin: 0, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
          {issuer}
        </h3>
        <span style={{
          fontSize: '0.68rem', color: C.accentHi, background: `${C.accent}22`,
          padding: '2px 8px', borderRadius: 20, fontWeight: 600,
        }}>
          {visible.length}
        </span>
        <div style={{ flex: 1, height: 1, background: `${C.border}88` }} />
      </div>

      {/* Card grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.25rem' }}>
        {visible.map((cert, ci) => (
          <CertImageCard
            key={ci}
            cert={cert}
            delay={ci * 0.08}
            onClick={() => onViewImage(cert.image!)}
          />
        ))}
      </div>
    </motion.div>
  );
}

// ─── Main App ───────────────────────────────────────────────────────────────
export default function App() {
  const [lang, setLang] = useState<Lang>('en');
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });

  const t = translations[lang];

  useEffect(() => {
    document.documentElement.setAttribute('dir', t.dir);
    document.documentElement.setAttribute('lang', lang);
  }, [lang, t.dir]);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const NAV = ['home', 'about', 'education', 'achievements', 'certifications', 'projects', 'experience', 'skills', 'contact'];

  const certifications: Record<string, CertEntry[]> = {
    IBM: [
      { name: 'Cybersecurity IT Fundamentals Specialization',  year: '2025', verify: 'https://www.credly.com/badges/0c572a23-5a62-4c0f-880c-c62b8904cf61', image: '/certs/ibm-cyber-fundamentals.png' },
      { name: 'IBM AI Product Manager',                        year: '2025', verify: 'https://coursera.org/verify/professional-cert/FNJGYEJG4LZ5' },
      { name: 'IBM Business Intelligence (BI) Analyst',        year: '2024', verify: 'https://coursera.org/verify/professional-cert/PVQEKBFXPK9E', image: '/certs/ibm-bi-analyst.jpg' },
      { name: 'IBM Cybersecurity Analyst',                     year: '2025', verify: 'https://coursera.org/verify/professional-cert/HO1CYE5BQASP' },
      { name: 'IBM Data Analyst',                              year: '2024', verify: 'https://coursera.org/verify/professional-cert/7ZGAD8X8CI28', image: '/certs/ibm-data-analyst.jpg' },
      { name: 'IBM IT Project Manager',                        year: '2025', verify: 'https://coursera.org/verify/professional-cert/LGI1T1AEDYX0' },
      { name: 'IBM IT Support',                                year: '2025', verify: 'https://coursera.org/verify/professional-cert/XF5RZZ1FJU19' },
      { name: 'IBM Project Manager',                           year: '2025', verify: 'https://coursera.org/verify/professional-cert/C6BAGBISN5XV' },
      { name: 'IBM Systems Analyst',                           year: '2025', verify: 'https://coursera.org/verify/professional-cert/D6NPZG1BGWFX' },
      { name: 'IT Fundamentals for Cybersecurity',             year: '2025', verify: 'https://coursera.org/verify/specialization/UFQIGO8Q3ZFL' },
    ],
    Microsoft: [
      { name: 'AI Product Manager' },
      { name: 'Cybersecurity Analyst' },
      { name: 'IT Support Specialist' },
      { name: 'Program Management' },
    ],
    Google: [
      { name: 'AI Professional Certification' },
      { name: 'Cloud Certification Engineer Preparation' },
      { name: 'Cloud Network Engineer' },
      { name: 'Cybersecurity V2' },
      { name: 'Digital Marketing Certification' },
      { name: 'IT Support Professional Certificate' },
      { name: 'Networking in Google Cloud' },
      { name: 'Project Management Professional Certificate' },
    ],
    Cisco: [
      { name: 'Ethical Hacking' },
      { name: 'Introduction to Cybersecurity' },
    ],
    Oracle: [
      { name: 'AI Vector Search Certified Professional' },
      { name: 'OCI 2025 Certified AI Foundations Associate' },
      { name: 'OCI 2025 Certified Foundations Associate' },
      { name: 'OCI Certified Generative AI Professional' },
      { name: 'Oracle Certified Foundations Associate' },
    ],
    'HP Life': [
      { name: 'Certified Ethical Hacking Awareness' },
      { name: 'Cybersecurity Awareness' },
      { name: 'Project Management Specialization' },
    ],
    OPSWAT: [{ name: 'Critical Infrastructure Protection' }],
    Rutgers: [
      { name: 'Advanced Global Procurement & Sourcing Specialization' },
      { name: 'Global Procurement & Sourcing Specialization' },
      { name: 'Supply Chain Management Specialization' },
    ],
    'EU Cyber Academy': [
      { name: 'CRPO – Certified Ransomware Protection Officer' },
      { name: 'CSCSO – Certified SME Cyber Security Officer' },
    ],
    'ISC2': [{ name: 'Cybersecurity Specialist (CC)' }],
    'EC-Council': [{ name: 'Cybersecurity for Businesses' }],
    NEBOSH: [{ name: 'International General Certificate in Occupational Health and Safety' }],
    LEORON: [{ name: 'ACGRC – Advanced Certificate in Governance, Risk and Compliance' }],
    'ISO/IEC': [{ name: 'ISO/IEC 27001:2022 Lead Auditor' }],
    'Govt. of Punjab': [{ name: 'Certified Ethical Hacker' }],
    Other: [
      { name: 'ADP – Payroll Specialist' },
      { name: 'Alison – Diploma in Human Resources Management' },
      { name: 'HRCI – Human Resource Associate' },
      { name: 'Unilever – Supply Chain Data Analyst' },
      { name: 'Univ. of Maryland – Cybersecurity in the AI Era' },
      { name: 'Univ. of Minnesota – Human Resource Management' },
    ],
  };

  return (
    <div style={{ background: C.bg0, color: C.text, fontFamily: 'Inter, sans-serif', minHeight: '100vh', overflowX: 'hidden' }}>

      {/* Tech border keyframes */}
      <style>{TECH_KEYFRAMES}</style>

      {/* Animated Network Background */}
      <NetworkCanvas />

      {/* ── Navbar ── */}
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: `${C.bg0}e8`,
          backdropFilter: 'blur(14px)',
          borderBottom: `1px solid ${C.border}`,
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <span style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 700, fontSize: '1.2rem', color: C.accent, letterSpacing: '0.1em' }}>
            AMM
          </span>
          <div className="hidden md:flex items-center gap-7 text-xs">
            {NAV.map(s => (
              <button
                key={s}
                onClick={() => scrollTo(s)}
                style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 500, letterSpacing: '0.1em', color: C.muted, textTransform: 'uppercase' }}
                className="hover:text-white transition-colors"
              >
                {t.navLabels[s as keyof typeof t.navLabels] ?? s}
              </button>
            ))}
            {/* Language Switcher */}
            <div className="flex items-center gap-1 ms-4 border-s ps-4" style={{ borderColor: C.border }}>
              {(['en', 'ar', 'de'] as Lang[]).map(l => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className="px-2 py-0.5 rounded text-xs font-semibold transition-all"
                  style={{
                    fontFamily: 'Oswald, sans-serif',
                    letterSpacing: '0.08em',
                    background: lang === l ? C.accent : 'transparent',
                    color: lang === l ? '#fff' : C.faint,
                    border: `1px solid ${lang === l ? C.accent : 'transparent'}`,
                  }}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.nav>

      {/* ── Hero ── */}
      <section id="home" className="min-h-screen flex items-center justify-center relative" style={{ zIndex: 1, overflow: 'hidden' }}>
        {/* Hero video background */}
        <video
          autoPlay muted loop playsInline
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover', opacity: 0.18, zIndex: 0,
          }}
        >
          <source src="https://res.cloudinary.com/da76ww9ps/video/upload/v1780159913/hero-bg-ikK1LdWz_cghkxm.mp4" type="video/mp4" />
        </video>
        <div className="text-center px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
            <div className="mb-3 text-xs tracking-widest uppercase" style={{ color: C.accent, fontFamily: 'Oswald, sans-serif' }}>
              {t.heroTagline}
            </div>
            <h1
              style={{
                fontFamily: 'Oswald, sans-serif',
                fontWeight: 700,
                fontSize: 'clamp(3rem, 9vw, 7rem)',
                color: C.text,
                letterSpacing: '0.04em',
                lineHeight: 1.05,
              }}
            >
              ABDULLAH
              <br />
              <span style={{ color: C.accent }}>MOHAMMAD</span>
              <br />
              MUSHTAQ
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-6 mb-10 text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ color: C.muted }}
          >
            {t.heroSubtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.9 }}
            className="flex items-center justify-center gap-4"
          >
            <TechLineButton primary onClick={() => scrollTo('contact')}>
              {t.heroCta1}
            </TechLineButton>
            <TechLineButton onClick={() => scrollTo('projects')}>
              {t.heroCta2}
            </TechLineButton>
          </motion.div>

        </div>
      </section>

      <Divider />

      {/* ── About ── */}
      <section id="about" className="py-28 px-6 relative" style={{ background: C.bg1, zIndex: 1 }}>
        <div className="max-w-6xl mx-auto">
          <SectionHeading>{t.aboutHeading}</SectionHeading>
          <div className="grid md:grid-cols-3 gap-10 items-start">
            <div className="md:col-span-2 space-y-5">
              {[t.aboutP1, t.aboutP2, t.aboutP3].map((p, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="text-base leading-relaxed"
                  style={{ color: C.muted }}
                >
                  {p}
                </motion.p>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-xl p-8 text-center"
              style={{ background: C.card, border: `1px solid ${C.border}` }}
            >
              {/* Profile Picture */}
              <div className="flex justify-center mb-5">
                <img
                  src="/profile.jpg"
                  alt="Abdullah Mohammad Mushtaq"
                  style={{ width: 120, height: 120, borderRadius: '50%', objectFit: 'cover', objectPosition: 'center 15%', border: `2px solid ${C.border}` }}
                />
              </div>
              <div className="space-y-3 text-sm" style={{ color: C.muted }}>
                {[
                  { label: t.aboutLocation, value: t.aboutLocationVal },
                  { label: t.aboutEmail, value: 'abdullah.mushtaq6876@gmail.com', link: 'mailto:abdullah.mushtaq6876@gmail.com' },
                  { label: t.aboutLinkedIn, value: t.aboutLinkedInVal, link: 'https://www.linkedin.com/in/abdullah-mohammad-mushtaq/' },
                  { label: t.aboutCerts, value: t.aboutCertsVal },
                  { label: t.aboutExp, value: t.aboutExpVal },
                  { label: t.aboutLangs, value: t.aboutLangsVal },
                ].map(r => (
                  <div key={r.label} className="flex justify-between gap-4">
                    <span style={{ color: C.faint }}>{r.label}</span>
                    {'link' in r ? (
                      <a href={r.link} target="_blank" rel="noopener noreferrer" className="text-right hover:underline" style={{ color: C.accentHi }}>{r.value}</a>
                    ) : (
                      <span className="text-right" style={{ color: C.text }}>{r.value}</span>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Divider />

      {/* ── Education ── */}
      <section id="education" className="py-28 px-6 relative" style={{ background: C.bg2, zIndex: 1 }}>
        <div className="max-w-4xl mx-auto">
          <SectionHeading>{t.eduHeading}</SectionHeading>
          <div className="space-y-6">
            {t.education.map((edu, i) => {
              const EDU_LOGOS = ['/logo-iu.png', '/logo-ict.jpg', '/logo-alhosn.png'];
              return (
              <Card key={i} delay={i * 0.1}>
                <div className="flex gap-5 items-start">
                  <div className="flex-shrink-0">
                    <img
                      src={EDU_LOGOS[i]}
                      alt="Institution logo"
                      style={{ width: 56, height: 56, objectFit: 'contain', borderRadius: 8, background: '#fff', padding: 4 }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                      <h3 style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 600, fontSize: '1.05rem', color: C.text }}>
                        {edu.degree}
                      </h3>
                      <span className="flex items-center gap-1 text-xs whitespace-nowrap flex-shrink-0" style={{ color: C.faint }}>
                        <Calendar size={12} />{edu.period}
                      </span>
                    </div>
                    <p className="text-sm mb-2 font-medium" style={{ color: C.accent }}>{edu.institution}</p>
                    <p className="text-sm leading-relaxed" style={{ color: C.muted }}>{edu.detail}</p>
                  </div>
                </div>
              </Card>
              );
            })}
          </div>
        </div>
      </section>

      <Divider />

      {/* ── Achievements ── */}
      <section id="achievements" className="py-28 px-6 relative" style={{ background: C.bg1, zIndex: 1 }}>
        <div className="max-w-6xl mx-auto">
          <SectionHeading>{t.achHeading}</SectionHeading>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              '/ach-gdgoc.jpg',
              '/ach-paktech.jpg',
              '/ach-datayard.jpg',
              '/ach-cybersecure.jpg',
              '/ach-indusai.jpg',
              '/ach-stanford.jpg',
            ].map((img, i) => {
              const a = { img, ...t.achItems[i] };
              return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className="rounded-xl overflow-hidden flex flex-col"
                style={{ background: C.card, border: `1px solid ${C.border}`, position: 'relative' }}
              >
                <TechBorderOverlay rx={12} />
                <div
                  onClick={() => setLightboxImg(a.img)}
                  style={{ height: 200, overflow: 'hidden', flexShrink: 0, position: 'relative', cursor: 'pointer' }}
                  className="group"
                >
                  <img
                    src={a.img}
                    alt={a.issuer}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', transition: 'transform 0.3s ease' }}
                    className="group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    style={{ background: 'rgba(0,0,0,0.45)' }}
                  >
                    <span className="text-white text-xs font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full" style={{ background: 'rgba(62,124,177,0.85)' }}>{t.clickToView}</span>
                  </div>
                </div>
                <div className="p-5 flex flex-col gap-2 flex-1">
                  <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: C.accent }}>{a.type}</span>
                  <h3 style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 600, fontSize: '1rem', color: C.text, lineHeight: 1.3 }}>{a.issuer}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: C.muted }}>{a.desc}</p>
                </div>
              </motion.div>
            );
            })}
          </div>
        </div>
      </section>

      <Divider />

      {/* ── Certifications ── */}
      <section id="certifications" className="py-28 px-6 relative" style={{ background: C.bg2, zIndex: 1 }}>
        <div className="max-w-7xl mx-auto">
          <SectionHeading>{t.certHeading}</SectionHeading>
          {Object.entries(certifications).map(([issuer, certs], i) => (
            <CertGroup key={issuer} issuer={issuer} certs={certs} groupIndex={i} onViewImage={setLightboxImg} />
          ))}
        </div>
      </section>

      <Divider />

      {/* ── Projects ── */}
      <section id="projects" className="py-28 px-6 relative" style={{ background: C.bg1, zIndex: 1 }}>
        <div className="max-w-7xl mx-auto">
          <SectionHeading>{t.projHeading}</SectionHeading>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.projects.map((p, i) => {
              const PROJ_IMGS = [
                '/proj-autopaper.jpg',
                '/proj-climacast.jpg',
                '/proj-encryption.jpg',
                '/proj-network.jpg',
                '/proj-phishing.jpg',
                '/proj-leafai.jpg',
              ];
              return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -4, borderColor: C.accentHi }}
                className="rounded-xl overflow-hidden"
                style={{ background: C.card, border: `1px solid ${C.border}`, transition: 'border-color 0.2s', position: 'relative' }}
              >
                <TechBorderOverlay rx={12} />
                <div
                  onClick={() => setLightboxImg(PROJ_IMGS[i])}
                  style={{ height: 150, overflow: 'hidden', position: 'relative', cursor: 'pointer' }}
                  className="group"
                >
                  <img
                    src={PROJ_IMGS[i]}
                    alt={p.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', transition: 'transform 0.3s ease' }}
                    className="group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    style={{ background: 'rgba(0,0,0,0.45)' }}
                  >
                    <span className="text-white text-xs font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full" style={{ background: 'rgba(62,124,177,0.85)' }}>{t.clickToView}</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 600, fontSize: '1rem', color: C.text, lineHeight: 1.3 }}>
                      {p.title}
                    </h3>
                    <span className="text-xs whitespace-nowrap pt-0.5" style={{ color: C.faint }}>{p.date}</span>
                  </div>
                  {p.association && (
                    <div className="flex items-center gap-1 mb-3 text-xs" style={{ color: C.accent }}>
                      <MapPin size={11} />{p.association}
                    </div>
                  )}
                  <p className="text-sm leading-relaxed mb-5" style={{ color: C.muted }}>{p.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {p.stack.map((t, ti) => <Tag key={ti}>{t}</Tag>)}
                  </div>
                </div>
              </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <Divider />

      {/* ── Experience ── */}
      <section id="experience" className="py-28 px-6 relative" style={{ background: C.bg2, zIndex: 1 }}>
        <div className="max-w-4xl mx-auto">
          <SectionHeading>{t.expHeading}</SectionHeading>
          <div className="relative pl-6 border-l" style={{ borderColor: C.border }}>
            {t.experiences.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="mb-10 relative"
              >
                {/* Timeline node */}
                <div
                  className="absolute -left-[1.85rem] top-1.5 w-3 h-3 rounded-full"
                  style={{ background: C.accent, border: `2px solid ${C.bg2}` }}
                />
                <div
                  className="rounded-xl p-6"
                  style={{ background: C.card, border: `1px solid ${C.border}` }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-1">
                    <h3 style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 600, fontSize: '1.05rem', color: C.text }}>
                      {exp.role}
                    </h3>
                    <span className="flex items-center gap-1 text-xs whitespace-nowrap" style={{ color: C.faint }}>
                      <Calendar size={11} />{exp.period}
                    </span>
                  </div>
                  <p className="text-sm font-medium mb-1" style={{ color: C.accent }}>{exp.company}</p>
                  <div className="flex items-center gap-1 mb-3 text-xs" style={{ color: C.faint }}>
                    <MapPin size={11} />{exp.location}
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: C.muted }}>{exp.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ── Skills ── */}
      <section id="skills" className="py-28 px-6 relative" style={{ background: C.bg1, zIndex: 1 }}>
        <div className="max-w-6xl mx-auto">
          <SectionHeading>{t.skillsHeading}</SectionHeading>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(t.skills).map(([cat, list], i) => (
              <motion.div
                key={cat}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-xl p-6"
                style={{ background: C.card, border: `1px solid ${C.border}` }}
              >
                <h3 className="mb-4 uppercase tracking-wider text-sm" style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 600, color: C.accent }}>
                  {cat}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {list.map((s, si) => <Tag key={si}>{s}</Tag>)}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Core Competencies */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-8 rounded-xl p-6"
            style={{ background: C.card, border: `1px solid ${C.border}` }}
          >
            <h3 className="mb-4 uppercase tracking-wider text-sm" style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 600, color: C.accent }}>
              {t.coreCompHeading}
            </h3>
            <div className="flex flex-wrap gap-2">
              {t.coreCompetencies.map((c, ci) => <Tag key={ci}>{c}</Tag>)}
            </div>
          </motion.div>
        </div>
      </section>

      <Divider />

      {/* ── Contact ── */}
      <section id="contact" className="py-28 px-6 relative" style={{ background: C.bg2, zIndex: 1, overflow: 'hidden' }}>
        {/* Video background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.42,
            zIndex: 0,
          }}
        >
          <source src="https://res.cloudinary.com/da76ww9ps/video/upload/v1780397998/security-video-BYriqXQY_nfmcn0.webm" type="video/webm" />
        </video>
        {/* Dark overlay to maintain readability */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(11,17,32,0.6) 0%, rgba(11,17,32,0.45) 100%)', zIndex: 1 }} />

        <div className="max-w-2xl mx-auto text-center" style={{ position: 'relative', zIndex: 2 }}>
          <SectionHeading>{t.contactHeading}</SectionHeading>
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="mb-10 leading-relaxed"
            style={{ color: C.muted }}
          >
            {t.contactDesc}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-4 mb-10"
          >
            {[
              { icon: Mail,      label: 'Email',     href: 'mailto:abdullah.mushtaq6876@gmail.com' },
              { icon: Linkedin,  label: 'LinkedIn',  href: 'https://www.linkedin.com/in/abdullah-mohammad-mushtaq/' },
              { icon: Github,    label: 'GitHub',    href: 'https://github.com/AbdullahMushtaq67/AbdullahMushtaq67' },
              { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/am_2k2_?igsh=MWJyc2VtMHF6cHpzMQ%3D%3D&utm_source=qr' },
              { icon: XIcon,     label: 'X',         href: 'https://x.com/__abdullah20__?s=11' },
              { icon: Facebook,  label: 'Facebook',  href: 'https://www.facebook.com/share/1ESTADtLDz/?mibextid=wwXIfr' },
            ].map((s, i) => (
              <motion.a
                key={i}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -4 }}
                className="flex flex-col items-center gap-2 p-5 rounded-xl text-xs"
                style={{
                  background: C.card,
                  border: `1px solid ${C.border}`,
                  color: C.muted,
                  transition: 'border-color 0.2s',
                  minWidth: '90px',
                }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = C.accent)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = C.border)}
              >
                <s.icon size={22} style={{ color: C.accent }} />
                {s.label}
              </motion.a>
            ))}
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="w-full text-left mb-10"
            style={{
              background: C.card,
              border: `1px solid ${C.border}`,
              borderRadius: 16,
              padding: '2rem',
            }}
          >
            <div className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 flex flex-col gap-1.5">
                  <label className="text-xs uppercase tracking-widest" style={{ color: C.faint, fontFamily: 'Oswald, sans-serif' }}>Name</label>
                  <input
                    type="text"
                    placeholder="Your name"
                    value={contactForm.name}
                    onChange={e => setContactForm(f => ({ ...f, name: e.target.value }))}
                    className="w-full rounded-lg px-4 py-2.5 text-sm outline-none"
                    style={{
                      background: C.bg1,
                      border: `1px solid ${C.border}`,
                      color: C.text,
                      transition: 'border-color 0.2s',
                    }}
                    onFocus={e => (e.currentTarget.style.borderColor = C.accent)}
                    onBlur={e => (e.currentTarget.style.borderColor = C.border)}
                  />
                </div>
                <div className="flex-1 flex flex-col gap-1.5">
                  <label className="text-xs uppercase tracking-widest" style={{ color: C.faint, fontFamily: 'Oswald, sans-serif' }}>Email</label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={contactForm.email}
                    onChange={e => setContactForm(f => ({ ...f, email: e.target.value }))}
                    className="w-full rounded-lg px-4 py-2.5 text-sm outline-none"
                    style={{
                      background: C.bg1,
                      border: `1px solid ${C.border}`,
                      color: C.text,
                      transition: 'border-color 0.2s',
                    }}
                    onFocus={e => (e.currentTarget.style.borderColor = C.accent)}
                    onBlur={e => (e.currentTarget.style.borderColor = C.border)}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs uppercase tracking-widest" style={{ color: C.faint, fontFamily: 'Oswald, sans-serif' }}>Message</label>
                <textarea
                  rows={4}
                  placeholder="Your message..."
                  value={contactForm.message}
                  onChange={e => setContactForm(f => ({ ...f, message: e.target.value }))}
                  className="w-full rounded-lg px-4 py-2.5 text-sm outline-none resize-none"
                  style={{
                    background: C.bg1,
                    border: `1px solid ${C.border}`,
                    color: C.text,
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={e => (e.currentTarget.style.borderColor = C.accent)}
                  onBlur={e => (e.currentTarget.style.borderColor = C.border)}
                />
              </div>

              {/* Send Message button with revolving border */}
              <div className="flex justify-end mt-1">
                <div style={{ position: 'relative', display: 'inline-block' }}>
                  <TechBorderOverlay rx={6} />
                  <button
                    onClick={() => {
                      const subject = encodeURIComponent(`Portfolio Contact from ${contactForm.name || 'Visitor'}`);
                      const body = encodeURIComponent(
                        `Name: ${contactForm.name}\nEmail: ${contactForm.email}\n\nMessage:\n${contactForm.message}`
                      );
                      window.open(
                        `https://mail.google.com/mail/?view=cm&fs=1&to=abdullah.mushtaq6876@gmail.com&su=${subject}&body=${body}`,
                        '_blank'
                      );
                    }}
                    className="px-8 py-3 rounded font-semibold tracking-widest text-sm uppercase"
                    style={{
                      fontFamily: 'Oswald, sans-serif',
                      background: C.accent,
                      color: '#fff',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'background 0.2s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = C.accentHi)}
                    onMouseLeave={e => (e.currentTarget.style.background = C.accent)}
                  >
                    {t.contactCta}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          <p className="mt-4 text-xs" style={{ color: C.faint }}>
            {t.contactFooter}
          </p>
        </div>
      </section>

      {/* ── Lightbox ── */}
      {lightboxImg && (
        <div
          onClick={() => setLightboxImg(null)}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'rgba(0,0,0,0.85)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '24px',
          }}
        >
          <button
            onClick={() => setLightboxImg(null)}
            style={{
              position: 'absolute', top: 20, right: 24,
              background: 'rgba(255,255,255,0.12)',
              border: 'none', borderRadius: '50%',
              width: 40, height: 40, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontSize: '1.2rem', lineHeight: 1,
            }}
          >✕</button>
          <img
            src={lightboxImg}
            alt="Achievement"
            onClick={e => e.stopPropagation()}
            style={{
              maxWidth: '90vw', maxHeight: '88vh',
              borderRadius: 12, objectFit: 'contain',
              boxShadow: '0 8px 48px rgba(0,0,0,0.6)',
            }}
          />
        </div>
      )}
    </div>
  );
}
