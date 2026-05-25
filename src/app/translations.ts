export type Lang = 'en' | 'ar' | 'de';

export const translations = {
  en: {
    // Nav
    nav: ['home', 'about', 'education', 'achievements', 'certifications', 'projects', 'experience', 'skills', 'contact'],
    navLabels: {
      home: 'Home', about: 'About', education: 'Education',
      achievements: 'Achievements', certifications: 'Certifications',
      projects: 'Projects', experience: 'Experience', skills: 'Skills', contact: 'Contact',
    },

    // Hero
    heroTagline: 'Cybersecurity  ·  GRC  ·  IT Infrastructure',
    heroSubtitle: 'Protecting critical infrastructure through cybersecurity expertise and strategic risk governance. Trusted to secure networks, lead compliance programs and architect resilient systems.',
    heroCta1: 'Get In Touch',
    heroCta2: 'View Projects',

    // About
    aboutHeading: 'About Me',
    aboutP1: 'Ambitious IT professional with a strong focus on Networking, Cloud and Cybersecurity, backed by solid hands-on experience in Governance, Risk and Compliance. Committed to delivering secure, high-performance and future-ready IT solutions that align with regulatory frameworks and drive operational success.',
    aboutP2: 'Holding certifications from IBM, Google, Microsoft, Oracle, Cisco and more, including ISO/IEC 27001:2022 Lead Auditor and NEBOSH IGC, I bring both breadth and depth to every engagement.',
    aboutP3: 'Currently pursuing a Bachelor of Computer Science at Iqra University, I continuously bridge academic theory with practical real-world implementation across security operations, network design and AI-driven tooling.',
    aboutLocation: 'Location',
    aboutLocationVal: 'Bahrain / Pakistan',
    aboutEmail: 'Email',
    aboutLinkedIn: 'LinkedIn',
    aboutLinkedInVal: 'in/abdullah-mohammad-mushtaq',
    aboutCerts: 'Certifications',
    aboutCertsVal: '46+',
    aboutExp: 'Experience',
    aboutExpVal: '4+ Years',
    aboutLangs: 'Languages',
    aboutLangsVal: 'EN · AR · UR · PK · HI · PS',

    // Education
    eduHeading: 'Education',

    // Achievements
    achHeading: 'Achievements',
    achLabels: [
      'Professional Certifications',
      'Projects Delivered',
      'Years of Experience',
      'Industry Tools Mastered',
      'Languages Spoken',
      'Paperwork Reduced via Automation',
    ],

    // Certifications
    certHeading: 'Certifications',

    // Projects
    projHeading: 'Projects',

    // Experience
    expHeading: 'Experience',

    // Skills
    skillsHeading: 'Skills',
    coreCompHeading: 'Core Competencies',

    // Contact
    contactHeading: "Let's Connect",
    contactDesc: 'Open to cybersecurity opportunities, GRC consulting, network architecture projects or knowledge exchange. Reach out through any channel below.',
    contactCta: 'Send Message',
    contactFooter: '© 2026 Abdullah Mohammad Mushtaq. All rights reserved.',

    // Language names
    langName: 'English',
    dir: 'ltr' as const,
  },

  ar: {
    nav: ['home', 'about', 'education', 'achievements', 'certifications', 'projects', 'experience', 'skills', 'contact'],
    navLabels: {
      home: 'الرئيسية', about: 'عني', education: 'التعليم',
      achievements: 'الإنجازات', certifications: 'الشهادات',
      projects: 'المشاريع', experience: 'الخبرة', skills: 'المهارات', contact: 'تواصل',
    },

    heroTagline: 'الأمن السيبراني  ·  إدارة المخاطر  ·  البنية التحتية',
    heroSubtitle: 'حماية البنية التحتية الحيوية من خلال الخبرة في الأمن السيبراني وإدارة المخاطر الاستراتيجية. موثوق لتأمين الشبكات وقيادة برامج الامتثال وتصميم أنظمة متينة.',
    heroCta1: 'تواصل معي',
    heroCta2: 'استعرض المشاريع',

    aboutHeading: 'عني',
    aboutP1: 'متخصص تقنية معلومات طموح مع تركيز قوي على الشبكات والحوسبة السحابية والأمن السيبراني، مدعوم بخبرة عملية راسخة في الحوكمة والمخاطر والامتثال. ملتزم بتقديم حلول تقنية آمنة وعالية الأداء ومستقبلية تتوافق مع الأطر التنظيمية.',
    aboutP2: 'أحمل شهادات من IBM وGoogle وMicrosoft وOracle وCisco وغيرها، بما فيها ISO/IEC 27001:2022 كمدقق رائد وNEBOSH IGC، مما يمنحني عمقاً واتساعاً في كل مشاركة.',
    aboutP3: 'أواصل حالياً دراسة البكالوريوس في علوم الحاسوب بجامعة إقرا، وأحرص على ربط النظرية الأكاديمية بالتطبيق العملي في مجالات عمليات الأمن وتصميم الشبكات والأدوات المدعومة بالذكاء الاصطناعي.',
    aboutLocation: 'الموقع',
    aboutLocationVal: 'البحرين / باكستان',
    aboutEmail: 'البريد الإلكتروني',
    aboutLinkedIn: 'لينكد إن',
    aboutLinkedInVal: 'in/abdullah-mohammad-mushtaq',
    aboutCerts: 'الشهادات',
    aboutCertsVal: '46+',
    aboutExp: 'الخبرة',
    aboutExpVal: 'أكثر من 4 سنوات',
    aboutLangs: 'اللغات',
    aboutLangsVal: 'EN · AR · UR · PK · HI · PS',

    eduHeading: 'التعليم',
    achHeading: 'الإنجازات',
    achLabels: [
      'شهادة مهنية',
      'مشاريع منجزة',
      'سنوات من الخبرة',
      'أدوات متقنة',
      'لغات متحدث بها',
      'تقليص في الأعمال الورقية',
    ],

    certHeading: 'الشهادات',
    projHeading: 'المشاريع',
    expHeading: 'الخبرة',
    skillsHeading: 'المهارات',
    coreCompHeading: 'الكفاءات الأساسية',

    contactHeading: 'تواصل معي',
    contactDesc: 'مفتوح لفرص الأمن السيبراني واستشارات إدارة المخاطر ومشاريع بنية الشبكات وتبادل المعرفة. تواصل معي عبر أي قناة أدناه.',
    contactCta: 'أرسل رسالة',
    contactFooter: '© 2026 عبدالله محمد مشتاق. جميع الحقوق محفوظة.',

    langName: 'العربية',
    dir: 'rtl' as const,
  },

  de: {
    nav: ['home', 'about', 'education', 'achievements', 'certifications', 'projects', 'experience', 'skills', 'contact'],
    navLabels: {
      home: 'Start', about: 'Uber mich', education: 'Ausbildung',
      achievements: 'Leistungen', certifications: 'Zertifikate',
      projects: 'Projekte', experience: 'Erfahrung', skills: 'Fahigkeiten', contact: 'Kontakt',
    },

    heroTagline: 'Cybersicherheit  ·  GRC  ·  IT-Infrastruktur',
    heroSubtitle: 'Schutz kritischer Infrastrukturen durch Cybersicherheits-Expertise und strategisches Risikomanagement. Vertrauenswurdig bei der Absicherung von Netzwerken, der Leitung von Compliance-Programmen und dem Aufbau widerstandsfahiger Systeme.',
    heroCta1: 'Kontakt aufnehmen',
    heroCta2: 'Projekte ansehen',

    aboutHeading: 'Uber mich',
    aboutP1: 'Ambitionierter IT-Fachmann mit Schwerpunkt auf Netzwerke, Cloud und Cybersicherheit, gestuetzt durch fundierte praktische Erfahrung in Governance, Risiko und Compliance. Engagiert bei der Bereitstellung sicherer und leistungsstarker IT-Losungen, die regulatorischen Rahmenbedingungen entsprechen.',
    aboutP2: 'Mit Zertifizierungen von IBM, Google, Microsoft, Oracle, Cisco und weiteren, darunter ISO/IEC 27001:2022 Lead Auditor und NEBOSH IGC, bringe ich sowohl Breite als auch Tiefe in jedes Engagement.',
    aboutP3: 'Derzeit studiere ich Informatik an der Iqra University und verbinde kontinuierlich akademische Theorie mit praktischer Umsetzung in Sicherheitsoperationen, Netzwerkdesign und KI-gestuetzten Tools.',
    aboutLocation: 'Standort',
    aboutLocationVal: 'Bahrain / Pakistan',
    aboutEmail: 'E-Mail',
    aboutLinkedIn: 'LinkedIn',
    aboutLinkedInVal: 'in/abdullah-mohammad-mushtaq',
    aboutCerts: 'Zertifikate',
    aboutCertsVal: '46+',
    aboutExp: 'Erfahrung',
    aboutExpVal: '4+ Jahre',
    aboutLangs: 'Sprachen',
    aboutLangsVal: 'EN · AR · UR · PK · HI · PS',

    eduHeading: 'Ausbildung',
    achHeading: 'Leistungen',
    achLabels: [
      'Berufliche Zertifikate',
      'Abgeschlossene Projekte',
      'Jahre Erfahrung',
      'Branchentools gemeistert',
      'Gesprochene Sprachen',
      'Papierkram reduziert durch Automatisierung',
    ],

    certHeading: 'Zertifikate',
    projHeading: 'Projekte',
    expHeading: 'Erfahrung',
    skillsHeading: 'Fahigkeiten',
    coreCompHeading: 'Kernkompetenzen',

    contactHeading: 'In Kontakt treten',
    contactDesc: 'Offen fur Cybersicherheits-Chancen, GRC-Beratung, Netzwerkarchitektur-Projekte oder Wissensaustausch. Kontaktieren Sie mich uber einen der Kanale unten.',
    contactCta: 'Nachricht senden',
    contactFooter: '© 2026 Abdullah Mohammad Mushtaq. Alle Rechte vorbehalten.',

    langName: 'Deutsch',
    dir: 'ltr' as const,
  },
};
