import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'motion/react';
import { Mail, Linkedin, Github, ChevronDown, MapPin, Calendar, ImagePlus, User, Instagram, Facebook } from 'lucide-react';

import { translations, Lang } from './translations';

function XIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
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

// ─── Main App ───────────────────────────────────────────────────────────────
export default function App() {
  const [expandedCert, setExpandedCert] = useState<string | null>(null);
  const [lang, setLang] = useState<Lang>('en');
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  const t = translations[lang];

  useEffect(() => {
    document.documentElement.setAttribute('dir', t.dir);
    document.documentElement.setAttribute('lang', lang);
  }, [lang, t.dir]);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const NAV = ['home', 'about', 'education', 'achievements', 'certifications', 'projects', 'experience', 'skills', 'contact'];

  const certifications: Record<string, string[]> = {
    IBM: [
      'IT Support Professional Certificate',
      'Cybersecurity Analyst Professional Certificate',
      'Business Intelligence Analyst',
      'Certified Data Analyst',
      'IT Project Manager',
      'System Analyst',
      'AI Product Manager',
      'AI Developer',
      'Data Management',
      'Project Manager',
    ],
    Microsoft: [
      'IT Support Specialist',
      'Cybersecurity Analyst',
      'Program Management',
      'AI Product Manager',
    ],
    Google: [
      'AI Professional Certification',
      'Cloud Network Engineer',
      'Networking in Google Cloud',
      'IT Support Professional Certificate',
      'Project Management Professional Certificate',
      'Digital Marketing Certification',
      'Cloud Certification Engineer Preparation',
      'Cybersecurity V2',
    ],
    Cisco: [
      'Introduction to Cybersecurity',
      'Ethical Hacking',
    ],
    Oracle: [
      'OCI 2025 Certified Foundations Associate',
      'OCI 2025 Certified AI Foundations Associate',
      'Oracle Certified Foundations Associate',
      'AI Vector Search Certified Professional',
      'OCI Certified Generative AI Professional',
    ],
    'HP Life': [
      'Cybersecurity Awareness',
      'Certified Ethical Hacking Awareness',
      'Project Management Specialization',
    ],
    OPSWAT: ['Critical Infrastructure Protection'],
    Rutgers: [
      'Advanced Global Procurement & Sourcing Specialization',
      'Global Procurement & Sourcing Specialization',
      'Supply Chain Management Specialization',
    ],
    'EU Cyber Academy': [
      'CSCSO – Certified SME Cyber Security Officer',
      'CRPO – Certified Ransomware Protection Officer',
    ],
    'ISC2': ['Cybersecurity Specialist (CC)'],
    'EC-Council': ['Cybersecurity for Businesses'],
    NEBOSH: ['International General Certificate in Occupational Health and Safety'],
    LEORON: ['ACGRC – Advanced Certificate in Governance, Risk and Compliance'],
    'ISO/IEC': ['ISO/IEC 27001:2022 Lead Auditor'],
    'Govt. of Punjab': ['Certified Ethical Hacker'],
    Other: [
      'ADP – Payroll Specialist',
      'Unilever – Supply Chain Data Analyst',
      'Univ. of Minnesota – Human Resource Management',
      'HRCI – Human Resource Associate',
      'Univ. of Maryland – Cybersecurity in the AI Era',
      'Alison – Diploma in Human Resources Management',
    ],
  };

  return (
    <div style={{ background: C.bg0, color: C.text, fontFamily: 'Inter, sans-serif', minHeight: '100vh', overflowX: 'hidden' }}>

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
      <section id="home" className="min-h-screen flex items-center justify-center relative" style={{ zIndex: 1 }}>
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
            <button
              onClick={() => scrollTo('contact')}
              className="px-8 py-3 rounded font-semibold tracking-widest text-sm uppercase transition-all"
              style={{
                fontFamily: 'Oswald, sans-serif',
                background: C.accent,
                color: '#fff',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = C.accentHi)}
              onMouseLeave={e => (e.currentTarget.style.background = C.accent)}
            >
              {t.heroCta1}
            </button>
            <button
              onClick={() => scrollTo('projects')}
              className="px-8 py-3 rounded font-semibold tracking-widest text-sm uppercase transition-all"
              style={{
                fontFamily: 'Oswald, sans-serif',
                background: 'transparent',
                border: `1px solid ${C.border}`,
                color: C.muted,
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = C.accent; e.currentTarget.style.color = C.text; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.muted; }}
            >
              {t.heroCta2}
            </button>
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
                  { label: t.aboutEmail, value: 'abdullah.mushtaq6876@gmail.com' },
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
              {
                img: '/ach-gdgoc.jpg',
                issuer: 'GDGoC — FAST Islamabad',
                type: 'Certificate of Appreciation',
                desc: 'Awarded by Google Developer Groups on Campus (GDGoC) at FAST Islamabad for participating in Promptopia Ver 2.0 on November 21st, 2025. The event showcased creative AI prompt engineering where participants competed in designing effective prompts for real-world applications. Recognition was signed by Campus Lead Kainat Khalid in acknowledgment of active engagement and contribution to the AI community.',
              },
              {
                img: '/ach-paktech.jpg',
                issuer: 'PakTech Nation',
                type: 'Featured Professional Recognition',
                desc: 'Featured by PakTech Nation (Pakistan Digital Youth) in collaboration with Sitearche as a skilled professional in Cybersecurity & GRC, certified in ISO 27001:2022, from Islamabad, Pakistan. The spotlight highlights outstanding contributions to Pakistan\'s digital youth landscape and professional standing as a certified cybersecurity practitioner with demonstrated expertise in governance, risk, and compliance.',
              },
              {
                img: '/ach-datayard.jpg',
                issuer: 'DataYard — Agentic AI Meetup',
                type: 'Certificate of Participation',
                desc: 'Issued by DataYard (Professional eLearning Partner) for participation in the Agentic AI Meetup Islamabad and successful completion of Claude and n8n masterclasses on AI-powered workflow automation. The event, co-hosted at CoWork with Cheezious, focused on practical agentic AI applications and automation pipelines. Signed by the Founder of AI DataYard and issued on 23rd May 2026.',
              },
              {
                img: '/ach-cybersecure.jpg',
                issuer: 'Cyber Secure Pakistan / Jang Media Group',
                type: 'Certificate of Participation',
                desc: 'Awarded jointly by Jang Media Group, Cyber Secure Pakistan, Jang Cultural Wing, and the Government of Pakistan for successfully participating in the Cyber Secure Pakistan Conference 2026. Recognized for active interest and engagement in promoting cybersecurity awareness, digital innovation, and technological advancement across Pakistan. Dated 11th March 2026.',
              },
              {
                img: '/ach-indusai.jpg',
                issuer: 'Ministry of IT & Telecom — Indus AI Week',
                type: 'Certificate of Participation',
                desc: 'Awarded for participating in the National AI Training Bootcamp organized under Indus AI Week, held from 9th–10th February 2026. The national-level initiative was organized by the Ministry of Information Technology & Telecom to enhance hands-on skills in Artificial Intelligence and emerging digital technologies. Delivered by leading industry experts in association with Tech Nation Pakistan and PSEB.',
              },
              {
                img: '/ach-stanford.jpg',
                issuer: 'Stanford University — Code in Place 2026',
                type: 'Acceptance — Top 0.1% Worldwide',
                desc: 'Selected for Stanford Code in Place 2026 from over 100,000 global applicants, placing in the top 0.1% worldwide. Offered by Leland Stanford Junior University, this prestigious program brings together exceptional learners from across the globe to study foundational programming under Stanford faculty. Recognition reflects outstanding academic potential, motivation, and commitment to innovation, creation, and impact.',
              },
            ].map((a, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className="rounded-xl overflow-hidden flex flex-col"
                style={{ background: C.card, border: `1px solid ${C.border}` }}
              >
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
                    <span className="text-white text-xs font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full" style={{ background: 'rgba(62,124,177,0.85)' }}>Click to view</span>
                  </div>
                </div>
                <div className="p-5 flex flex-col gap-2 flex-1">
                  <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: C.accent }}>{a.type}</span>
                  <h3 style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 600, fontSize: '1rem', color: C.text, lineHeight: 1.3 }}>{a.issuer}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: C.muted }}>{a.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ── Certifications ── */}
      <section id="certifications" className="py-28 px-6 relative" style={{ background: C.bg2, zIndex: 1 }}>
        <div className="max-w-7xl mx-auto">
          <SectionHeading>{t.certHeading}</SectionHeading>
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Object.entries(certifications).map(([issuer, certs], i) => (
              <motion.div
                key={issuer}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                onMouseEnter={() => setExpandedCert(issuer)}
                onMouseLeave={() => setExpandedCert(null)}
                className="rounded-xl cursor-pointer"
                style={{
                  background: C.card,
                  border: `1px solid ${expandedCert === issuer ? C.accent : C.border}`,
                  transition: 'border-color 0.2s',
                }}
              >
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <ImgPlaceholder width={36} height={36} label="" />
                    <span style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 600, color: C.text, fontSize: '0.95rem', flex: 1 }}>
                      {issuer}
                    </span>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full flex-shrink-0"
                      style={{ background: `${C.accent}33`, color: C.accentHi }}
                    >
                      {certs.length}
                    </span>
                  </div>

                  <motion.div
                    initial={false}
                    animate={{ height: expandedCert === issuer ? 'auto' : 0, opacity: expandedCert === issuer ? 1 : 0 }}
                    transition={{ duration: 0.25 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <ul className="mt-3 space-y-1.5">
                      {certs.map((c, ci) => (
                        <li key={ci} className="flex gap-2 text-xs leading-snug" style={{ color: C.muted }}>
                          <span style={{ color: C.accent, marginTop: '3px', flexShrink: 0 }}>›</span>
                          {c}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
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
                style={{ background: C.card, border: `1px solid ${C.border}`, transition: 'border-color 0.2s' }}
              >
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
                    <span className="text-white text-xs font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full" style={{ background: 'rgba(62,124,177,0.85)' }}>Click to view</span>
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
      <section id="contact" className="py-28 px-6 relative" style={{ background: C.bg2, zIndex: 1 }}>
        <div className="max-w-2xl mx-auto text-center">
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

          <motion.a
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            href="mailto:abdullah.mushtaq6876@gmail.com"
            className="inline-block px-10 py-3 rounded font-semibold tracking-widest text-sm uppercase"
            style={{
              fontFamily: 'Oswald, sans-serif',
              background: C.accent,
              color: '#fff',
            }}
            whileHover={{ backgroundColor: C.accentHi } as any}
          >
            {t.contactCta}
          </motion.a>

          <p className="mt-14 text-xs" style={{ color: C.faint }}>
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
