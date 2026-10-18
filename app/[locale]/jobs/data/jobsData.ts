import type { LocalizedType } from "@/lib/types";

export type JobCategory = "engineering" | "product" | "design" | "sales" | "qa";

export interface JobOpening {
  id: string;
  category: JobCategory;
  title: LocalizedType;
  tags: {
    ar: string[];
    en: string[];
  };
  description?: LocalizedType;
  requirements?: {
    ar: string[];
    en: string[];
  };
}

export const OPEN_JOB_POSITIONS: JobOpening[] = [
  {
    id: "senior-backend-engineer",
    category: "engineering",
    title: {
      ar: "مهندس تكنولوجيا أول Backend (Senior Backend Engineer)",
      en: "Senior Backend Engineer",
    },
    tags: {
      ar: ["هندسة", "القاهرة", "تقييم عن بعد ثم في المكتب", "وظيفة دائمة"],
      en: ["Engineering", "Cairo", "Remote eval then On-site", "Full-time"],
    },
    description: {
      ar: "نبحث عن مهندس باك إند خبير للانضمام إلى فريقنا وتطوير المنصات والأنظمة المعقدة لعملائنا في مصر والسعودية مثل PolyLine و Bareeq X.",
      en: "We are seeking an experienced Senior Backend Engineer to join our core team and build enterprise software platforms across Egypt and Saudi Arabia.",
    },
    requirements: {
      ar: [
        "خبرة لا تقل عن 4 سنوات في تطوير تطبيقات Laravel أو Node.js/Python",
        "خبرة في تصميم قواعد البيانات PostgreSQL / MySQL وتحسين الأداء",
        "معرفة ممتازة ببناء REST APIs والتعامل مع Microservices",
        "القدرة على العمل عن بُعد خلال فترة التقييم ثم الانضمام لمقرنا في المعادي",
      ],
      en: [
        "4+ years of experience in backend development (Laravel / Node.js)",
        "Strong database design skills (PostgreSQL / MySQL)",
        "Experience building robust RESTful APIs & microservices architecture",
        "Ability to work remotely during the 3-month evaluation period, then on-site in Maadi, Cairo",
      ],
    },
  },
  {
    id: "senior-frontend-engineer",
    category: "engineering",
    title: {
      ar: "مهندس واجهات أمامية أول (Senior Frontend Engineer)",
      en: "Senior Frontend Engineer",
    },
    tags: {
      ar: ["هندسة", "القاهرة", "تقييم عن بعد ثم في المكتب", "وظيفة دائمة"],
      en: ["Engineering", "Cairo", "Remote eval then On-site", "Full-time"],
    },
    description: {
      ar: "نبحث عن مطوّر واجهات متقدم يتقن Next.js و React لبناء وتطوير واجهات المستخدم التفاعلية لمنصاتنا البرمجية.",
      en: "Looking for an advanced Frontend Engineer proficient in Next.js & React to craft responsive and high-performance web applications.",
    },
    requirements: {
      ar: [
        "خبرة 3+ سنوات في React, Next.js, TypeScript و TailwindCSS",
        "معرفة عميقة بتحسين أداء الصفحات و SEO وإمكانية الوصول RTL/LTR",
        "خبرة في التعامل مع State Management والارتباط مع REST APIs",
      ],
      en: [
        "3+ years of experience with React, Next.js, TypeScript & TailwindCSS",
        "Deep knowledge of web performance, SEO & RTL/LTR accessibility",
        "Experience with modern state management & REST API integrations",
      ],
    },
  },
  {
    id: "mobile-app-developer",
    category: "engineering",
    title: {
      ar: "مطوّر تطبيقات جوال (Flutter Mobile Developer)",
      en: "Flutter Mobile Developer",
    },
    tags: {
      ar: ["هندسة", "القاهرة", "تقييم عن بعد ثم في المكتب", "وظيفة دائمة"],
      en: ["Engineering", "Cairo", "Remote eval then On-site", "Full-time"],
    },
    description: {
      ar: "تطوير تطبيقات الجوال الذكية لمنصاتنا ومنتجات عملائنا في قطاعات المبيعات الميدانية والشحن والتتبع.",
      en: "Build native-quality mobile applications for iOS & Android using Flutter for field sales and logistics products.",
    },
    requirements: {
      ar: [
        "خبرة 3+ سنوات في إطار عمل Flutter و Dart",
        "خبرة في إدارة الحالة Bloc / Provider والتعامل مع خرائط Leaflet/Google Maps",
        "رفع التطبيقات وإدارتها على App Store و Google Play",
      ],
      en: [
        "3+ years of experience with Flutter & Dart",
        "Proficiency in state management (Bloc/Provider) & Maps integration",
        "Proven track record publishing apps on App Store & Google Play",
      ],
    },
  },
  {
    id: "devops-cloud-engineer",
    category: "engineering",
    title: {
      ar: "مهندس بنيات سحابية (DevOps & Cloud Engineer)",
      en: "DevOps & Cloud Systems Engineer",
    },
    tags: {
      ar: ["هندسة", "القاهرة", "تقييم عن بعد ثم في المكتب", "وظيفة دائمة"],
      en: ["Engineering", "Cairo", "Remote eval then On-site", "Full-time"],
    },
    description: {
      ar: "إدارة وتأمين الخوادم والبنيات التحتية السحابية لضمان الاستقرار والحماية العالية لمنتجات الشركة.",
      en: "Manage and optimize cloud architecture, Docker containers, CI/CD pipelines, and server reliability.",
    },
    requirements: {
      ar: [
        "خبرة في Docker, Kubernetes, AWS/DigitalOcean و NGINX",
        "بناء أنابيب التكامل والتسليم المستمر CI/CD عبر GitHub Actions",
        "معرفة متميزة بالأمان الرقمي والنسخ الاحتياطي التلقائي",
      ],
      en: [
        "Hands-on experience with Docker, Kubernetes, AWS/DigitalOcean & NGINX",
        "Building automated CI/CD pipelines via GitHub Actions",
        "Solid background in cloud security, monitoring & automated backups",
      ],
    },
  },
  {
    id: "ui-ux-designer",
    category: "design",
    title: {
      ar: "مصمم واجهات وتجربة مستخدم (Senior UI/UX Designer)",
      en: "Senior UI/UX Designer",
    },
    tags: {
      ar: ["تصميم", "القاهرة", "تقييم عن بعد ثم في المكتب", "وظيفة دائمة"],
      en: ["Design", "Cairo", "Remote eval then On-site", "Full-time"],
    },
    description: {
      ar: "ابتكار واجهات مستخدم جذابة وتجارب استخدام سلسة لمنصات الأنظمة المؤسسية وتطبيقات الويب والجوال.",
      en: "Design intuitive user journeys, interactive wireframes, and modern visual systems for enterprise platforms.",
    },
    requirements: {
      ar: [
        "إتقان تام لبرنامج Figma وتصميم Design Systems متكاملة",
        "خبرة في تصميم الواجهات ثنائية اللغة (عربي / إنجليزي)",
        "إجراء أبحاث المستخدم واختبارات القابلية للاستخدام",
      ],
      en: [
        "Mastery of Figma and constructing design systems",
        "Proven experience designing bilingual UI (Arabic & English)",
        "Conducting user research and usability testing for complex dashboards",
      ],
    },
  },
  {
    id: "product-manager",
    category: "product",
    title: {
      ar: "مدير منتجات تقنية (Technical Product Manager)",
      en: "Technical Product Manager",
    },
    tags: {
      ar: ["إدارة المنتجات", "القاهرة", "تقييم عن بعد ثم في المكتب", "وظيفة دائمة"],
      en: ["Product", "Cairo", "Remote eval then On-site", "Full-time"],
    },
    description: {
      ar: "قيادة وتوجيه خريطة طريق المنتجات، والتنسيق بين فريق الهندسة والعملاء لتحقيق أهداف العمل.",
      en: "Lead product roadmaps, define feature requirements, and bridge communication between engineering teams and business stakeholders.",
    },
    requirements: {
      ar: [
        "خبرة 3+ سنوات في إدارة المنتجات البرمجية B2B / SaaS",
        "خلفية تقنية ممتازة تفهم معمارية البرمجيات والـ Agile",
        "مهارات تحليلية وقدرة على كتابة وثائق PRD واضحة",
      ],
      en: [
        "3+ years managing B2B SaaS or enterprise software products",
        "Strong technical foundation with deep understanding of Agile software development",
        "Exceptional analytical skills and clear PRD documentation writing",
      ],
    },
  },
  {
    id: "qa-automation-engineer",
    category: "qa",
    title: {
      ar: "مهندس جودة واختبار برمجيات (QA Automation Engineer)",
      en: "QA Automation Engineer",
    },
    tags: {
      ar: ["جودة البرمجيات", "القاهرة", "تقييم عن بعد ثم في المكتب", "وظيفة دائمة"],
      en: ["QA", "Cairo", "Remote eval then On-site", "Full-time"],
    },
    description: {
      ar: "ضمان أعلى معايير الجودة والأداء لجميع منتجات الشركة عبر الاختبارات التلقائية واليدوية.",
      en: "Ensure flawless quality, regression stability, and high performance across all mobile and web software platforms.",
    },
    requirements: {
      ar: [
        "خبرة في كتاية سيناريوهات الاختبار اليدوي والتلقائي (Playwright / Cypress / Selenium)",
        "اختبار APIs واستخدام Postman و JMeter لاختبارات الضغط",
        "معرفة جيدة بدورات حياة البرمجيات واكتشاف الأخطاء",
      ],
      en: [
        "Experience writing manual and automated test suites (Playwright / Cypress)",
        "API testing expertise using Postman & JMeter performance load tests",
        "Solid understanding of bug tracking lifecycles and CI test automation",
      ],
    },
  },
  {
    id: "technical-sales-specialist",
    category: "sales",
    title: {
      ar: "مستشار ومبيعات حلول برمجية (Technical Sales Consultant)",
      en: "Technical Sales Consultant",
    },
    tags: {
      ar: ["المبيعات والنمو", "القاهرة", "دوام في المكتب", "وظيفة دائمة"],
      en: ["Sales", "Cairo", "On-site", "Full-time"],
    },
    description: {
      ar: "تقديم الاستشارات البرمجية للشركات والمؤسسات وبناء علاقات استراتيجية لبيع الحلول والأنظمة الخاصة.",
      en: "Consult with enterprise clients, demonstrate custom software platforms, and drive B2B growth across KSA & Egypt.",
    },
    requirements: {
      ar: [
        "خبرة سابقة في مبيعات الحلول التقنية B2B أو أنظمة ERP",
        "قدرة عالية على عرض الحلول وفهم احتياجات الشركات التشغيلية",
        "مهارات تفاوض وتواصل ممتازة",
      ],
      en: [
        "Proven experience in B2B enterprise software or ERP solution sales",
        "Strong presentation skills and ability to analyze business operational needs",
        "Excellent negotiation and relationship-building capabilities",
      ],
    },
  },
  {
    id: "fullstack-developer",
    category: "engineering",
    title: {
      ar: "مطوّر برمجيات متكامل (Full Stack Engineer - Next.js & Laravel)",
      en: "Full Stack Engineer (Next.js & Laravel)",
    },
    tags: {
      ar: ["هندسة", "القاهرة", "تقييم عن بعد ثم في المكتب", "وظيفة دائمة"],
      en: ["Engineering", "Cairo", "Remote eval then On-site", "Full-time"],
    },
    description: {
      ar: "بناء وتطوير ميزات كاملة من قاعدة البيانات حتى واجهة المستخدم في بيئة عمل سريعة النمو.",
      en: "Build end-to-end features from database queries to modern React/Next.js client interfaces.",
    },
    requirements: {
      ar: [
        "إتقان Laravel و React / Next.js و TypeScript",
        "خبرة في تطوير واجهات APIs وتخزين البيانات المؤقت Redis",
        "المرونة والقدرة على تحويل المتطلبات إلى حلول برمجية متكاملة",
      ],
      en: [
        "Proficiency in Laravel, React / Next.js & TypeScript",
        "Experience with REST APIs, SQL databases & Redis caching",
        "Ability to swiftly convert business requirements into robust code",
      ],
    },
  },
  {
    id: "ai-solutions-engineer",
    category: "engineering",
    title: {
      ar: "مهندس حلول أتمتة وذكاء اصطناعي (AI Automation Engineer)",
      en: "AI Automation Solutions Engineer",
    },
    tags: {
      ar: ["هندسة", "القاهرة", "تقييم عن بعد ثم في المكتب", "وظيفة دائمة"],
      en: ["Engineering", "Cairo", "Remote eval then On-site", "Full-time"],
    },
    description: {
      ar: "تطوير ودمج نماذج الذكاء الاصطناعي والمساعدات الذكية مثل (ماهر AI) في أنظمة إدارة الشركات وأتمتة المهام.",
      en: "Build and integrate custom AI agents, LLM automation flows, and intelligent assistants into enterprise workflows.",
    },
    requirements: {
      ar: [
        "خبرة في التعامل مع OpenAI APIs, LangChain / LlamaIndex و Python",
        "معرفة جيدة ببناء Vector Databases و RAG Systems",
        "ربط نماذج الذكاء الاصطناعي بأنظمة الشركات التشغيلية",
      ],
      en: [
        "Experience with OpenAI APIs, LangChain / LlamaIndex & Python",
        "Solid grasp of Vector Databases & RAG (Retrieval-Augmented Generation)",
        "Integrating AI automation pipelines into existing B2B systems",
      ],
    },
  },
];
