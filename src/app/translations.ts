export type Lang = 'en' | 'ar' | 'de';

// ─── Shared types ────────────────────────────────────────────────────────────
export interface Project {
  title: string;
  date: string;
  association?: string;
  stack: string[];
  description: string;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  location: string;
  description: string;
}

export interface EducationEntry {
  degree: string;
  institution: string;
  period: string;
  detail: string;
}

export interface Translation {
  dir: 'ltr' | 'rtl';
  langName: string;

  // Nav
  navLabels: Record<string, string>;

  // Hero
  heroTagline: string;
  heroSubtitle: string;
  heroCta1: string;
  heroCta2: string;

  // About
  aboutHeading: string;
  aboutP1: string;
  aboutP2: string;
  aboutP3: string;
  aboutLocation: string;
  aboutLocationVal: string;
  aboutEmail: string;
  aboutLinkedIn: string;
  aboutLinkedInVal: string;
  aboutCerts: string;
  aboutCertsVal: string;
  aboutExp: string;
  aboutExpVal: string;
  aboutLangs: string;
  aboutLangsVal: string;

  // Education
  eduHeading: string;
  education: EducationEntry[];

  // Achievements
  achHeading: string;
  achLabels: string[];

  // Certifications
  certHeading: string;

  // Projects
  projHeading: string;
  projects: Project[];

  // Experience
  expHeading: string;
  experiences: Experience[];

  // Skills
  skillsHeading: string;
  skills: Record<string, string[]>;
  coreCompHeading: string;
  coreCompetencies: string[];

  // Contact
  contactHeading: string;
  contactDesc: string;
  contactCta: string;
  contactFooter: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// ENGLISH
// ─────────────────────────────────────────────────────────────────────────────
const en: Translation = {
  dir: 'ltr',
  langName: 'English',

  navLabels: {
    home: 'Home', about: 'About', education: 'Education',
    achievements: 'Achievements', certifications: 'Certifications',
    projects: 'Projects', experience: 'Experience', skills: 'Skills', contact: 'Contact',
  },

  heroTagline: 'Cybersecurity  ·  GRC  ·  IT Infrastructure',
  heroSubtitle: 'Protecting critical infrastructure through cybersecurity expertise and strategic risk governance. Trusted to secure networks, lead compliance programs and architect resilient systems.',
  heroCta1: 'Get In Touch',
  heroCta2: 'View Projects',

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

  eduHeading: 'Education',
  education: [
    {
      degree: 'Bachelor of Computer Science',
      institution: 'Iqra University',
      period: '2023 – 2027',
      detail: 'Grade: B · Specialization in Cybersecurity, GRC, IT Infrastructure and Networking. Active in software development, data structures, algorithms and AI projects applying theoretical knowledge to real-world problems.',
    },
    {
      degree: 'Diploma of Associate Engineering in Computer Information Technology',
      institution: 'Iqra College of Technology & Skills (under International Islamic University, Islamabad)',
      period: 'Jan 2019 – Jun 2022',
      detail: 'Grade: B · Rigorous curriculum combining in-depth theoretical knowledge with extensive practical applications. Developed proficiency in C++, Java and Python, with a strong focus on hardware, networking and IT systems.',
    },
    {
      degree: 'Diploma in Human Resources Management and Services',
      institution: 'Alison',
      period: 'Apr 2024 – Present',
      detail: 'Grade: Pass · Focus on employee relations, recruitment, performance management and strategic HR planning. Applied theoretical knowledge to complex organizational dynamics and HR challenges.',
    },
  ],

  achHeading: 'Achievements',
  achLabels: [
    'Professional Certifications',
    'Projects Delivered',
    'Years of Experience',
    'Industry Tools Mastered',
    'Languages Spoken',
    'Paperwork Reduced via Automation',
  ],

  certHeading: 'Certifications',

  projHeading: 'Projects',
  projects: [
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
      description: 'Responsive weather forecasting app built as a Progressive Web App and packaged into a native Android APK. Delivers real-time updates, hourly/daily forecasts, location detection, offline caching via service workers and favorite city management.',
    },
    {
      title: 'Smart Encryption Web App',
      date: 'Sep 2025',
      association: 'Iqra University',
      stack: ['Python', 'Flask', 'JavaScript', 'AES/Fernet', 'Caesar Cipher'],
      description: 'Web application for encryption and decryption featuring AES (Fernet) symmetric encryption, Caesar Cipher encoding and drag-and-drop file processing. Demonstrates applied cryptography in a practical, user-friendly interface.',
    },
    {
      title: 'Simulated Phishing & Keylogging Attack Demo',
      date: 'Aug 2025',
      stack: ['Threat Emulation', 'Security Awareness', 'MFA Advocacy', 'Risk Mitigation'],
      description: 'Cybersecurity awareness project simulating a phishing attack and keylogging demonstration to highlight human-error vulnerabilities. Produced training content on identifying fake login portals, URL verification and building a security-first culture.',
    },
    {
      title: 'Enterprise-Level Multi-Protocol Network Design',
      date: 'Apr 2025',
      association: 'Iqra University',
      stack: ['Cisco Packet Tracer', 'OSPF', 'EIGRP', 'RIP', 'VLANs', 'DHCP'],
      description: 'Large-scale enterprise network topology integrating RIP, OSPF (Multi-Area) and EIGRP routing protocols. Features hierarchical LAN/WAN design, wireless access, Mail/DHCP servers, redundant paths for fault tolerance and proper subnetting.',
    },
    {
      title: 'Auto Paper Formation Software',
      date: 'Feb 2025',
      stack: ['Automation', 'PDF/DOCX Export', 'LMS Integration', 'Access Control'],
      description: 'Educational software automating question paper creation with dynamic question banks, randomized generation, multi-format export (PDF, DOCX), user roles and access control, and LMS/SIS integration. Reduced paperwork by 85% and improved efficiency by 95%.',
    },
  ],

