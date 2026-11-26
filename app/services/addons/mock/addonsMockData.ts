import { COMPANY_INFO, type LocalizedText } from "@/lib/constants";
import type {
  AddonCategory,
  AddonIconStyle,
  AddonPrice,
  AddonRatingBreakdown,
  AddonSector,
  AlbiruniVersion,
} from "@/lib/addons";

/**
 * DRAFT SAMPLE / TBD: the add-ons store catalog until the backend exists. Delete this folder once
 * `addonsService.ts` calls the API. The first add-on is the Figma's add-on page (node 234:3620 in the v4 copy);
 * names, developers, prices and ratings of the first nine come from the Figma's store page (node 233:3482); English
 * names of the first add-on and its developer from the English purchase complete page (node 247:3245).
 * Developers, reviews, install counts and the extra three add-ons are invented samples.
 */

export type MockDeveloperId = "eliteTech" | "horizon" | "nawat" | "codePlus";

export const MOCK_DEVELOPERS: Record<MockDeveloperId, { name: LocalizedText; official: boolean }> = {
  eliteTech: { name: COMPANY_INFO.brandName, official: true },
  horizon: { name: { ar: "تقنية الأفق", en: "Ofuq Tech" }, official: false },
  nawat: { name: { ar: "نواة للحلول", en: "Nawat Solutions" }, official: false },
  codePlus: { name: { ar: "كود بلس", en: "Code Plus" }, official: false },
};

interface MockReview {
  author: LocalizedText;
  company: LocalizedText;
  rating: number;
  text: LocalizedText;
}

interface MockRelease {
  version: string;
  date: string;
  notes: readonly LocalizedText[];
}

export interface MockAddon {
  slug: string;
  name: LocalizedText;
  summary: LocalizedText;
  description: LocalizedText;
  category: AddonCategory;
  developer: MockDeveloperId;
  icon: AddonIconStyle;
  price: AddonPrice;
  installs: number;
  /** Reviews per star rating, 5 stars first. The average and the count are worked out from it. */
  ratingBreakdown: AddonRatingBreakdown;
  sectors: readonly AddonSector[];
  versions: readonly AlbiruniVersion[];
  updatedAt: string;
  /** Intro video length in seconds. */
  videoDuration: number;
  features: readonly LocalizedText[];
  /** Last install step: the add-on's own settings. */
  settingsStep: LocalizedText;
  reviews: readonly MockReview[];
  /** Newest first; the first one is the current version. */
  changelog: readonly MockRelease[];
}

/** Install steps every add-on shares, before its own settings step. The first one differs for free add-ons. */
export const MOCK_INSTALL_STEPS = {
  downloadPaid: { ar: "حمّل ملف الإضافة من «مشترياتي» بعد الشراء.", en: "Download the add-on file from “My purchases” after buying it." },
  downloadFree: { ar: "حمّل ملف الإضافة من «مشترياتي» بعد إضافتها لحسابك.", en: "Download the add-on file from “My purchases” after adding it to your account." },
  shared: [
    { ar: "من البيروني: الإعدادات ← الإضافات ← رفع إضافة.", en: "In Albiruni: Settings → Add-ons → Upload add-on." },
    { ar: "اختر الملف، ثم اضغط «تثبيت» وفعّل الإضافة.", en: "Choose the file, press “Install”, then turn the add-on on." },
  ],
} satisfies Record<string, LocalizedText | readonly LocalizedText[]>;

/** What buying a paid add-on includes (Figma), and what a free one comes with. */
export const MOCK_INCLUDES: Record<"paid" | "free", readonly LocalizedText[]> = {
  paid: [
    { ar: "السورس كود الكامل للإضافة (ملف ZIP)", en: "The add-on's full source code (ZIP file)" },
    { ar: "دليل التركيب والإعداد", en: "Installation and setup guide" },
    { ar: "تحديثات مجانية لمدة 12 شهرًا", en: "Free updates for 12 months" },
    { ar: "دعم من المطوّر عبر الرسائل", en: "Support from the developer by message" },
  ],
  free: [
    { ar: "دليل التركيب والإعداد", en: "Installation and setup guide" },
    { ar: "تحديثات مجانية", en: "Free updates" },
    { ar: "دعم من المطوّر عبر الرسائل", en: "Support from the developer by message" },
  ],
};

/** Screenshots shown after the intro video in every gallery (placeholders until there are files). */
export const MOCK_SCREENSHOT_COUNT = 3;

