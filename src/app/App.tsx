import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'motion/react';
import { Mail, Linkedin, Github, ChevronDown, MapPin, Calendar, ImagePlus, User } from 'lucide-react';

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

  const projects = [
    {
      title: 'LeafAI – Plant Disease Detection & Treatment Recommender',
      date: 'Feb 2026',
      association: 'Iqra University',
      stack: ['Python', 'TensorFlow/Keras', 'MobileNetV2', 'OpenCV', 'Streamlit', 'NumPy'],
      description: 'Deep learning system to identify diseases in plant leaves using MobileNetV2 transfer learning on 16,000+ PlantVillage images. Outputs disease predictions with confidence scores via a Streamlit web app, enabling early detection for farmers and agritech professionals.',
    },
    {
      title: 'ClimaCast – Weather Forecasting PWA & Android App',
      date: 'Jan 2026',
      association: 'Iqra University',
      stack: ['React', 'TypeScript', 'Tailwind CSS', 'Capacitor', 'PWA', 'Weather API'],
      description: 'Responsive weather forecasting app built as a Progressive Web App and packaged into a native Android APK. Delivers real-time updates, hourly/daily forecasts, location detection, offline caching via service workers, and favorite city management.',
    },
    {
      title: 'Smart Encryption Web App',
      date: 'Sep 2025',
      association: 'Iqra University',
      stack: ['Python', 'Flask', 'JavaScript', 'AES/Fernet', 'Caesar Cipher'],
      description: 'Web application for encryption and decryption featuring AES (Fernet) symmetric encryption, Caesar Cipher encoding, and drag-and-drop file processing. Demonstrates applied cryptography in a practical, user-friendly interface.',
    },
    {
      title: 'Simulated Phishing & Keylogging Attack Demo',
      date: 'Aug 2025',
      stack: ['Threat Emulation', 'Security Awareness', 'MFA Advocacy', 'Risk Mitigation'],
      description: 'Cybersecurity awareness project simulating a phishing attack and keylogging demonstration to highlight human-error vulnerabilities. Produced training content on identifying fake login portals, URL verification, and building a security-first culture.',
    },
    {
      title: 'Enterprise-Level Multi-Protocol Network Design',
      date: 'Apr 2025',
      association: 'Iqra University',
      stack: ['Cisco Packet Tracer', 'OSPF', 'EIGRP', 'RIP', 'VLANs', 'DHCP'],
      description: 'Large-scale enterprise network topology integrating RIP, OSPF (Multi-Area), and EIGRP routing protocols. Features hierarchical LAN/WAN design, wireless access, Mail/DHCP servers, redundant paths for fault tolerance, and proper subnetting.',
    },
    {
      title: 'Auto Paper Formation Software',
      date: 'Feb 2025',
      stack: ['Automation', 'PDF/DOCX Export', 'LMS Integration', 'Access Control'],
      description: 'Educational software automating question paper creation with dynamic question banks, randomized generation, multi-format export (PDF, DOCX), user roles & access control, and LMS/SIS integration. Reduced paperwork by 85% and improved efficiency by 95%.',
    },
  ];

  const experiences = [
    {
      role: 'IT & Marketing Manager',
      company: 'Al Mahira Workshop W.L.L',
      period: 'Jan 2025 – Present',
      location: 'Tubli, Bahrain · Hybrid',
      description: 'Overseeing IT systems to ensure seamless operations and implementing technology solutions for business needs. Leading digital marketing strategies including social media management and brand development. Coordinating between technical and marketing teams to align objectives with technology-driven growth.',
    },
    {
      role: 'IT Support & Administrative Assistant',
      company: 'Uni Technical Services',
      period: 'Jan 2024 – Dec 2024',
      location: 'Dubai, UAE · Remote',
      description: 'Delivered comprehensive IT support by troubleshooting technical issues and assisting users with hardware and software problems. Managed administrative tasks including scheduling, record-keeping, and communications to enhance operational efficiency.',
    },
    {
      role: 'Ambassador',
      company: 'Volunteer Force Pakistan (clcglobally)',
      period: 'Jul 2024 – Oct 2024',
      location: 'Islamabad, Pakistan · Internship',
      description: 'Assisted in event planning and coordination for national-level initiatives. Supported project operations through communication and logistics tasks. Received Certificate of Appreciation for contributions at the Creative Leadership Conference.',
    },
    {
      role: 'Information Technology Consultant',
      company: 'Naqvi Associates',
      period: 'Jul 2022 – Dec 2023',
      location: 'Islamabad, Pakistan · On-site',
      description: 'Provided expert technical consulting to enhance IT systems and workflows for clients. Implemented digital solutions including system upgrades and troubleshooting processes. Collaborated on digital marketing initiatives to support online platforms and drive business growth.',
    },
    {
      role: 'Information Technology Assistant',
      company: 'Naqvi Associates',
      period: 'Nov 2021 – Apr 2022',
      location: 'Islamabad, Pakistan · Internship',
      description: 'Assisted in daily IT operations ensuring smooth system monitoring and basic troubleshooting. Provided technical guidance for end-users with hardware and software setups. Maintained IT documentation and coordinated small technical tasks within the team.',
    },
  ];

  const skills: Record<string, string[]> = {
    'Cybersecurity': ['Threat Intelligence', 'SIEM', 'Incident Response', 'Security Auditing', 'Vulnerability Assessment', 'Ethical Hacking'],
    'GRC': ['Risk Management', 'ISO 27001 Implementation', 'NIST Framework', 'Policy Development', 'Compliance Auditing'],
    'Networking': ['TCP/IP', 'VLANs', 'Routing & Switching', 'Network Security', 'Firewall Configuration', 'VPN'],
    'IT Infrastructure': ['Windows Server', 'Linux Administration', 'Active Directory', 'Cloud Infrastructure', 'System Hardening'],
    'AI & Data': ['Python', 'Machine Learning', 'TensorFlow', 'Data Analytics', 'Security Automation'],
    'Project Management': ['Agile', 'SDLC', 'Stakeholder Management', 'Digital Marketing', 'Team Leadership'],
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
          <div className="hidden md:flex gap-7 text-xs">
            {NAV.map(s => (
              <button
                key={s}
                onClick={() => scrollTo(s)}
                style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 500, letterSpacing: '0.1em', color: C.muted, textTransform: 'uppercase' }}
                className="hover:text-white transition-colors"
              >
                {s.replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>
      </motion.nav>

      {/* ── Hero ── */}
      <section id="home" className="min-h-screen flex items-center justify-center relative" style={{ zIndex: 1 }}>
        <div className="text-center px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
            <div className="mb-3 text-xs tracking-widest uppercase" style={{ color: C.accent, fontFamily: 'Oswald, sans-serif' }}>
              Cybersecurity · GRC · IT Infrastructure
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
            className="mt-6 mb-10 text-base md:text-lg max-w-xl mx-auto leading-relaxed"
            style={{ color: C.muted }}
          >
            IT Infrastructure &amp; Cybersecurity Engineer · ISO/IEC 27001:2022 Lead Auditor
            <br />
            GRC · Cloud &amp; Network Architect · Certified Project Manager
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
              Get In Touch
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
              View Projects
            </button>
          </motion.div>

          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2.2, repeat: Infinity }}
          >
            <ChevronDown size={22} style={{ color: C.faint }} />
          </motion.div>
        </div>
      </section>

      <Divider />

      {/* ── About ── */}
      <section id="about" className="py-28 px-6 relative" style={{ background: C.bg1, zIndex: 1 }}>
        <div className="max-w-6xl mx-auto">
          <SectionHeading>About Me</SectionHeading>
          <div className="grid md:grid-cols-3 gap-10 items-start">
            <div className="md:col-span-2 space-y-5">
              {[
                'Ambitious IT professional with a strong focus on Networking, Cloud, and Cybersecurity, backed by solid hands-on experience in Governance, Risk, and Compliance (GRC). Committed to delivering secure, high-performance, and future-ready IT solutions that align with regulatory frameworks and drive operational success.',
                'With certifications spanning IBM, Google, Microsoft, Oracle, Cisco, and more — including ISO/IEC 27001:2022 Lead Auditor and NEBOSH IGC — I bring both breadth and depth to every engagement.',
                'Currently pursuing a Bachelor of Computer Science at Iqra University, I continuously bridge academic theory with practical real-world implementation across security operations, network design, and AI-driven tooling.',
              ].map((p, i) => (
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
              {/* Profile Picture Placeholder */}
              <div className="flex justify-center mb-5">
                <ImgPlaceholder width={120} height={120} round label="Profile Photo" />
              </div>
              <div className="space-y-3 text-sm" style={{ color: C.muted }}>
                {[
                  { label: 'Location', value: 'Bahrain / Pakistan' },
                  { label: 'Email', value: 'abdullah.mushtaq6876@gmail.com' },
                  { label: 'LinkedIn', value: 'in/abdullah-mohammad-mushtaq', link: 'https://www.linkedin.com/in/abdullah-mohammad-mushtaq/' },
                  { label: 'Certifications', value: '46+' },
                  { label: 'Experience', value: '4+ Years' },
                  { label: 'Languages', value: 'EN · AR · UR · PK · HI · PS' },
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
          <SectionHeading>Education</SectionHeading>
          <div className="space-y-6">
            {[
              {
                degree: 'Bachelor of Computer Science',
                institution: 'Iqra University',
                period: '2023 – 2027',
                detail: 'Grade: B · Specialization in Cybersecurity, GRC, IT Infrastructure & Networking. Active in software development, data structures, algorithms, and AI projects applying theoretical knowledge to real-world problems.',
              },
              {
                degree: 'Diploma of Associate Engineering in Computer Information Technology',
                institution: 'Iqra College of Technology & Skills (under International Islamic University, Islamabad)',
                period: 'Jan 2019 – Jun 2022',
                detail: 'Grade: B · Rigorous curriculum combining in-depth theoretical knowledge with extensive practical applications. Developed proficiency in C++, Java, and Python, with a strong focus on hardware, networking, and IT systems.',
              },
              {
                degree: 'Diploma in Human Resources Management and Services',
                institution: 'Alison',
                period: 'Apr 2024 – Present',
                detail: 'Grade: Pass · Focus on employee relations, recruitment, performance management, and strategic HR planning. Applied theoretical knowledge to complex organizational dynamics and HR challenges.',
              },
            ].map((edu, i) => (
              <Card key={i} delay={i * 0.1}>
                <div className="flex gap-5 items-start">
                  <div className="flex-shrink-0">
                    <ImgPlaceholder width={56} height={56} label="Logo" />
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
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ── Achievements ── */}
      <section id="achievements" className="py-28 px-6 relative" style={{ background: C.bg1, zIndex: 1 }}>
        <div className="max-w-6xl mx-auto">
          <SectionHeading>Achievements</SectionHeading>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {[
              { number: '46+',  label: 'Professional Certifications' },
              { number: '6',    label: 'Projects Delivered' },
              { number: '4+',   label: 'Years of Experience' },
              { number: '15+',  label: 'Industry Tools Mastered' },
              { number: '6',    label: 'Languages Spoken' },
              { number: '85%',  label: 'Paperwork Reduced via Automation' },
            ].map((a, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className="rounded-xl overflow-hidden"
                style={{ background: C.card, border: `1px solid ${C.border}` }}
              >
                <ImgPlaceholder height={100} label="Achievement Image" />
                <div className="p-6 text-center">
                  <div
                    style={{
                      fontFamily: 'Oswald, sans-serif',
                      fontWeight: 700,
                      fontSize: '2.4rem',
                      color: C.accent,
                      lineHeight: 1,
                    }}
                  >
                    {a.number}
                  </div>
                  <div className="mt-2 text-sm" style={{ color: C.muted }}>{a.label}</div>
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
          <SectionHeading>Certifications</SectionHeading>
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
          <SectionHeading>Projects</SectionHeading>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p, i) => (
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
                <ImgPlaceholder height={150} label="Project Screenshot" />
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
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ── Experience ── */}
      <section id="experience" className="py-28 px-6 relative" style={{ background: C.bg2, zIndex: 1 }}>
        <div className="max-w-4xl mx-auto">
          <SectionHeading>Experience</SectionHeading>
          <div className="relative pl-6 border-l" style={{ borderColor: C.border }}>
            {experiences.map((exp, i) => (
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
          <SectionHeading>Skills</SectionHeading>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(skills).map(([cat, list], i) => (
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
              Core Competencies
            </h3>
            <div className="flex flex-wrap gap-2">
              {[
                'IT Support & Troubleshooting', 'Network Administration', 'Cloud Computing',
                'Cybersecurity & Threat Management', 'ISO 27001 Implementation', 'Digital Marketing',
                'Social Media Management', 'Business Intelligence', 'IT Project Management',
                'AI & Emerging Technologies', 'Cross-functional Team Collaboration', 'Stakeholder Management',
              ].map((c, ci) => <Tag key={ci}>{c}</Tag>)}
            </div>
          </motion.div>
        </div>
      </section>

      <Divider />

      {/* ── Contact ── */}
      <section id="contact" className="py-28 px-6 relative" style={{ background: C.bg2, zIndex: 1 }}>
        <div className="max-w-2xl mx-auto text-center">
          <SectionHeading>Let's Connect</SectionHeading>
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="mb-10 leading-relaxed"
            style={{ color: C.muted }}
          >
            Open to cybersecurity opportunities, GRC consulting, network architecture projects, or knowledge exchange. Reach out through any channel below.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="flex justify-center gap-5 mb-10"
          >
            {[
              { icon: Mail,     label: 'Email',    href: 'mailto:abdullah.mushtaq6876@gmail.com' },
              { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/abdullah-mohammad-mushtaq/' },
              { icon: Github,   label: 'GitHub',   href: 'https://github.com/AbdullahMushtaq67' },
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
            Send Message
          </motion.a>

          <p className="mt-14 text-xs" style={{ color: C.faint }}>
            © 2026 Abdullah Mohammad Mushtaq · All rights reserved.
          </p>
        </div>
      </section>
    </div>
  );
}
