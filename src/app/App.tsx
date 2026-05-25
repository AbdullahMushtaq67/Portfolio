import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Mail, Linkedin, Github, ChevronDown } from 'lucide-react';

export default function App() {
  const [expandedCert, setExpandedCert] = useState<string | null>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const certifications = {
    IBM: [
      'Cybersecurity Analyst Professional Certificate',
      'Threat Intelligence Analyst',
      'Penetration Testing and Incident Response',
      'Compliance Framework & System Administration'
    ],
    Google: [
      'Cybersecurity Professional Certificate',
      'IT Support Professional Certificate',
      'Data Analytics Professional Certificate'
    ],
    Microsoft: [
      'Azure Fundamentals (AZ-900)',
      'Security, Compliance, and Identity Fundamentals (SC-900)',
      'Azure AI Fundamentals (AI-900)'
    ],
    Oracle: [
      'Oracle Cloud Infrastructure Foundations',
      'Oracle Database SQL Certified Associate'
    ],
    Cisco: [
      'Introduction to Cybersecurity',
      'Networking Basics',
      'Cybersecurity Essentials',
      'Network Defense'
    ],
    'HP Life': [
      'Digital Literacy',
      'IT Project Management',
      'Business Strategy and Leadership'
    ],
    OPSWAT: [
      'Introduction to Critical Infrastructure Protection (ICIP)',
      'Critical Infrastructure Security Professional'
    ],
    Rutgers: [
      'Cybersecurity Foundations',
      'Network Security & Database Vulnerabilities'
    ],
    'EC-Council': [
      'Ethical Hacking Essentials',
      'Network Defense Essentials',
      'Digital Forensics Essentials'
    ],
    'ISC2': [
      'Certified in Cybersecurity (CC)'
    ],
    NEBOSH: [
      'International General Certificate in Occupational Health and Safety'
    ]
  };

  const projects = [
    {
      title: 'Security Operations Center (SOC) Simulation',
      stack: ['SIEM', 'Splunk', 'Python', 'Wireshark'],
      description: 'Built enterprise-grade SOC environment for threat detection and incident response'
    },
    {
      title: 'GRC Framework Implementation',
      stack: ['NIST', 'ISO 27001', 'Risk Management', 'Compliance'],
      description: 'Developed comprehensive governance framework for IT infrastructure compliance'
    },
    {
      title: 'Network Infrastructure Design',
      stack: ['Cisco', 'VLANs', 'Routing', 'Firewalls'],
      description: 'Designed multi-layer enterprise network with advanced security protocols'
    },
    {
      title: 'Vulnerability Assessment Platform',
      stack: ['Nmap', 'Metasploit', 'Burp Suite', 'OWASP'],
      description: 'Automated vulnerability scanning and reporting system for web applications'
    },
    {
      title: 'Cloud Security Architecture',
      stack: ['Azure', 'AWS', 'IAM', 'Zero Trust'],
      description: 'Implemented zero-trust security model for hybrid cloud infrastructure'
    },
    {
      title: 'Incident Response Automation',
      stack: ['SOAR', 'Python', 'Threat Intelligence', 'Playbooks'],
      description: 'Automated incident response workflows reducing MTTR by 60%'
    }
  ];

  const experiences = [
    {
      role: 'Cybersecurity Analyst Intern',
      company: 'SecureNet Solutions',
      period: '2025 - Present',
      description: 'Conducted security assessments and implemented defense strategies'
    },
    {
      role: 'Network Security Associate',
      company: 'TechGuard Infrastructure',
      period: '2024 - 2025',
      description: 'Managed firewall configurations and network security monitoring'
    },
    {
      role: 'IT Infrastructure Volunteer',
      company: 'University Technology Center',
      period: '2023 - 2024',
      description: 'Maintained campus network infrastructure and supported cybersecurity initiatives'
    }
  ];

  const skills = {
    'Cybersecurity': ['Penetration Testing', 'Threat Intelligence', 'SIEM', 'Incident Response', 'Security Auditing', 'Vulnerability Assessment'],
    'GRC': ['Risk Management', 'Compliance (NIST, ISO 27001)', 'Policy Development', 'Security Frameworks', 'Audit & Assessment'],
    'Networking': ['TCP/IP', 'VLANs', 'Routing & Switching', 'Network Security', 'Firewall Configuration', 'VPN'],
    'IT Infrastructure': ['Windows Server', 'Linux Administration', 'Active Directory', 'Cloud Infrastructure', 'System Hardening'],
    'AI & Data': ['Python', 'Machine Learning', 'Data Analytics', 'Threat Modeling', 'Security Automation'],
    'Project Management': ['Agile', 'SDLC', 'Documentation', 'Team Collaboration', 'Stakeholder Management']
  };

  return (
    <div className="min-h-screen bg-black overflow-x-hidden" style={{ fontFamily: 'Tenor Sans, sans-serif' }}>
      {/* Animated Background Grid */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(#029AFF 1px, transparent 1px),
            linear-gradient(90deg, #029AFF 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg"
        style={{
          borderBottom: '1px solid transparent',
          borderImage: 'linear-gradient(90deg, #04044A 0%, #029AFF 25%, #00FFFF 50%, #029AFF 75%, #04044A 100%) 1'
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div
            className="text-xl tracking-widest text-[#00FFFF]"
            style={{ fontFamily: 'Suranna, serif' }}
            whileHover={{ textShadow: '0 0 20px #00FFFF' }}
          >
            AMM
          </motion.div>
          <div className="flex gap-8 text-sm">
            {['home', 'about', 'education', 'achievements', 'certifications', 'projects', 'experience', 'skills', 'contact'].map((section) => (
              <motion.button
                key={section}
                onClick={() => scrollToSection(section)}
                className="text-white/80 hover:text-[#00FFFF] transition-colors uppercase tracking-wider"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {section.replace('-', ' ')}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Radial Gradient Background */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at center bottom, #029AFF 0%, #000675 40%, #000000 100%)'
        }} />

        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#00FFFF] rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 1, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}

        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <motion.h1
              className="text-7xl md:text-9xl mb-6 text-white tracking-wide"
              style={{
                fontFamily: 'Suranna, serif',
                textShadow: '0 0 40px #00FFFF, 0 0 80px #00FFFF, 0 0 120px #00FFFF'
              }}
              animate={{
                textShadow: [
                  '0 0 40px #00FFFF, 0 0 80px #00FFFF',
                  '0 0 60px #00FFFF, 0 0 120px #00FFFF',
                  '0 0 40px #00FFFF, 0 0 80px #00FFFF'
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <span className="text-[#00FFFF]">Abdullah Mohammad</span>
              <br />
              <span className="text-[#00FFFF]">Mushtaq</span>
            </motion.h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-xl md:text-2xl text-white/90 mb-12 tracking-wide"
          >
            BS Computer Science · Cybersecurity Specialist
            <br />
            GRC · IT Infrastructure & Networking
          </motion.p>

          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            onClick={() => scrollToSection('contact')}
            className="px-12 py-4 rounded-full text-white font-semibold tracking-wider relative overflow-hidden group"
            style={{
              background: 'linear-gradient(135deg, #029AFF 0%, #00FFFF 100%)',
              boxShadow: '0 0 30px rgba(0, 255, 255, 0.5)'
            }}
            whileHover={{
              scale: 1.05,
              boxShadow: '0 0 50px rgba(0, 255, 255, 0.8)'
            }}
            whileTap={{ scale: 0.95 }}
          >
            GET IN TOUCH
          </motion.button>

          <motion.div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown className="w-8 h-8 text-[#00FFFF]" />
          </motion.div>
        </div>
      </section>

      {/* Gradient Divider */}
      <div className="h-1" style={{
        background: 'linear-gradient(90deg, #04044A 0%, #029AFF 25%, #00FFFF 50%, #029AFF 75%, #04044A 100%)'
      }} />

      {/* About Me Section */}
      <section id="about" className="min-h-screen flex items-center py-32 px-6" style={{ background: '#000675' }}>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-6xl mb-8 text-[#00FFFF] tracking-wider" style={{ fontFamily: 'Suranna, serif' }}>
              About Me
            </h2>
            <p className="text-white/80 text-lg leading-relaxed mb-6">
              I am a dedicated Computer Science student with a specialized focus on Cybersecurity, Governance Risk & Compliance (GRC),
              and IT Infrastructure & Networking. My passion lies in protecting digital assets and building resilient security architectures
              that safeguard organizations against evolving cyber threats.
            </p>
            <p className="text-white/80 text-lg leading-relaxed mb-6">
              With hands-on experience in penetration testing, incident response, and security framework implementation, I combine
              theoretical knowledge with practical expertise. I am committed to continuous learning and staying ahead of the latest
              security trends and technologies.
            </p>
            <p className="text-white/80 text-lg leading-relaxed">
              My goal is to contribute to the cybersecurity field by developing innovative solutions that address complex security
              challenges while ensuring compliance with industry standards and best practices.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div
              className="p-12 rounded-2xl backdrop-blur-xl"
              style={{
                background: 'linear-gradient(135deg, rgba(0, 6, 117, 0.6) 0%, rgba(4, 4, 74, 0.6) 100%)',
                border: '2px solid #029AFF',
                boxShadow: '0 0 40px rgba(2, 154, 255, 0.3)'
              }}
            >
              <div className="aspect-square bg-gradient-to-br from-[#029AFF] to-[#00FFFF] rounded-full flex items-center justify-center text-white text-8xl" style={{ fontFamily: 'Suranna, serif' }}>
                AMM
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gradient Divider */}
      <div className="h-1" style={{
        background: 'linear-gradient(90deg, #04044A 0%, #029AFF 25%, #00FFFF 50%, #029AFF 75%, #04044A 100%)'
      }} />

      {/* Education Section */}
      <section id="education" className="min-h-screen py-32 px-6" style={{ background: '#04044A' }}>
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-6xl mb-20 text-[#00FFFF] tracking-wider text-center"
            style={{ fontFamily: 'Suranna, serif' }}
          >
            Education
          </motion.h2>

          <div className="relative">
            {/* Gradient Timeline Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 transform -translate-x-1/2" style={{
              background: 'linear-gradient(180deg, #029AFF 0%, #00FFFF 100%)'
            }} />

            {[
              {
                degree: 'Bachelor of Science in Computer Science',
                institution: 'University Name',
                period: '2022 - 2026',
                focus: 'Specialization: Cybersecurity, GRC, IT Infrastructure & Networking'
              },
              {
                degree: 'Higher Secondary Certificate',
                institution: 'School Name',
                period: '2020 - 2022',
                focus: 'Focus: Computer Science & Mathematics'
              }
            ].map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className={`relative mb-16 ${index % 2 === 0 ? 'pr-1/2' : 'pl-1/2 ml-auto'} w-1/2`}
              >
                {/* Glowing Node */}
                <div
                  className="absolute top-1/2 w-6 h-6 rounded-full transform -translate-y-1/2"
                  style={{
                    [index % 2 === 0 ? 'right' : 'left']: '-13px',
                    background: '#00FFFF',
                    boxShadow: '0 0 20px #00FFFF'
                  }}
                />

                <div
                  className="p-8 rounded-xl backdrop-blur-xl"
                  style={{
                    background: 'linear-gradient(135deg, rgba(0, 6, 117, 0.4) 0%, rgba(4, 4, 74, 0.4) 100%)',
                    border: '1px solid #029AFF',
                    boxShadow: '0 0 30px rgba(2, 154, 255, 0.2)'
                  }}
                >
                  <h3 className="text-2xl text-white mb-2" style={{ fontFamily: 'Suranna, serif' }}>
                    {edu.degree}
                  </h3>
                  <p className="text-[#029AFF] text-lg mb-2">{edu.institution}</p>
                  <p className="text-[#00FFFF] text-sm mb-3">{edu.period}</p>
                  <p className="text-white/70">{edu.focus}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gradient Divider */}
      <div className="h-1" style={{
        background: 'linear-gradient(90deg, #04044A 0%, #029AFF 25%, #00FFFF 50%, #029AFF 75%, #04044A 100%)'
      }} />

      {/* Achievements Section */}
      <section id="achievements" className="min-h-screen py-32 px-6" style={{ background: '#000675' }}>
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-6xl mb-20 text-[#00FFFF] tracking-wider text-center"
            style={{ fontFamily: 'Suranna, serif' }}
          >
            Achievements
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { number: '35+', label: 'Professional Certifications' },
              { number: '10+', label: 'Security Projects' },
              { number: '15+', label: 'Industry Tools Mastered' },
              { number: '3+', label: 'Years of Experience' },
              { number: '100%', label: 'Commitment to Excellence' },
              { number: '24/7', label: 'Security Mindset' }
            ].map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="p-10 rounded-xl backdrop-blur-xl text-center"
                style={{
                  background: 'linear-gradient(135deg, rgba(0, 6, 117, 0.5) 0%, rgba(4, 4, 74, 0.5) 100%)',
                  border: '2px solid #029AFF',
                  boxShadow: '0 0 30px rgba(2, 154, 255, 0.3)'
                }}
              >
                <div
                  className="text-7xl mb-4 text-[#00FFFF]"
                  style={{
                    fontFamily: 'Suranna, serif',
                    textShadow: '0 0 30px #00FFFF'
                  }}
                >
                  {achievement.number}
                </div>
                <div className="text-white/90 text-lg tracking-wide">
                  {achievement.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gradient Divider */}
      <div className="h-1" style={{
        background: 'linear-gradient(90deg, #04044A 0%, #029AFF 25%, #00FFFF 50%, #029AFF 75%, #04044A 100%)'
      }} />

      {/* Certifications Section */}
      <section id="certifications" className="min-h-screen py-32 px-6" style={{ background: '#04044A' }}>
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-6xl mb-20 text-[#00FFFF] tracking-wider text-center"
            style={{ fontFamily: 'Suranna, serif' }}
          >
            Certifications
          </motion.h2>

          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Object.entries(certifications).map(([issuer, certs], index) => (
              <motion.div
                key={issuer}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                onMouseEnter={() => setExpandedCert(issuer)}
                onMouseLeave={() => setExpandedCert(null)}
                className="relative"
              >
                <motion.div
                  className="p-6 rounded-xl backdrop-blur-xl cursor-pointer h-full"
                  style={{
                    background: 'linear-gradient(135deg, rgba(0, 6, 117, 0.5) 0%, rgba(4, 4, 74, 0.5) 100%)',
                    border: '2px solid #029AFF',
                    boxShadow: expandedCert === issuer ? '0 0 40px rgba(0, 255, 255, 0.6)' : '0 0 20px rgba(2, 154, 255, 0.3)'
                  }}
                  whileHover={{
                    scale: 1.02,
                    borderColor: '#00FFFF'
                  }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-2xl text-white" style={{ fontFamily: 'Suranna, serif' }}>
                      {issuer}
                    </h3>
                    <div
                      className="px-3 py-1 rounded-full text-sm text-white"
                      style={{
                        background: 'linear-gradient(135deg, #029AFF 0%, #00FFFF 100%)'
                      }}
                    >
                      {certs.length}
                    </div>
                  </div>

                  {/* Expanded List */}
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                      height: expandedCert === issuer ? 'auto' : 0,
                      opacity: expandedCert === issuer ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 space-y-2">
                      {certs.map((cert, certIndex) => (
                        <motion.div
                          key={certIndex}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{
                            opacity: expandedCert === issuer ? 1 : 0,
                            x: expandedCert === issuer ? 0 : -10
                          }}
                          transition={{ delay: certIndex * 0.05 }}
                          className="flex items-start gap-2 text-white/80 text-sm"
                        >
                          <div
                            className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                            style={{
                              background: '#00FFFF',
                              boxShadow: '0 0 10px #00FFFF'
                            }}
                          />
                          <span>{cert}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gradient Divider */}
      <div className="h-1" style={{
        background: 'linear-gradient(90deg, #04044A 0%, #029AFF 25%, #00FFFF 50%, #029AFF 75%, #04044A 100%)'
      }} />

      {/* Projects Section */}
      <section id="projects" className="min-h-screen py-32 px-6" style={{ background: '#000675' }}>
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-6xl mb-20 text-[#00FFFF] tracking-wider text-center"
            style={{ fontFamily: 'Suranna, serif' }}
          >
            Projects
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{
                  y: -10,
                  boxShadow: '0 20px 60px rgba(0, 255, 255, 0.4)'
                }}
                className="p-8 rounded-xl backdrop-blur-xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(0, 6, 117, 0.5) 0%, rgba(4, 4, 74, 0.5) 100%)',
                  border: '2px solid #029AFF'
                }}
              >
                <h3 className="text-2xl text-white mb-4" style={{ fontFamily: 'Suranna, serif' }}>
                  {project.title}
                </h3>
                <p className="text-white/70 mb-6 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 rounded-full text-sm text-[#00FFFF] border border-[#00FFFF]"
                      style={{
                        boxShadow: '0 0 10px rgba(0, 255, 255, 0.3)'
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gradient Divider */}
      <div className="h-1" style={{
        background: 'linear-gradient(90deg, #04044A 0%, #029AFF 25%, #00FFFF 50%, #029AFF 75%, #04044A 100%)'
      }} />

      {/* Experience Section */}
      <section id="experience" className="min-h-screen py-32 px-6" style={{ background: '#04044A' }}>
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-6xl mb-20 text-[#00FFFF] tracking-wider text-center"
            style={{ fontFamily: 'Suranna, serif' }}
          >
            Experience
          </motion.h2>

          <div className="relative">
            {/* Gradient Timeline Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 transform -translate-x-1/2" style={{
              background: 'linear-gradient(180deg, #029AFF 0%, #00FFFF 100%)'
            }} />

            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className={`relative mb-16 ${index % 2 === 0 ? 'pr-1/2' : 'pl-1/2 ml-auto'} w-1/2`}
              >
                {/* Glowing Node */}
                <div
                  className="absolute top-1/2 w-6 h-6 rounded-full transform -translate-y-1/2"
                  style={{
                    [index % 2 === 0 ? 'right' : 'left']: '-13px',
                    background: '#00FFFF',
                    boxShadow: '0 0 20px #00FFFF'
                  }}
                />

                <div
                  className="p-8 rounded-xl backdrop-blur-xl"
                  style={{
                    background: 'linear-gradient(135deg, rgba(0, 6, 117, 0.4) 0%, rgba(4, 4, 74, 0.4) 100%)',
                    border: '1px solid #029AFF',
                    boxShadow: '0 0 30px rgba(2, 154, 255, 0.2)'
                  }}
                >
                  <h3 className="text-2xl text-white mb-2" style={{ fontFamily: 'Suranna, serif' }}>
                    {exp.role}
                  </h3>
                  <p className="text-[#029AFF] text-lg mb-2">{exp.company}</p>
                  <p className="text-[#00FFFF] text-sm mb-3">{exp.period}</p>
                  <p className="text-white/70">{exp.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gradient Divider */}
      <div className="h-1" style={{
        background: 'linear-gradient(90deg, #04044A 0%, #029AFF 25%, #00FFFF 50%, #029AFF 75%, #04044A 100%)'
      }} />

      {/* Skills Section */}
      <section id="skills" className="min-h-screen py-32 px-6" style={{ background: '#000675' }}>
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-6xl mb-20 text-[#00FFFF] tracking-wider text-center"
            style={{ fontFamily: 'Suranna, serif' }}
          >
            Skills
          </motion.h2>

          <div className="space-y-12">
            {Object.entries(skills).map(([category, skillList], index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <h3 className="text-3xl text-[#029AFF] mb-6" style={{ fontFamily: 'Suranna, serif' }}>
                  {category}
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {skillList.map((skill, skillIndex) => (
                    <motion.div
                      key={skillIndex}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + skillIndex * 0.05 }}
                      whileHover={{
                        scale: 1.05,
                        boxShadow: '0 0 30px rgba(0, 255, 255, 0.5)'
                      }}
                      className="p-4 rounded-lg backdrop-blur-xl"
                      style={{
                        background: 'linear-gradient(135deg, rgba(0, 6, 117, 0.3) 0%, rgba(4, 4, 74, 0.3) 100%)',
                        border: '1px solid #029AFF'
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{
                            background: 'linear-gradient(135deg, #029AFF 0%, #00FFFF 100%)',
                            boxShadow: '0 0 15px #00FFFF'
                          }}
                        />
                        <span className="text-white">{skill}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gradient Divider */}
      <div className="h-1" style={{
        background: 'linear-gradient(90deg, #04044A 0%, #029AFF 25%, #00FFFF 50%, #029AFF 75%, #04044A 100%)'
      }} />

      {/* Contact Section */}
      <section id="contact" className="min-h-screen flex items-center py-32 px-6 relative" style={{ background: '#000000' }}>
        {/* Radiant Glow Background */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className="w-[800px] h-[800px] rounded-full opacity-20"
            style={{
              background: 'radial-gradient(circle, #00FFFF 0%, transparent 70%)',
              filter: 'blur(100px)'
            }}
          />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-6xl mb-8 text-[#00FFFF] tracking-wider"
            style={{
              fontFamily: 'Suranna, serif',
              textShadow: '0 0 40px #00FFFF'
            }}
          >
            Let's Connect
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/80 text-xl mb-12 leading-relaxed"
          >
            I'm always open to discussing cybersecurity opportunities, collaboration on security projects,
            or sharing knowledge about the latest threats and defensive strategies.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex justify-center gap-8 mb-12"
          >
            {[
              { icon: Mail, label: 'Email', link: 'mailto:abdullah@example.com' },
              { icon: Linkedin, label: 'LinkedIn', link: 'https://linkedin.com/in/abdullah-mushtaq' },
              { icon: Github, label: 'GitHub', link: 'https://github.com/abdullah-mushtaq' }
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{
                  scale: 1.1,
                  boxShadow: '0 0 40px rgba(0, 255, 255, 0.8)'
                }}
                whileTap={{ scale: 0.9 }}
                className="p-6 rounded-full backdrop-blur-xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(2, 154, 255, 0.2) 0%, rgba(0, 255, 255, 0.2) 100%)',
                  border: '2px solid #029AFF',
                  boxShadow: '0 0 20px rgba(0, 255, 255, 0.3)'
                }}
              >
                <social.icon className="w-8 h-8 text-[#00FFFF]" />
              </motion.a>
            ))}
          </motion.div>

          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            onClick={() => window.location.href = 'mailto:abdullah@example.com'}
            className="px-16 py-5 rounded-full text-white text-lg font-semibold tracking-wider"
            style={{
              background: 'linear-gradient(135deg, #029AFF 0%, #00FFFF 100%)',
              boxShadow: '0 0 40px rgba(0, 255, 255, 0.6)'
            }}
            whileHover={{
              scale: 1.05,
              boxShadow: '0 0 60px rgba(0, 255, 255, 0.9)'
            }}
            whileTap={{ scale: 0.95 }}
          >
            SEND MESSAGE
          </motion.button>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="mt-16 text-white/50 text-sm"
          >
            © 2026 Abdullah Mohammad Mushtaq. All rights reserved.
          </motion.p>
        </div>
      </section>
    </div>
  );
}