const ALL_SECTORS: readonly AddonSector[] = ["distribution", "fieldSales", "carService"];
const ALL_VERSIONS: readonly AlbiruniVersion[] = ["2.4", "2.3"];

export const MOCK_ADDONS: readonly MockAddon[] = [
  {
    slug: "rep-routes-map",
    name: { ar: "مسارات المناديب على الخريطة", en: "Rep routes on the map" },
    summary: {
      ar: "خطة زيارات يومية جاهزة لكل مندوب على الخريطة، بأقصر طريق وأقل وقت.",
      en: "A ready daily visit plan for every rep on the map, with the shortest route and the least time.",
    },
    description: {
      ar: "تجهّز الإضافة لكل مندوب خطة زيارات يومية على الخريطة بأقصر طريق، وتوزّع العملاء على المسارات حسب المنطقة. يعرف المندوب وجهته التالية دائمًا، ويوفّر وقته ووقوده، ويحصل آخر اليوم على ملخص بزياراته المنجزة.",
      en: "The add-on prepares a daily visit plan on the map for every sales rep along the shortest route, and assigns customers to routes by region. Reps always know where to go next, save time and fuel, and get a summary of their completed visits at the end of the day.",
    },
    category: "sales",
    developer: "horizon",
    icon: { initials: "MP", tone: "primary" },
    price: { EG: 1200, SA: 240 },
    installs: 1350,
    ratingBreakdown: [79, 12, 4, 1, 0],
    sectors: ["distribution", "fieldSales"],
    versions: ALL_VERSIONS,
    updatedAt: "2026-09-28",
    videoDuration: 160,
    features: [
      { ar: "خطة يومية جاهزة لكل مندوب، والزيارات مرتّبة تلقائيًا بأقصر طريق.", en: "A ready daily plan for every rep, with visits ordered automatically along the shortest route." },
      { ar: "خريطة تعرض للمندوب عملاءه القريبين أثناء الوردية.", en: "A map that shows reps their nearby customers during the shift." },
      { ar: "تذكير بالزيارة التالية، واقتراح بديل لو اعتذر العميل.", en: "A reminder of the next visit, and an alternative if a customer cancels." },
      { ar: "ملخص يومي وأسبوعي بإنجازات كل مندوب.", en: "A daily and weekly summary of what each rep achieved." },
    ],
    settingsStep: {
      ar: "اضبط الإعدادات: المناطق، وأيام الزيارات، وصلاحيات المشرفين.",
      en: "Adjust the settings: regions, visit days and supervisor permissions.",
    },
    reviews: [
      {
        author: { ar: "مشرف المبيعات الميدانية", en: "Field sales supervisor" },
        company: { ar: "شركة توزيع مواد غذائية", en: "Food distributor" },
        rating: 5,
        text: {
          ar: "قلّ وقت الطريق بين الزيارات، والمناديب يعرفون خطتهم من أول اليوم.",
          en: "Travel time between visits dropped, and reps know their plan from the start of the day.",
        },
      },
      {
        author: { ar: "مدير العمليات", en: "Operations manager" },
        company: { ar: "شركة مستلزمات طبية", en: "Medical supplies company" },
        rating: 4,
        text: {
          ar: "الإعداد أخذ يومًا واحدًا مع دعم المطوّر، والملخص اليومي مفيد جدًا للمتابعة.",
          en: "Setup took one day with the developer's help, and the daily summary is very useful for follow-up.",
        },
      },
    ],
    changelog: [
      { version: "1.6.2", date: "2026-09-28", notes: [{ ar: "تحسين حساب أقصر طريق في المدن المزدحمة.", en: "Better shortest-route calculation in busy cities." }] },
      {
        version: "1.6.0",
        date: "2026-08-14",
        notes: [
          { ar: "اقتراح عميل بديل عند إلغاء زيارة.", en: "Suggests another customer when a visit is cancelled." },
          { ar: "دعم البيروني 2.4.", en: "Support for Albiruni 2.4." },
        ],
      },
    ],
  },
  {
    slug: "advanced-sales-reports",
    name: { ar: "تقارير المبيعات المتقدمة", en: "Advanced sales reports" },
    summary: {
      ar: "لوحات مؤشرات جاهزة للمبيعات حسب المنطقة والمندوب والصنف.",
      en: "Ready sales dashboards by region, sales rep and item.",
    },
    description: {
      ar: "تجمع الإضافة مبيعاتك في لوحات مؤشرات جاهزة حسب المنطقة والمندوب والصنف، وتحدّثها مع كل طلب. تعرف من أول نظرة أين تكسب وأين تتأخر، وتصدّر أي تقرير إلى Excel أو PDF.",
      en: "The add-on brings your sales together in ready dashboards by region, sales rep and item, updated with every order. You see at a glance where you're winning and where you're behind, and export any report to Excel or PDF.",
    },
    category: "reports",
    developer: "nawat",
    icon: { initials: "SR", tone: "secondary" },
    price: { EG: 900, SA: 180 },
    installs: 980,
    ratingBreakdown: [62, 14, 3, 1, 1],
    sectors: ALL_SECTORS,
    versions: ALL_VERSIONS,
    updatedAt: "2026-10-12",
    videoDuration: 195,
    features: [
      { ar: "لوحات جاهزة للمبيعات حسب المنطقة والمندوب والصنف.", en: "Ready dashboards by region, rep and item." },
      { ar: "مقارنة الفترات والأهداف في رسم واحد.", en: "Periods and targets compared in one chart." },
      { ar: "تصدير التقارير إلى Excel وPDF وجدولة إرسالها بالبريد.", en: "Export reports to Excel and PDF, and schedule them by email." },
    ],
    settingsStep: { ar: "اختر المؤشرات التي تظهر في كل لوحة، وحدّد من يراها.", en: "Pick the indicators each dashboard shows, and who can see it." },
    reviews: [
      {
        author: { ar: "مدير المبيعات", en: "Sales manager" },
        company: { ar: "شركة توزيع أدوية", en: "Pharmaceutical distributor" },
        rating: 5,
        text: {
          ar: "صرنا نراجع أرقام كل منطقة صباحًا في دقائق بدل جمعها من ملفات متفرقة.",
          en: "We now review every region's numbers in minutes each morning instead of collecting them from scattered files.",
        },
      },
    ],
    changelog: [
      {
        version: "2.1.0",
        date: "2026-10-12",
        notes: [
          { ar: "لوحة جديدة لمقارنة المناديب.", en: "New dashboard comparing sales reps." },
          { ar: "تصدير أسرع للتقارير الكبيرة.", en: "Faster export of large reports." },
        ],
      },
      {
        version: "2.0.0",
        date: "2026-07-01",
        notes: [
          { ar: "دعم البيروني 2.4.", en: "Support for Albiruni 2.4." },
          { ar: "تصميم جديد للوحات.", en: "Redesigned dashboards." },
        ],
      },
    ],
  },
  {
    slug: "whatsapp-business",
    name: { ar: "ربط واتساب للأعمال", en: "WhatsApp Business integration" },
    summary: {
      ar: "أرسل الفواتير وتذكيرات التحصيل للعملاء على واتساب مباشرة من البيروني.",
      en: "Send invoices and payment reminders to customers on WhatsApp, straight from Albiruni.",
    },
    description: {
      ar: "اربط رقم واتساب للأعمال بالبيروني، وأرسل الفواتير وكشوف الحساب وتذكيرات التحصيل للعملاء بضغطة واحدة. الرسائل تخرج باسم شركتك، ويُسجَّل كل إرسال في ملف العميل.",
      en: "Connect your WhatsApp Business number to Albiruni, and send invoices, statements and payment reminders to customers in one tap. Messages go out under your company's name, and every send is logged on the customer's file.",
    },
    category: "integrations",
    developer: "eliteTech",
    icon: { initials: "WA", tone: "success" },
    price: null,
    installs: 3200,
    ratingBreakdown: [192, 18, 3, 1, 0],
    sectors: ALL_SECTORS,
    versions: ALL_VERSIONS,
    updatedAt: "2026-11-02",
    videoDuration: 150,
    features: [
      { ar: "إرسال الفاتورة وكشف الحساب للعميل من شاشته مباشرة.", en: "Send an invoice or statement from the customer's screen." },
      { ar: "تذكيرات تحصيل تلقائية قبل موعد الاستحقاق.", en: "Automatic payment reminders before the due date." },
      { ar: "قوالب رسائل جاهزة بالعربية والإنجليزية.", en: "Ready message templates in Arabic and English." },
    ],
    settingsStep: {
      ar: "اربط رقم واتساب للأعمال، واختر القوالب ومواعيد التذكير.",
      en: "Connect your WhatsApp Business number, then choose the templates and reminder times.",
    },
    reviews: [
      {
        author: { ar: "المدير المالي", en: "Finance manager" },
        company: { ar: "شركة توزيع مشروبات", en: "Beverage distributor" },
        rating: 5,
        text: {
          ar: "تذكيرات التحصيل وحدها قلّلت المتأخرات بشكل واضح من أول شهر.",
          en: "The payment reminders alone clearly cut overdue balances from the first month.",
        },
      },
    ],
    changelog: [
      { version: "3.0.1", date: "2026-11-02", notes: [{ ar: "إصلاح ظهور الأسماء العربية في القوالب.", en: "Fixed Arabic names in templates." }] },
      {
        version: "3.0.0",
        date: "2026-09-20",
        notes: [
          { ar: "إرسال كشف الحساب بصيغة PDF.", en: "Send statements as PDF." },
          { ar: "قوالب باللغة الإنجليزية.", en: "English templates." },
        ],
      },
    ],
  },
  {
    slug: "location-attendance",
    name: { ar: "الحضور بالموقع", en: "Location-based attendance" },
    summary: { ar: "تسجيل حضور وانصراف الموظفين من الجوال بموقع العمل.", en: "Employees clock in and out from their phones at the work site." },
    description: {
      ar: "يسجّل الموظف حضوره وانصرافه من جواله، ولا يُقبل التسجيل إلا داخل نطاق موقع العمل. يرى المدير الحضور لحظة بلحظة، ويُرحَّل كل شيء إلى الرواتب دون إدخال يدوي.",
      en: "Employees clock in and out from their phones, and a check-in only counts inside the work site's area. Managers see attendance live, and everything flows to payroll with no manual entry.",
    },
    category: "hr",
    developer: "eliteTech",
    icon: { initials: "AT", tone: "accent" },
    price: null,
    installs: 2400,
    ratingBreakdown: [130, 33, 7, 2, 1],
    sectors: ALL_SECTORS,
    versions: ALL_VERSIONS,
    updatedAt: "2026-10-20",
    videoDuration: 130,
    features: [
      { ar: "تسجيل الحضور داخل نطاق جغرافي لكل فرع.", en: "Check-in limited to a set area around each branch." },
      { ar: "ورديات مرنة وأذونات وإجازات من التطبيق.", en: "Flexible shifts, permissions and leave from the app." },
      { ar: "تقرير تأخير وغياب جاهز لكل قسم.", en: "A ready lateness and absence report per department." },
    ],
    settingsStep: { ar: "حدّد نطاق كل فرع على الخريطة، ثم أضف الورديات.", en: "Set each branch's area on the map, then add the shifts." },
    reviews: [
      {
        author: { ar: "مسؤول الموارد البشرية", en: "HR officer" },
        company: { ar: "مركز خدمة سيارات", en: "Car service center" },
        rating: 5,
        text: {
          ar: "انتهت مشاكل التسجيل بالنيابة عن الزملاء، والتقرير الشهري جاهز بلا مجهود.",
          en: "No more clocking in for colleagues, and the monthly report is ready with no effort.",
        },
      },
    ],
    changelog: [
      { version: "2.3.0", date: "2026-10-20", notes: [{ ar: "أذونات الخروج المؤقت من التطبيق.", en: "Short leave requests from the app." }] },
      { version: "2.2.0", date: "2026-08-03", notes: [{ ar: "دعم أكثر من فرع للموظف الواحد.", en: "One employee can work at several branches." }] },
    ],
  },
  {
    slug: "shipping-delivery",
    name: { ar: "الشحن والتوصيل", en: "Shipping and delivery" },
    summary: { ar: "أنشئ بوالص الشحن وتابع حالة كل طلب حتى التسليم.", en: "Create shipping waybills and track every order until delivery." },
    description: {
      ar: "أنشئ بوليصة الشحن من الطلب نفسه، واطبعها، وسلّمها لشركة الشحن دون إعادة كتابة البيانات. تتابع حالة كل شحنة حتى التسليم، ويصل العميل رابط التتبع تلقائيًا.",
      en: "Create the shipping waybill from the order itself, print it and hand it to the courier without retyping anything. Track every shipment until delivery, and customers get the tracking link automatically.",
    },
    category: "inventory",
    developer: "codePlus",
    icon: { initials: "SH", tone: "albiruni" },
    price: { EG: 750, SA: 150 },
    installs: 640,
    ratingBreakdown: [41, 12, 3, 1, 1],
    sectors: ["distribution"],
    versions: ["2.4"],
    updatedAt: "2026-09-15",
    videoDuration: 175,
    features: [
      { ar: "بوليصة شحن من الطلب بضغطة واحدة.", en: "A waybill from the order in one tap." },
      { ar: "تتبع حالة الشحنة حتى التسليم.", en: "Track each shipment until delivery." },
      { ar: "تحصيل الدفع عند الاستلام وتسويته في الحسابات.", en: "Cash on delivery, settled in your accounts." },
    ],
    settingsStep: {
      ar: "أضف بيانات حسابك لدى شركة الشحن، واختر المخزن الذي تخرج منه الطلبات.",
      en: "Add your courier account details, and choose the warehouse orders ship from.",
    },
    reviews: [
      {
        author: { ar: "مدير المخازن", en: "Warehouse manager" },
        company: { ar: "شركة مستحضرات تجميل", en: "Cosmetics company" },
        rating: 4,
        text: {
          ar: "وفّرت علينا كتابة البوالص يدويًا، ونتمنى إضافة شركات شحن أكثر.",
          en: "It saved us writing waybills by hand; we'd like more couriers added.",
        },
      },
    ],
    changelog: [
      { version: "1.4.0", date: "2026-09-15", notes: [{ ar: "تحصيل الدفع عند الاستلام.", en: "Cash on delivery." }] },
      { version: "1.3.0", date: "2026-06-22", notes: [{ ar: "طباعة عدة بوالص مرة واحدة.", en: "Print several waybills at once." }] },
    ],
  },
  {
    slug: "payment-gateways",
    name: { ar: "بوابات الدفع الإلكتروني", en: "Online payment gateways" },
    summary: {
      ar: "استقبل مدفوعات العملاء بالبطاقات والمحافظ، وتُسجَّل تلقائيًا في الحسابات.",
      en: "Accept customer payments by card and wallet, recorded automatically in your accounts.",
    },
    description: {
      ar: "استقبل مدفوعات العملاء بالبطاقات والمحافظ الإلكترونية من رابط دفع أو من الفاتورة نفسها. كل دفعة تُسجَّل تلقائيًا على حساب العميل وتُقيَّد في الخزينة الصحيحة.",
      en: "Take customer payments by card and e-wallet from a payment link or the invoice itself. Every payment is recorded on the customer's account and posted to the right cash account automatically.",
    },
    category: "integrations",
    developer: "eliteTech",
    icon: { initials: "PG", tone: "primaryDark" },
    price: { EG: 650, SA: 130 },
    installs: 1900,
    ratingBreakdown: [115, 22, 3, 1, 1],
    sectors: ALL_SECTORS,
    versions: ALL_VERSIONS,
    updatedAt: "2026-10-30",
    videoDuration: 140,
    features: [
      { ar: "رابط دفع لكل فاتورة يُرسل للعميل.", en: "A payment link for every invoice, sent to the customer." },
      { ar: "البطاقات والمحافظ الإلكترونية في مكان واحد.", en: "Cards and e-wallets in one place." },
      { ar: "قيود تلقائية في الحسابات لكل دفعة.", en: "Automatic accounting entries for every payment." },
    ],
    settingsStep: {
      ar: "اربط حسابك لدى بوابة الدفع، واختر الخزينة التي تُسجَّل فيها المدفوعات.",
      en: "Connect your payment gateway account, and choose the cash account payments go to.",
    },
    reviews: [
      {
        author: { ar: "المحاسب", en: "Accountant" },
        company: { ar: "شركة توزيع أجهزة", en: "Appliance distributor" },
        rating: 5,
        text: {
          ar: "لم نعد نطابق التحويلات يدويًا، كل دفعة تظهر على حساب العميل مباشرة.",
          en: "We no longer match transfers by hand; every payment shows up on the customer's account right away.",
        },
      },
    ],
    changelog: [
      { version: "2.0.4", date: "2026-10-30", notes: [{ ar: "دعم محافظ إلكترونية جديدة.", en: "New e-wallets supported." }] },
      { version: "2.0.0", date: "2026-07-15", notes: [{ ar: "روابط دفع من الفاتورة.", en: "Payment links from invoices." }] },
    ],
  },
  {
    slug: "barcode-labels",
    name: { ar: "طباعة الباركود والملصقات", en: "Barcode and label printing" },
    summary: { ar: "اطبع ملصقات الأصناف والأرفف بالباركود من شاشة المخزون.", en: "Print barcode labels for items and shelves from the inventory screen." },
    description: {
      ar: "صمّم ملصق الصنف أو الرف مرة واحدة، واطبعه بالباركود من شاشة المخزون على أي طابعة ملصقات. يقرأ المندوب وأمين المخزن الباركود من الجوال لتسريع الجرد والتسليم.",
      en: "Design an item or shelf label once, and print it with its barcode from the inventory screen on any label printer. Reps and storekeepers scan barcodes from their phones to speed up stock counts and handovers.",
    },
    category: "inventory",
    developer: "codePlus",
    icon: { initials: "BC", tone: "ink" },
    price: null,
    installs: 1500,
    ratingBreakdown: [99, 18, 3, 1, 0],
    sectors: ["distribution", "carService"],
    versions: ALL_VERSIONS,
    updatedAt: "2026-08-27",
    videoDuration: 120,
    features: [
      { ar: "قوالب ملصقات قابلة للتعديل.", en: "Editable label templates." },
      { ar: "طباعة دفعة ملصقات لعدة أصناف.", en: "Print a batch of labels for many items." },
      { ar: "قراءة الباركود بكاميرا الجوال.", en: "Scan barcodes with the phone camera." },
    ],
    settingsStep: { ar: "اختر مقاس الملصق وطابعتك، ثم عدّل القالب.", en: "Choose the label size and your printer, then edit the template." },
    reviews: [
      {
        author: { ar: "أمين المخزن", en: "Storekeeper" },
        company: { ar: "شركة قطع غيار", en: "Spare parts company" },
        rating: 5,
        text: { ar: "الجرد صار أسرع بكثير بعد ما لصقنا الباركود على كل الأرفف.", en: "Stock counts got much faster once every shelf had a barcode." },
      },
    ],
    changelog: [
      { version: "1.9.1", date: "2026-08-27", notes: [{ ar: "دعم طابعات ملصقات إضافية.", en: "More label printers supported." }] },
      { version: "1.9.0", date: "2026-06-10", notes: [{ ar: "قراءة الباركود بكاميرا الجوال.", en: "Barcode scanning with the phone camera." }] },
    ],
  },
  {
    slug: "spare-parts-warranty",
    name: { ar: "ضمان قطع الغيار", en: "Spare parts warranty" },
    summary: { ar: "سجل ضمان لكل قطعة مركّبة في مراكز خدمة السيارات.", en: "A warranty record for every part fitted at car service centers." },
    description: {
      ar: "يسجّل مركز الخدمة ضمان كل قطعة يركّبها برقمها وتاريخها وسيارة العميل. عند عودة العميل يظهر الضمان فورًا، فتعرف هل الإصلاح مجاني أم لا.",
      en: "The service center records a warranty for every part it fits, with its number, date and the customer's car. When the customer comes back the warranty shows up at once, so you know whether the repair is free.",
    },
    category: "sectorTools",
    developer: "nawat",
    icon: { initials: "WR", tone: "albiruni" },
    price: { EG: 600, SA: 120 },
    installs: 310,
    ratingBreakdown: [20, 7, 1, 1, 0],
    sectors: ["carService"],
    versions: ["2.4"],
    updatedAt: "2026-07-19",
    videoDuration: 110,
    features: [
      { ar: "ضمان لكل قطعة مرتبط بسيارة العميل.", en: "A warranty per part, linked to the customer's car." },
      { ar: "تنبيه قبل انتهاء الضمان.", en: "An alert before a warranty ends." },
      { ar: "تقرير مطالبات الضمان لكل مورد.", en: "A warranty claims report per supplier." },
    ],
    settingsStep: { ar: "حدّد مدة الضمان لكل فئة قطع، واربطها بالموردين.", en: "Set the warranty period for each parts category, and link it to suppliers." },
    reviews: [
      {
        author: { ar: "مدير مركز الخدمة", en: "Service center manager" },
        company: { ar: "مركز صيانة سيارات", en: "Car maintenance center" },
        rating: 5,
        text: {
          ar: "انتهى الجدل مع العملاء حول الضمان، كل شيء مسجّل برقم القطعة.",
          en: "No more arguments with customers about warranties: everything is recorded by part number.",
        },
      },
    ],
    changelog: [
      { version: "1.2.0", date: "2026-07-19", notes: [{ ar: "تقرير مطالبات الضمان لكل مورد.", en: "Warranty claims report per supplier." }] },
      { version: "1.1.0", date: "2026-04-08", notes: [{ ar: "تنبيه قبل انتهاء الضمان.", en: "Alert before a warranty ends." }] },
    ],
  },
  {
    slug: "customer-loyalty",
    name: { ar: "نقاط الولاء للعملاء", en: "Customer loyalty points" },
    summary: { ar: "كافئ عملاءك بنقاط على كل طلب، واستبدلها بخصومات.", en: "Reward customers with points on every order, redeemable for discounts." },
    description: {
      ar: "اكسب ولاء عملائك بنقاط تُحتسب تلقائيًا على كل طلب، ويستبدلها العميل بخصم في طلبه التالي. تحدد قيمة النقطة ومستويات العملاء، وتتابع أثر البرنامج على المبيعات.",
      en: "Build customer loyalty with points earned automatically on every order, which customers redeem for a discount on their next one. You set the point value and customer tiers, and track the program's effect on sales.",
    },
    category: "sales",
    developer: "horizon",
    icon: { initials: "LP", tone: "secondaryDark" },
    price: { EG: 500, SA: 100 },
    installs: 420,
    ratingBreakdown: [24, 9, 3, 1, 0],
    sectors: ["distribution", "carService"],
    versions: ALL_VERSIONS,
    updatedAt: "2026-08-10",
    videoDuration: 125,
    features: [
      { ar: "نقاط تلقائية على كل طلب.", en: "Automatic points on every order." },
      { ar: "مستويات عملاء بمزايا مختلفة.", en: "Customer tiers with different perks." },
      { ar: "تقرير أثر البرنامج على المبيعات.", en: "A report on the program's effect on sales." },
    ],
    settingsStep: { ar: "حدّد قيمة النقطة ومستويات العملاء وشروط الاستبدال.", en: "Set the point value, customer tiers and redemption rules." },
    reviews: [
      {
        author: { ar: "مدير التسويق", en: "Marketing manager" },
        company: { ar: "شركة توزيع منظفات", en: "Detergents distributor" },
        rating: 4,
        text: {
          ar: "العملاء يطلبون أكثر للوصول للمستوى التالي، والإعداد كان بسيطًا.",
          en: "Customers order more to reach the next tier, and setup was simple.",
        },
      },
    ],
    changelog: [
      { version: "1.3.2", date: "2026-08-10", notes: [{ ar: "إصلاح احتساب النقاط في المرتجعات.", en: "Fixed points on returns." }] },
      { version: "1.3.0", date: "2026-05-18", notes: [{ ar: "مستويات العملاء.", en: "Customer tiers." }] },
    ],
  },
  {
    slug: "bank-reconciliation",
    name: { ar: "مطابقة كشوف البنوك", en: "Bank statement reconciliation" },
    summary: {
      ar: "استورد كشف الحساب البنكي وطابقه مع القيود تلقائيًا.",
      en: "Import your bank statement and match it with your entries automatically.",
    },
    description: {
      ar: "استورد كشف حسابك البنكي، وتطابق الإضافة كل حركة مع القيد المقابل لها تلقائيًا. تبقى أمامك الحركات غير المطابقة فقط لتراجعها.",
      en: "Import your bank statement, and the add-on matches every transaction with its entry automatically. Only the unmatched transactions are left for you to review.",
    },
    category: "accounting",
    developer: "nawat",
    icon: { initials: "BR", tone: "primary" },
    price: { EG: 850, SA: 170 },
    installs: 520,
    ratingBreakdown: [31, 10, 2, 1, 0],
    sectors: ALL_SECTORS,
    versions: ["2.4"],
    updatedAt: "2026-10-05",
    videoDuration: 145,
    features: [
      { ar: "استيراد كشوف البنوك بصيغ Excel وCSV.", en: "Import bank statements as Excel or CSV." },
      { ar: "مطابقة تلقائية بالمبلغ والتاريخ والمرجع.", en: "Automatic matching by amount, date and reference." },
      { ar: "تقرير تسوية جاهز للمراجعة.", en: "A reconciliation report ready for review." },
    ],
    settingsStep: { ar: "اربط كل حساب بنكي بحسابه في دليل الحسابات.", en: "Link each bank account to its account in the chart of accounts." },
    reviews: [
      {
        author: { ar: "رئيس الحسابات", en: "Head of accounts" },
        company: { ar: "شركة توزيع مواد بناء", en: "Building materials distributor" },
        rating: 5,
        text: { ar: "تسوية آخر الشهر صارت ساعة بدل يومين.", en: "Month-end reconciliation now takes an hour instead of two days." },
      },
    ],
    changelog: [
      { version: "1.1.0", date: "2026-10-05", notes: [{ ar: "دعم ملفات CSV.", en: "CSV files supported." }] },
      { version: "1.0.0", date: "2026-06-01", notes: [{ ar: "الإصدار الأول.", en: "First release." }] },
    ],
  },
  {
    slug: "installment-sales",
    name: { ar: "البيع بالتقسيط", en: "Installment sales" },
    summary: {
      ar: "قسّط فواتير العملاء وتابع الأقساط المستحقة والمتأخرة.",
      en: "Split customer invoices into installments and track what's due and overdue.",
    },
    description: {
      ar: "قسّط فاتورة العميل على دفعات بمواعيد ومبالغ تحددها، وتابع المستحق والمتأخر لكل عميل. تصل العميل تذكيرات قبل كل قسط، ويظهر للمحصّل ما عليه تحصيله اليوم.",
      en: "Split a customer's invoice into payments with the dates and amounts you choose, and track what's due and overdue per customer. Customers get a reminder before each installment, and collectors see what to collect today.",
    },
    category: "accounting",
    developer: "codePlus",
    icon: { initials: "IS", tone: "secondary" },
    price: { EG: 700, SA: 140 },
    installs: 260,
    ratingBreakdown: [11, 5, 2, 1, 0],
    sectors: ["distribution", "carService"],
    versions: ALL_VERSIONS,
    updatedAt: "2026-06-30",
    videoDuration: 135,
    features: [
      { ar: "جداول أقساط مرنة لكل فاتورة.", en: "Flexible installment schedules per invoice." },
      { ar: "قائمة يومية بالأقساط المستحقة للمحصّلين.", en: "A daily list of due installments for collectors." },
      { ar: "تقرير أعمار الأقساط المتأخرة.", en: "An aging report of overdue installments." },
    ],
    settingsStep: { ar: "حدّد خطط التقسيط المتاحة ونسبة المقدم.", en: "Set the available installment plans and the down payment." },
    reviews: [
      {
        author: { ar: "مدير الائتمان", en: "Credit manager" },
        company: { ar: "معرض أجهزة منزلية", en: "Home appliances showroom" },
        rating: 4,
        text: {
          ar: "متابعة الأقساط صارت أوضح، ونحتاج فقط تقارير أكثر تفصيلًا.",
          en: "Tracking installments is much clearer; we'd only like more detailed reports.",
        },
      },
    ],
    changelog: [
      { version: "1.0.3", date: "2026-06-30", notes: [{ ar: "تحسين تذكيرات الأقساط.", en: "Better installment reminders." }] },
      { version: "1.0.0", date: "2026-03-12", notes: [{ ar: "الإصدار الأول.", en: "First release." }] },
    ],
  },
  {
    slug: "employee-evaluation",
    name: { ar: "تقييم أداء الموظفين", en: "Employee performance reviews" },
    summary: {
      ar: "نماذج تقييم دورية للموظفين مع أهداف ومؤشرات لكل قسم.",
      en: "Periodic review forms for employees, with goals and indicators for each department.",
    },
    description: {
      ar: "أنشئ نماذج تقييم دورية لكل قسم بأهداف ومؤشرات واضحة، ويقيّم المدير فريقه من الجوال. تتجمع النتائج في تقرير يساعدك في قرارات المكافآت والتدريب.",
      en: "Create periodic review forms for each department with clear goals and indicators, and managers review their team from their phones. Results come together in a report that helps with bonus and training decisions.",
    },
    category: "hr",
    developer: "horizon",
    icon: { initials: "EV", tone: "success" },
    price: { EG: 550, SA: 110 },
    installs: 290,
    ratingBreakdown: [15, 6, 1, 1, 0],
    sectors: ALL_SECTORS,
    versions: ["2.4"],
    updatedAt: "2026-09-02",
    videoDuration: 115,
    features: [
      { ar: "نماذج تقييم لكل قسم بأهداف ومؤشرات.", en: "Review forms per department with goals and indicators." },
      { ar: "تقييم من الجوال للمديرين.", en: "Managers review from their phones." },
      { ar: "تقرير نتائج يدعم قرارات المكافآت.", en: "A results report that supports bonus decisions." },
    ],
    settingsStep: { ar: "أنشئ نموذج التقييم لكل قسم، وحدّد موعد كل دورة.", en: "Create the review form for each department, and set when each cycle runs." },
    reviews: [
      {
        author: { ar: "مدير الموارد البشرية", en: "HR manager" },
        company: { ar: "شركة توزيع أغذية", en: "Food distributor" },
        rating: 5,
        text: {
          ar: "أول دورة تقييم انتهت في أسبوع بدل شهر من الملفات الورقية.",
          en: "Our first review cycle finished in a week instead of a month of paperwork.",
        },
      },
    ],
    changelog: [
      { version: "1.0.1", date: "2026-09-02", notes: [{ ar: "إصلاحات في تقرير النتائج.", en: "Fixes in the results report." }] },
      { version: "1.0.0", date: "2026-05-25", notes: [{ ar: "الإصدار الأول.", en: "First release." }] },
    ],
  },
];