  expHeading: 'Experience',
  experiences: [
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
      description: 'Delivered comprehensive IT support by troubleshooting technical issues and assisting users with hardware and software problems. Managed administrative tasks including scheduling, record-keeping and communications to enhance operational efficiency.',
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
  ],

  skillsHeading: 'Skills',
  skills: {
    'Cybersecurity': ['Threat Intelligence', 'SIEM', 'Incident Response', 'Security Auditing', 'Vulnerability Assessment', 'Ethical Hacking'],
    'GRC': ['Risk Management', 'ISO 27001 Implementation', 'NIST Framework', 'Policy Development', 'Compliance Auditing'],
    'Networking': ['TCP/IP', 'VLANs', 'Routing & Switching', 'Network Security', 'Firewall Configuration', 'VPN'],
    'IT Infrastructure': ['Windows Server', 'Linux Administration', 'Active Directory', 'Cloud Infrastructure', 'System Hardening'],
    'AI & Data': ['Python', 'Machine Learning', 'TensorFlow', 'Data Analytics', 'Security Automation'],
    'Project Management': ['Agile', 'SDLC', 'Stakeholder Management', 'Digital Marketing', 'Team Leadership'],
  },
  coreCompHeading: 'Core Competencies',
  coreCompetencies: [
    'IT Support & Troubleshooting', 'Network Administration', 'Cloud Computing',
    'Cybersecurity & Threat Management', 'ISO 27001 Implementation', 'Digital Marketing',
    'Social Media Management', 'Business Intelligence', 'IT Project Management',
    'AI & Emerging Technologies', 'Cross-functional Team Collaboration', 'Stakeholder Management',
  ],

  contactHeading: "Let's Connect",
  contactDesc: 'Open to cybersecurity opportunities, GRC consulting, network architecture projects or knowledge exchange. Reach out through any channel below.',
  contactCta: 'Send Message',
  contactFooter: '© 2026 Abdullah Mohammad Mushtaq. All rights reserved.',
};

// ─────────────────────────────────────────────────────────────────────────────
// ARABIC
// ─────────────────────────────────────────────────────────────────────────────
const ar: Translation = {
  dir: 'rtl',
  langName: 'العربية',

  navLabels: {
    home: 'الرئيسية', about: 'عني', education: 'التعليم',
    achievements: 'الإنجازات', certifications: 'الشهادات',
    projects: 'المشاريع', experience: 'الخبرة', skills: 'المهارات', contact: 'تواصل',
  },

  heroTagline: 'الأمن السيبراني  ·  إدارة المخاطر  ·  البنية التحتية لتقنية المعلومات',
  heroSubtitle: 'حماية البنية التحتية الحيوية من خلال الخبرة في الأمن السيبراني وحوكمة المخاطر الاستراتيجية. موثوق به لتأمين الشبكات وقيادة برامج الامتثال وتصميم أنظمة مرنة.',
  heroCta1: 'تواصل معي',
  heroCta2: 'استعرض المشاريع',

  aboutHeading: 'عني',
  aboutP1: 'متخصص تقنية معلومات طموح، يتمتع بتركيز قوي على الشبكات والحوسبة السحابية والأمن السيبراني، مدعومًا بخبرة عملية راسخة في الحوكمة وإدارة المخاطر والامتثال. ملتزم بتقديم حلول تقنية آمنة وعالية الأداء ومستقبلية تتوافق مع الأطر التنظيمية وتحقق النجاح التشغيلي.',
  aboutP2: 'أحمل شهادات من IBM وGoogle وMicrosoft وOracle وCisco وغيرها، بما فيها شهادة ISO/IEC 27001:2022 كمدقق رائد وNEBOSH IGC، مما يمنحني اتساعًا وعمقًا في كل مشاركة أقوم بها.',
  aboutP3: 'أتابع حاليًا دراسة بكالوريوس علوم الحاسوب في جامعة إقرا، وأحرص على ربط النظرية الأكاديمية بالتطبيق العملي في مجالات عمليات الأمن وتصميم الشبكات والأدوات المدعومة بالذكاء الاصطناعي.',
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
  education: [
    {
      degree: 'بكالوريوس علوم الحاسوب',
      institution: 'جامعة إقرا',
      period: '2023 – 2027',
      detail: 'الدرجة: ب · تخصص في الأمن السيبراني وإدارة المخاطر والبنية التحتية لتقنية المعلومات والشبكات. نشط في تطوير البرمجيات وهياكل البيانات والخوارزميات ومشاريع الذكاء الاصطناعي التي تطبق المعرفة النظرية على مشكلات واقعية.',
    },
    {
      degree: 'دبلوم مهندس مشارك في تقنية معلومات الحاسوب',
      institution: 'كلية إقرا للتكنولوجيا والمهارات (تحت إشراف الجامعة الإسلامية العالمية، إسلام آباد)',
      period: 'يناير 2019 – يونيو 2022',
      detail: 'الدرجة: ب · منهج دراسي صارم يجمع بين المعرفة النظرية المعمقة والتطبيقات العملية الواسعة. اكتساب الكفاءة في C++ وJava وPython مع تركيز قوي على الأجهزة والشبكات وأنظمة تقنية المعلومات.',
    },
    {
      degree: 'دبلوم في إدارة الموارد البشرية والخدمات',
      institution: 'أليسون',
      period: 'أبريل 2024 – حتى الآن',
      detail: 'الدرجة: ناجح · التركيز على علاقات الموظفين والتوظيف وإدارة الأداء والتخطيط الاستراتيجي للموارد البشرية. تطبيق المعرفة النظرية على الديناميكيات التنظيمية المعقدة وتحديات الموارد البشرية.',
    },
  ],

  achHeading: 'الإنجازات',
  achLabels: [
    'شهادة مهنية',
    'مشروع منجز',
    'سنوات من الخبرة',
    'أداة صناعية متقنة',
    'لغة متحدث بها',
    'تقليص في الأعمال الورقية عبر الأتمتة',
  ],

  certHeading: 'الشهادات والمؤهلات',

  projHeading: 'المشاريع',
  projects: [
    {
      title: 'LeafAI – اكتشاف أمراض النباتات والتوصية بالعلاج',
      date: 'فبراير 2026',
      association: 'جامعة إقرا',
      stack: ['Python', 'TensorFlow/Keras', 'MobileNetV2', 'OpenCV', 'Streamlit', 'NumPy'],
      description: 'نظام تعلم عميق للتعرف على أمراض أوراق النباتات باستخدام نقل التعلم عبر MobileNetV2 على أكثر من 16,000 صورة من PlantVillage. يُخرج تنبؤات بالأمراض مع درجات الثقة عبر تطبيق Streamlit على الويب، مما يتيح الاكتشاف المبكر للمزارعين ومحترفي التقنية الزراعية.',
    },
    {
      title: 'ClimaCast – تطبيق توقعات الطقس (PWA وأندرويد)',
      date: 'يناير 2026',
      association: 'جامعة إقرا',
      stack: ['React', 'TypeScript', 'Tailwind CSS', 'Capacitor', 'PWA', 'Weather API'],
      description: 'تطبيق توقعات طقس متجاوب مبني كـ Progressive Web App ومعبأ في APK أصلي لأندرويد. يقدم تحديثات فورية وتوقعات ساعية ويومية واكتشاف الموقع الجغرافي وتخزين مؤقت بلا اتصال عبر Service Workers وإدارة المدن المفضلة.',
    },
    {
      title: 'تطبيق ويب للتشفير الذكي',
      date: 'سبتمبر 2025',
      association: 'جامعة إقرا',
      stack: ['Python', 'Flask', 'JavaScript', 'AES/Fernet', 'Caesar Cipher'],
      description: 'تطبيق ويب للتشفير وفك التشفير يتضمن تشفير AES (Fernet) المتماثل وترميز شيفرة قيصر ومعالجة الملفات بالسحب والإفلات. يُبرز تطبيق التشفير العملي في واجهة مستخدم عملية وسهلة الاستخدام.',
    },
    {
      title: 'عرض توضيحي لهجمات التصيد الاحتيالي وتسجيل لوحة المفاتيح',
      date: 'أغسطس 2025',
      stack: ['Threat Emulation', 'Security Awareness', 'MFA Advocacy', 'Risk Mitigation'],
      description: 'مشروع للتوعية بالأمن السيبراني يحاكي هجوم تصيد احتيالي وعرضًا توضيحيًا لتسجيل ضغطات لوحة المفاتيح لإبراز نقاط ضعف الخطأ البشري. أنتج محتوى تدريبيًا حول التعرف على بوابات تسجيل الدخول المزيفة والتحقق من عناوين URL وبناء ثقافة أمن المعلومات.',
    },
    {
      title: 'تصميم شبكة مؤسسية متعددة البروتوكولات',
      date: 'أبريل 2025',
      association: 'جامعة إقرا',
      stack: ['Cisco Packet Tracer', 'OSPF', 'EIGRP', 'RIP', 'VLANs', 'DHCP'],
      description: 'طوبولوجيا شبكة مؤسسية واسعة النطاق تدمج بروتوكولات التوجيه RIP وOSPF متعدد المناطق وEIGRP. تتضمن تصميم LAN/WAN هرميًا ووصولًا لاسلكيًا وخوادم بريد وDHCP ومسارات زائدة لتحمل الأخطاء وتقسيم شبكات فرعية صحيح.',
    },
    {
      title: 'برنامج التكوين الآلي لأوراق الأسئلة',
      date: 'فبراير 2025',
      stack: ['Automation', 'PDF/DOCX Export', 'LMS Integration', 'Access Control'],
      description: 'برنامج تعليمي يؤتمت إنشاء أوراق الأسئلة مع بنوك أسئلة ديناميكية وتوليد عشوائي وتصدير متعدد الصيغ (PDF وDOCX) وأدوار المستخدمين والتحكم في الوصول وتكامل LMS/SIS. خفّض العمل الورقي بنسبة 85% وحسّن الكفاءة بنسبة 95%.',
    },
  ],

  expHeading: 'الخبرة العملية',
  experiences: [
    {
      role: 'مدير تقنية المعلومات والتسويق',
      company: 'Al Mahira Workshop W.L.L',
      period: 'يناير 2025 – حتى الآن',
      location: 'توبلي، البحرين · هجين',
      description: 'الإشراف على أنظمة تقنية المعلومات لضمان سلاسة العمليات وتطبيق حلول تقنية لاحتياجات الأعمال. قيادة استراتيجيات التسويق الرقمي بما يشمل إدارة وسائل التواصل الاجتماعي وتطوير الهوية التجارية. التنسيق بين الفرق التقنية والتسويقية لمواءمة الأهداف مع النمو المدفوع بالتكنولوجيا.',
    },
    {
      role: 'مساعد دعم تقنية المعلومات والإدارة',
      company: 'Uni Technical Services',
      period: 'يناير 2024 – ديسمبر 2024',
      location: 'دبي، الإمارات العربية المتحدة · عن بُعد',
      description: 'تقديم دعم شامل لتقنية المعلومات من خلال استكشاف المشكلات التقنية وإصلاحها ومساعدة المستخدمين في مشكلات الأجهزة والبرامج. إدارة المهام الإدارية بما يشمل الجدولة وحفظ السجلات والاتصالات لتعزيز الكفاءة التشغيلية.',
    },
    {
      role: 'سفير',
      company: 'Volunteer Force Pakistan (clcglobally)',
      period: 'يوليو 2024 – أكتوبر 2024',
      location: 'إسلام آباد، باكستان · تدريب',
      description: 'المساعدة في تخطيط الفعاليات والتنسيق للمبادرات على المستوى الوطني. دعم عمليات المشاريع من خلال مهام التواصل والخدمات اللوجستية. حصل على شهادة تقدير للمساهمات في مؤتمر القيادة الإبداعية.',
    },
    {
      role: 'مستشار تقنية معلومات',
      company: 'Naqvi Associates',
      period: 'يوليو 2022 – ديسمبر 2023',
      location: 'إسلام آباد، باكستان · حضوري',
      description: 'تقديم استشارات تقنية متخصصة لتحسين أنظمة تقنية المعلومات وسير العمل للعملاء. تطبيق حلول رقمية تشمل ترقيات الأنظمة وعمليات استكشاف الأخطاء وإصلاحها. التعاون في مبادرات التسويق الرقمي لدعم المنصات الإلكترونية وتعزيز نمو الأعمال.',
    },
    {
      role: 'مساعد تقنية معلومات',
      company: 'Naqvi Associates',
      period: 'نوفمبر 2021 – أبريل 2022',
      location: 'إسلام آباد، باكستان · تدريب',
      description: 'المساعدة في عمليات تقنية المعلومات اليومية لضمان سلاسة مراقبة الأنظمة واستكشاف الأخطاء الأساسية وإصلاحها. تقديم التوجيه التقني للمستخدمين النهائيين في إعداد الأجهزة والبرامج. الحفاظ على توثيق تقنية المعلومات وتنسيق المهام التقنية الصغيرة داخل الفريق.',
    },
  ],

  skillsHeading: 'المهارات',
  skills: {
    'الأمن السيبراني': ['استخبارات التهديدات', 'SIEM', 'الاستجابة للحوادث', 'التدقيق الأمني', 'تقييم الثغرات', 'الاختراق الأخلاقي'],
    'إدارة المخاطر والامتثال': ['إدارة المخاطر', 'تطبيق ISO 27001', 'إطار NIST', 'تطوير السياسات', 'تدقيق الامتثال'],
    'الشبكات': ['TCP/IP', 'VLANs', 'التوجيه والتبديل', 'أمن الشبكات', 'تكوين جدار الحماية', 'VPN'],
    'البنية التحتية': ['Windows Server', 'إدارة Linux', 'Active Directory', 'البنية السحابية', 'تصليب الأنظمة'],
    'الذكاء الاصطناعي والبيانات': ['Python', 'التعلم الآلي', 'TensorFlow', 'تحليل البيانات', 'أتمتة الأمن'],
    'إدارة المشاريع': ['Agile', 'SDLC', 'إدارة أصحاب المصلحة', 'التسويق الرقمي', 'قيادة الفريق'],
  },
  coreCompHeading: 'الكفاءات الأساسية',
  coreCompetencies: [
    'دعم تقنية المعلومات واستكشاف الأخطاء',
    'إدارة الشبكات',
    'الحوسبة السحابية',
    'الأمن السيبراني وإدارة التهديدات',
    'تطبيق ISO 27001',
    'التسويق الرقمي',
    'إدارة وسائل التواصل الاجتماعي',
    'ذكاء الأعمال',
    'إدارة مشاريع تقنية المعلومات',
    'الذكاء الاصطناعي والتقنيات الناشئة',
    'التعاون بين الفرق المتعددة',
    'إدارة أصحاب المصلحة',
  ],

  contactHeading: 'تواصل معي',
  contactDesc: 'منفتح على فرص الأمن السيبراني واستشارات إدارة المخاطر ومشاريع بنية الشبكات وتبادل المعرفة. تواصل معي عبر أي قناة أدناه.',
  contactCta: 'أرسل رسالة',
  contactFooter: '© 2026 عبدالله محمد مشتاق. جميع الحقوق محفوظة.',
};

// ─────────────────────────────────────────────────────────────────────────────
// GERMAN
// ─────────────────────────────────────────────────────────────────────────────
const de: Translation = {
  dir: 'ltr',
  langName: 'Deutsch',

  navLabels: {
    home: 'Start', about: 'Über mich', education: 'Ausbildung',
    achievements: 'Leistungen', certifications: 'Zertifikate',
    projects: 'Projekte', experience: 'Erfahrung', skills: 'Fähigkeiten', contact: 'Kontakt',
  },

  heroTagline: 'Cybersicherheit  ·  GRC  ·  IT-Infrastruktur',
  heroSubtitle: 'Schutz kritischer Infrastrukturen durch Cybersicherheits-Expertise und strategisches Risikomanagement. Vertrauenswürdig bei der Absicherung von Netzwerken, der Leitung von Compliance-Programmen und dem Aufbau widerstandsfähiger Systeme.',
  heroCta1: 'Kontakt aufnehmen',
  heroCta2: 'Projekte ansehen',

  aboutHeading: 'Über mich',
  aboutP1: 'Ambitionierter IT-Fachmann mit Schwerpunkt auf Netzwerke, Cloud und Cybersicherheit, gestützt durch fundierte praktische Erfahrung in Governance, Risiko und Compliance. Engagiert bei der Bereitstellung sicherer, leistungsstarker und zukunftsfähiger IT-Lösungen, die regulatorischen Rahmenbedingungen entsprechen und den Betriebserfolg fördern.',
  aboutP2: 'Mit Zertifizierungen von IBM, Google, Microsoft, Oracle, Cisco und weiteren Anbietern, darunter ISO/IEC 27001:2022 Lead Auditor und NEBOSH IGC, bringe ich sowohl Breite als auch Tiefe in jedes Engagement.',
  aboutP3: 'Derzeit studiere ich Informatik an der Iqra University und verbinde kontinuierlich akademische Theorie mit praktischer Umsetzung in Sicherheitsoperationen, Netzwerkdesign und KI-gestützten Tools.',
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
  education: [
    {
      degree: 'Bachelor of Computer Science (Informatik)',
      institution: 'Iqra University',
      period: '2023 – 2027',
      detail: 'Note: B · Spezialisierung in Cybersicherheit, GRC, IT-Infrastruktur und Netzwerke. Aktiv in Softwareentwicklung, Datenstrukturen, Algorithmen und KI-Projekten, die theoretisches Wissen auf reale Probleme anwenden.',
    },
    {
      degree: 'Diplom Ingenieur für Computer-Informationstechnologie',
      institution: 'Iqra College of Technology & Skills (unter der Aufsicht der Internationalen Islamischen Universität Islamabad)',
      period: 'Jan. 2019 – Juni 2022',
      detail: 'Note: B · Strenges Curriculum, das fundiertes theoretisches Wissen mit umfangreichen praktischen Anwendungen verbindet. Kenntnisse in C++, Java und Python entwickelt, mit starkem Fokus auf Hardware, Netzwerke und IT-Systeme.',
    },
    {
      degree: 'Diplom in Personalmanagement und -dienstleistungen',
      institution: 'Alison',
      period: 'Apr. 2024 – heute',
      detail: 'Abschluss: Bestanden · Fokus auf Mitarbeiterbeziehungen, Rekrutierung, Leistungsmanagement und strategische Personalplanung. Theoretisches Wissen auf komplexe Organisationsdynamiken und HR-Herausforderungen angewendet.',
    },
  ],

  achHeading: 'Leistungen',
  achLabels: [
    'Berufliche Zertifikate',
    'Abgeschlossene Projekte',
    'Jahre Berufserfahrung',
    'Branchentools gemeistert',
    'Gesprochene Sprachen',
    'Papierkram durch Automatisierung reduziert',
  ],

  certHeading: 'Zertifizierungen',

  projHeading: 'Projekte',
  projects: [
    {
      title: 'LeafAI – Pflanzenkrankheitserkennung und Behandlungsempfehlung',
      date: 'Feb. 2026',
      association: 'Iqra University',
      stack: ['Python', 'TensorFlow/Keras', 'MobileNetV2', 'OpenCV', 'Streamlit', 'NumPy'],
      description: 'Deep-Learning-System zur Identifizierung von Pflanzenkrankheiten mithilfe von MobileNetV2-Transfer-Learning auf über 16.000 PlantVillage-Bildern. Gibt Krankheitsvorhersagen mit Konfidenzwerten über eine Streamlit-Web-App aus und ermöglicht die Früherkennung für Landwirte und Agrartech-Fachleute.',
    },
    {
      title: 'ClimaCast – Wettervorhersage-PWA und Android-App',
      date: 'Jan. 2026',
      association: 'Iqra University',
      stack: ['React', 'TypeScript', 'Tailwind CSS', 'Capacitor', 'PWA', 'Weather API'],
      description: 'Responsive Wettervorhersage-App, als Progressive Web App entwickelt und als native Android-APK verpackt. Liefert Echtzeit-Updates, stündliche und tägliche Vorhersagen, Standorterkennung, Offline-Caching über Service Worker und Verwaltung von Lieblingsstädten.',
    },
    {
      title: 'Intelligente Verschlüsselungs-Web-App',
      date: 'Sept. 2025',
      association: 'Iqra University',
      stack: ['Python', 'Flask', 'JavaScript', 'AES/Fernet', 'Caesar Cipher'],
      description: 'Webanwendung zur Ver- und Entschlüsselung mit AES-Fernet-Symmetrie-Verschlüsselung, Caesar-Chiffre-Kodierung und Drag-and-Drop-Dateiverarbeitung. Demonstriert angewandte Kryptographie in einer praktischen, benutzerfreundlichen Oberfläche.',
    },
    {
      title: 'Simulierter Phishing- und Keylogging-Angriff (Demo)',
      date: 'Aug. 2025',
      stack: ['Threat Emulation', 'Security Awareness', 'MFA Advocacy', 'Risk Mitigation'],
      description: 'Cybersicherheits-Sensibilisierungsprojekt, das einen Phishing-Angriff und eine Keylogging-Demonstration simuliert, um Schwachstellen durch menschliche Fehler hervorzuheben. Erstellte Schulungsmaterial zur Erkennung gefälschter Anmeldeportale, URL-Verifizierung und zum Aufbau einer sicherheitsorientierten Unternehmenskultur.',
    },
    {
      title: 'Mehrstufiges Unternehmensnetzwerk-Design',
      date: 'Apr. 2025',
      association: 'Iqra University',
      stack: ['Cisco Packet Tracer', 'OSPF', 'EIGRP', 'RIP', 'VLANs', 'DHCP'],
      description: 'Großangelegte Unternehmensnetzwerk-Topologie mit Integration von RIP, OSPF (Multi-Area) und EIGRP-Routing-Protokollen. Enthält hierarchisches LAN/WAN-Design, WLAN-Zugang, Mail/DHCP-Server, redundante Pfade zur Fehlertoleranz und ordnungsgemäße Subnetzbildung.',
    },
    {
      title: 'Automatische Prüfungsformulierungssoftware',
      date: 'Feb. 2025',
      stack: ['Automation', 'PDF/DOCX Export', 'LMS Integration', 'Access Control'],
      description: 'Bildungssoftware zur Automatisierung der Prüfungserstellung mit dynamischen Fragedatenbanken, randomisierter Generierung, Mehrformat-Export (PDF und DOCX), Benutzerrollen und Zugriffskontrolle sowie LMS/SIS-Integration. Reduzierte den Papierkram um 85 % und verbesserte die Effizienz um 95 %.',
    },
  ],

  expHeading: 'Berufserfahrung',
  experiences: [
    {
      role: 'IT- und Marketingmanager',
      company: 'Al Mahira Workshop W.L.L',
      period: 'Jan. 2025 – heute',
      location: 'Tubli, Bahrain · Hybrid',
      description: 'Überwachung der IT-Systeme zur Sicherstellung eines reibungslosen Betriebs und Implementierung von Technologielösungen für Geschäftsanforderungen. Leitung digitaler Marketingstrategien einschließlich Social-Media-Management und Markenentwicklung. Koordinierung zwischen technischen und Marketingteams zur Ausrichtung der Ziele auf technologiegetriebenes Wachstum.',
    },
    {
      role: 'IT-Support- und Verwaltungsassistent',
      company: 'Uni Technical Services',
      period: 'Jan. 2024 – Dez. 2024',
      location: 'Dubai, VAE · Remote',
      description: 'Umfassende IT-Unterstützung durch Behebung technischer Probleme und Begleitung von Nutzern bei Hardware- und Softwareproblemen. Verwaltung administrativer Aufgaben einschließlich Terminplanung, Aktenführung und Kommunikation zur Steigerung der Betriebseffizienz.',
    },
    {
      role: 'Botschafter',
      company: 'Volunteer Force Pakistan (clcglobally)',
      period: 'Juli 2024 – Okt. 2024',
      location: 'Islamabad, Pakistan · Praktikum',
      description: 'Unterstützung bei der Veranstaltungsplanung und -koordination für nationale Initiativen. Unterstützung des Projektbetriebs durch Kommunikations- und Logistikaufgaben. Erhielt die Anerkennungsurkunde für Beiträge zur Creative Leadership Conference.',
    },
    {
      role: 'IT-Berater',
      company: 'Naqvi Associates',
      period: 'Juli 2022 – Dez. 2023',
      location: 'Islamabad, Pakistan · Vor Ort',
      description: 'Fachkundige technische Beratung zur Verbesserung von IT-Systemen und Arbeitsabläufen für Kunden. Implementierung digitaler Lösungen einschließlich System-Upgrades und Fehlerbehebungsprozessen. Zusammenarbeit an digitalen Marketinginitiativen zur Unterstützung von Online-Plattformen und zur Förderung des Geschäftswachstums.',
    },
    {
      role: 'IT-Assistent',
      company: 'Naqvi Associates',
      period: 'Nov. 2021 – Apr. 2022',
      location: 'Islamabad, Pakistan · Praktikum',
      description: 'Unterstützung beim täglichen IT-Betrieb zur Sicherstellung einer reibungslosen Systemüberwachung und grundlegenden Fehlerbehebung. Technische Beratung für Endnutzer bei Hardware- und Software-Einrichtungen. Pflege der IT-Dokumentation und Koordination kleinerer technischer Aufgaben im Team.',
    },
  ],

  skillsHeading: 'Fähigkeiten',
  skills: {
    'Cybersicherheit': ['Bedrohungsintelligenz', 'SIEM', 'Vorfallreaktion', 'Sicherheitsaudits', 'Schwachstellenbewertung', 'Ethisches Hacking'],
    'GRC': ['Risikomanagement', 'ISO-27001-Implementierung', 'NIST-Framework', 'Richtlinienentwicklung', 'Compliance-Audits'],
    'Netzwerke': ['TCP/IP', 'VLANs', 'Routing & Switching', 'Netzwerksicherheit', 'Firewall-Konfiguration', 'VPN'],
    'IT-Infrastruktur': ['Windows Server', 'Linux-Administration', 'Active Directory', 'Cloud-Infrastruktur', 'Systemhärtung'],
    'KI & Daten': ['Python', 'Maschinelles Lernen', 'TensorFlow', 'Datenanalyse', 'Sicherheitsautomatisierung'],
    'Projektmanagement': ['Agile', 'SDLC', 'Stakeholder-Management', 'Digitales Marketing', 'Teamführung'],
  },
  coreCompHeading: 'Kernkompetenzen',
  coreCompetencies: [
    'IT-Support und Fehlerbehebung',
    'Netzwerkverwaltung',
    'Cloud-Computing',
    'Cybersicherheit und Bedrohungsmanagement',
    'ISO-27001-Implementierung',
    'Digitales Marketing',
    'Social-Media-Management',
    'Business Intelligence',
    'IT-Projektmanagement',
    'KI und aufkommende Technologien',
    'Funktionsübergreifende Teamarbeit',
    'Stakeholder-Management',
  ],

  contactHeading: 'In Kontakt treten',
  contactDesc: 'Offen für Cybersicherheits-Chancen, GRC-Beratung, Netzwerkarchitektur-Projekte oder Wissensaustausch. Nehmen Sie über einen der unten stehenden Kanäle Kontakt auf.',
  contactCta: 'Nachricht senden',
  contactFooter: '© 2026 Abdullah Mohammad Mushtaq. Alle Rechte vorbehalten.',
};

export const translations: Record<Lang, Translation> = { en, ar, de };
