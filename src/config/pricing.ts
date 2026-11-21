/* =====================================================================
   PRICING CONFIG
   Edit this file to change every price, option, icon and label.
   No other code changes are needed. Prices are sample numbers: set your own.
   Icons: any "...BoldIcon" from @solar-icons/react (https://solar-icons.vercel.app)
   ===================================================================== */
import type { ComponentType } from "react";
import {
  AccessibilityBoldIcon,
  BillListBoldIcon,
  BoltBoldIcon,
  BoxBoldIcon,
  Buildings2BoldIcon,
  CalendarAddBoldIcon,
  CalculatorBoldIcon,
  Card2BoldIcon,
  CartLargeBoldIcon,
  ChartSquareBoldIcon,
  ChatDotsBoldIcon,
  ChatRoundBoldIcon,
  CheckCircleBoldIcon,
  CloudBoldIcon,
  Code2BoldIcon,
  CpuBoldIcon,
  DatabaseBoldIcon,
  DeliveryBoldIcon,
  DiplomaBoldIcon,
  Document2BoldIcon,
  DocumentsBoldIcon,
  GalleryBoldIcon,
  GlobalBoldIcon,
  GraphUpBoldIcon,
  HeartAngleBoldIcon,
  InboxBoldIcon,
  LayersBoldIcon,
  LetterBoldIcon,
  LockBoldIcon,
  MonitorSmartphoneBoldIcon,
  MoonBoldIcon,
  NotebookBoldIcon,
  PaletteBoldIcon,
  PenNewSquareBoldIcon,
  PlugCircleBoldIcon,
  Printer2BoldIcon,
  QrCodeBoldIcon,
  RefreshBoldIcon,
  RocketBoldIcon,
  ServerBoldIcon,
  ShieldCheckBoldIcon,
  Shop2BoldIcon,
  ShopBoldIcon,
  SmartphoneBoldIcon,
  Star2BoldIcon,
  StarBoldIcon,
  StarsBoldIcon,
  TagBoldIcon,
  TranslationBoldIcon,
  UploadBoldIcon,
  UserIdBoldIcon,
  UsersGroupRoundedBoldIcon,
  WalletBoldIcon,
  Widget5BoldIcon,
} from "@solar-icons/react";

export type Icon = ComponentType<{ size?: number | string; color?: string; className?: string }>;

export interface ProjectType {
  id: string;
  name: string;
  desc: string;
  icon: Icon;
  base: number;
  includedPages: number;
  weeks: number;
  /** feature ids suggested for this project type */
  recommended: string[];
}

export interface DesignLevel {
  id: string;
  name: string;
  desc: string;
  icon: Icon;
  multiplier: number;
}

export interface Feature {
  id: string;
  name: string;
  desc: string;
  icon: Icon;
  price: number;
  weeks: number;
}

export interface FeatureGroup {
  id: string;
  name: string;
  desc: string;
  icon: Icon;
  features: Feature[];
}

export interface TimelineOption {
  id: string;
  name: string;
  desc: string;
  icon: Icon;
  multiplier: number;
  /** 1 = normal, 0.5 = twice as fast */
  speed: number;
}

export interface CarePlan {
  id: string;
  name: string;
  desc: string;
  icon: Icon;
  monthly: number;
}

export const CONFIG = {
  brand: {
    name: "akiakyo.dev",
    url: "https://akiakyo.dev",
    email: "hello@akiakyo.dev", // change this
  },
  currency: { code: "PHP", locale: "en-PH" },
  rangePercent: 15,
  roundTo: 500,
  disclaimer:
    "This is an estimate, not a quote. The final price depends on the details, so let's talk before anything is final.",

  projectTypes: [
    { id: "landing", name: "Landing page", desc: "One page that sells one thing", icon: RocketBoldIcon, base: 8000, includedPages: 1, weeks: 1, recommended: ["forms", "seo", "analytics"] },
    { id: "portfolio", name: "Portfolio", desc: "Show your work and get hired", icon: GalleryBoldIcon, base: 12000, includedPages: 4, weeks: 1.5, recommended: ["forms", "seo", "animations"] },
    { id: "business", name: "Business website", desc: "Home, about, services, contact", icon: Buildings2BoldIcon, base: 18000, includedPages: 6, weeks: 2, recommended: ["forms", "seo", "analytics", "hosting"] },
    { id: "blog", name: "Blog / news site", desc: "Articles, categories, authors", icon: NotebookBoldIcon, base: 20000, includedPages: 6, weeks: 2.5, recommended: ["cms", "blog", "search", "seo", "newsletter"] },
    { id: "ecommerce", name: "Full online store", desc: "Products, cart, checkout, orders", icon: ShopBoldIcon, base: 45000, includedPages: 10, weeks: 5, recommended: ["catalog", "cart", "payments", "orders", "inventory", "shipping", "promos"] },
    { id: "pos", name: "POS system", desc: "In-store selling, stock and sales", icon: CalculatorBoldIcon, base: 50000, includedPages: 6, weeks: 5, recommended: ["pos-core", "inventory", "barcode", "receipts", "staff", "pos-reports"] },
    { id: "webapp", name: "Web app", desc: "Logins, dashboards, custom logic", icon: MonitorSmartphoneBoldIcon, base: 70000, includedPages: 8, weeks: 7, recommended: ["auth", "roles", "dashboard", "api", "notifications"] },
    { id: "saas", name: "SaaS platform", desc: "Paid product with subscriptions", icon: CloudBoldIcon, base: 120000, includedPages: 12, weeks: 10, recommended: ["auth", "roles", "dashboard", "api", "subscriptions", "notifications", "cicd"] },
    { id: "marketplace", name: "Marketplace", desc: "Many sellers, many buyers", icon: Shop2BoldIcon, base: 150000, includedPages: 14, weeks: 12, recommended: ["catalog", "cart", "payments", "orders", "multivendor", "reviews", "auth"] },
  ] satisfies ProjectType[],

  pages: { min: 1, max: 50, pricePerExtraPage: 1500, weeksPerExtraPage: 0.15 },

  design: [
    { id: "template", name: "Template-based", desc: "Clean, proven layout with your branding", icon: Widget5BoldIcon, multiplier: 1 },
    { id: "custom", name: "Custom design", desc: "Designed from scratch in Figma", icon: PenNewSquareBoldIcon, multiplier: 1.4 },
    { id: "premium", name: "Premium", desc: "Custom design, motion, extra polish", icon: StarsBoldIcon, multiplier: 1.8 },
  ] satisfies DesignLevel[],

  featureGroups: [
    {
      id: "content", name: "Content & CMS", desc: "Edit your site without calling a developer", icon: DocumentsBoldIcon,
      features: [
        { id: "cms", name: "Headless CMS", desc: "Edit pages, text and images yourself", icon: Document2BoldIcon, price: 10000, weeks: 0.8 },
        { id: "blog", name: "Blog", desc: "Posts, categories, tags, authors", icon: NotebookBoldIcon, price: 6000, weeks: 0.5 },
        { id: "forms", name: "Contact forms", desc: "Messages go straight to your inbox", icon: LetterBoldIcon, price: 2000, weeks: 0.1 },
        { id: "media", name: "Media library", desc: "Upload and manage images and files", icon: GalleryBoldIcon, price: 4000, weeks: 0.3 },
        { id: "search", name: "Site search", desc: "Fast search across all content", icon: LayersBoldIcon, price: 5000, weeks: 0.4 },
        { id: "multilang", name: "Multiple languages", desc: "e.g. English and Filipino", icon: TranslationBoldIcon, price: 8000, weeks: 0.6 },
      ],
    },
    {
      id: "commerce", name: "E-commerce", desc: "Everything a full online store needs", icon: CartLargeBoldIcon,
      features: [
        { id: "catalog", name: "Product catalog", desc: "Products, variants, categories, filters", icon: BoxBoldIcon, price: 8000, weeks: 0.7 },
        { id: "cart", name: "Cart & checkout", desc: "Smooth checkout, guest or member", icon: CartLargeBoldIcon, price: 10000, weeks: 0.8 },
        { id: "payments", name: "Online payments", desc: "GCash, Maya, cards and bank transfer", icon: Card2BoldIcon, price: 12000, weeks: 0.8 },
        { id: "orders", name: "Order management", desc: "Track, update and refund orders", icon: InboxBoldIcon, price: 8000, weeks: 0.6 },
        { id: "inventory", name: "Inventory & stock", desc: "Stock levels and low-stock alerts", icon: BoxBoldIcon, price: 10000, weeks: 0.7 },
        { id: "shipping", name: "Shipping & delivery", desc: "Rates, zones, courier tracking", icon: DeliveryBoldIcon, price: 6000, weeks: 0.5 },
        { id: "promos", name: "Discounts & vouchers", desc: "Promo codes, sales, bundles", icon: TagBoldIcon, price: 5000, weeks: 0.4 },
        { id: "reviews", name: "Product reviews", desc: "Ratings and photo reviews", icon: StarBoldIcon, price: 4000, weeks: 0.3 },
        { id: "wishlist", name: "Wishlist", desc: "Customers save items for later", icon: HeartAngleBoldIcon, price: 3000, weeks: 0.2 },
        { id: "invoices", name: "Invoices & receipts", desc: "Auto-generated PDF invoices", icon: BillListBoldIcon, price: 4000, weeks: 0.3 },
        { id: "multivendor", name: "Multi-vendor", desc: "Sellers get their own shops and payouts", icon: Shop2BoldIcon, price: 35000, weeks: 2.5 },
      ],
    },
    {
      id: "pos", name: "Point of Sale (POS)", desc: "Sell in-store and keep stock in sync", icon: CalculatorBoldIcon,
      features: [
        { id: "pos-core", name: "POS terminal", desc: "Fast in-store checkout screen", icon: CalculatorBoldIcon, price: 25000, weeks: 1.5 },
        { id: "barcode", name: "Barcode & QR scanning", desc: "Scan items with a scanner or camera", icon: QrCodeBoldIcon, price: 6000, weeks: 0.5 },
        { id: "receipts", name: "Receipt printing", desc: "Thermal printer support", icon: Printer2BoldIcon, price: 5000, weeks: 0.4 },
        { id: "staff", name: "Staff accounts & shifts", desc: "Cashier logins, cash-in/cash-out", icon: UserIdBoldIcon, price: 8000, weeks: 0.6 },
        { id: "multibranch", name: "Multi-branch sync", desc: "Several stores, one inventory", icon: Buildings2BoldIcon, price: 15000, weeks: 1 },
        { id: "offline", name: "Offline mode", desc: "Keeps selling when the internet drops", icon: RefreshBoldIcon, price: 12000, weeks: 1 },
        { id: "pos-reports", name: "Sales reports", desc: "Daily, weekly, per item, per cashier", icon: ChartSquareBoldIcon, price: 8000, weeks: 0.6 },
      ],
    },
    {
      id: "app", name: "Web app & development", desc: "Accounts, data and custom features", icon: Code2BoldIcon,
      features: [
        { id: "auth", name: "User accounts", desc: "Sign up, log in, reset password", icon: LockBoldIcon, price: 8000, weeks: 0.6 },
        { id: "social-login", name: "Social login", desc: "Google, Facebook, Apple", icon: UsersGroupRoundedBoldIcon, price: 4000, weeks: 0.3 },
        { id: "roles", name: "Roles & permissions", desc: "Admin, staff, customer access levels", icon: ShieldCheckBoldIcon, price: 8000, weeks: 0.6 },
        { id: "dashboard", name: "Admin dashboard", desc: "Manage users, data and settings", icon: Widget5BoldIcon, price: 15000, weeks: 1.2 },
        { id: "api", name: "Database & API", desc: "Custom backend, REST or GraphQL", icon: DatabaseBoldIcon, price: 15000, weeks: 1.2 },
        { id: "realtime", name: "Realtime chat & updates", desc: "Live messages, presence, feeds", icon: ChatDotsBoldIcon, price: 15000, weeks: 1.2 },
        { id: "notifications", name: "Email & push notifications", desc: "Alerts, receipts, reminders", icon: LetterBoldIcon, price: 6000, weeks: 0.5 },
        { id: "uploads", name: "File uploads", desc: "Documents, photos, storage", icon: UploadBoldIcon, price: 5000, weeks: 0.4 },
        { id: "booking", name: "Booking & scheduling", desc: "Appointments, slots, calendars", icon: CalendarAddBoldIcon, price: 10000, weeks: 0.8 },
        { id: "subscriptions", name: "Subscriptions & billing", desc: "Plans, recurring payments, trials", icon: WalletBoldIcon, price: 15000, weeks: 1.2 },
        { id: "integrations", name: "Third-party integrations", desc: "Connect CRMs, sheets, other APIs", icon: PlugCircleBoldIcon, price: 8000, weeks: 0.6 },
        { id: "ai", name: "AI features", desc: "Chatbot, smart search, auto-writing", icon: CpuBoldIcon, price: 20000, weeks: 1.5 },
        { id: "pwa", name: "Installable app (PWA)", desc: "Add to home screen, works like an app", icon: SmartphoneBoldIcon, price: 10000, weeks: 0.8 },
      ],
    },
    {
      id: "growth", name: "Marketing & SEO", desc: "Get found and grow", icon: GraphUpBoldIcon,
      features: [
        { id: "seo", name: "SEO setup", desc: "Meta tags, sitemap, Google Search Console", icon: GlobalBoldIcon, price: 4000, weeks: 0.3 },
        { id: "analytics", name: "Analytics", desc: "Visitors, sources, conversions", icon: ChartSquareBoldIcon, price: 2000, weeks: 0.1 },
        { id: "newsletter", name: "Newsletter", desc: "Email sign-ups and campaigns", icon: LetterBoldIcon, price: 4000, weeks: 0.3 },
        { id: "livechat", name: "Live chat widget", desc: "Messenger or chat on your site", icon: ChatRoundBoldIcon, price: 3000, weeks: 0.2 },
        { id: "performance", name: "Speed optimization", desc: "Top Core Web Vitals scores", icon: BoltBoldIcon, price: 5000, weeks: 0.4 },
        { id: "a11y", name: "Accessibility", desc: "WCAG-friendly for every visitor", icon: AccessibilityBoldIcon, price: 6000, weeks: 0.5 },
      ],
    },
    {
      id: "design", name: "Design extras", desc: "Make it memorable", icon: PaletteBoldIcon,
      features: [
        { id: "animations", name: "Animations", desc: "Scroll, hover and page transitions", icon: StarsBoldIcon, price: 6000, weeks: 0.5 },
        { id: "darkmode", name: "Dark mode", desc: "Light and dark themes", icon: MoonBoldIcon, price: 4000, weeks: 0.3 },
        { id: "branding", name: "Logo & brand kit", desc: "Logo, colors, fonts, guidelines", icon: PaletteBoldIcon, price: 10000, weeks: 0.8 },
        { id: "illustrations", name: "Custom illustrations", desc: "Original graphics and icons", icon: PenNewSquareBoldIcon, price: 8000, weeks: 0.7 },
        { id: "3d", name: "3D / WebGL", desc: "Interactive 3D scenes", icon: LayersBoldIcon, price: 15000, weeks: 1.2 },
      ],
    },
    {
      id: "infra", name: "Launch & infrastructure", desc: "Hosting, security, quality", icon: ServerBoldIcon,
      features: [
        { id: "hosting", name: "Domain, hosting & SSL", desc: "Set up and connected for you", icon: ServerBoldIcon, price: 3000, weeks: 0.1 },
        { id: "security", name: "Security hardening", desc: "Rate limits, audits, best practices", icon: ShieldCheckBoldIcon, price: 8000, weeks: 0.6 },
        { id: "backups", name: "Automatic backups", desc: "Daily backups you can restore", icon: RefreshBoldIcon, price: 3000, weeks: 0.2 },
        { id: "cicd", name: "CI/CD & staging", desc: "Safe deploys and a test site", icon: RocketBoldIcon, price: 5000, weeks: 0.4 },
        { id: "testing", name: "Automated testing", desc: "Fewer bugs reach your users", icon: CheckCircleBoldIcon, price: 10000, weeks: 0.8 },
        { id: "docs", name: "Docs & handover", desc: "Guides and training for your team", icon: DiplomaBoldIcon, price: 4000, weeks: 0.3 },
      ],
    },
  ] satisfies FeatureGroup[],

  timeline: [
    { id: "standard", name: "Standard", desc: "Normal schedule", icon: CalendarAddBoldIcon, multiplier: 1, speed: 1 },
    { id: "priority", name: "Priority", desc: "About 25% sooner", icon: BoltBoldIcon, multiplier: 1.25, speed: 0.75 },
    { id: "rush", name: "Rush", desc: "About half the time", icon: RocketBoldIcon, multiplier: 1.5, speed: 0.55 },
  ] satisfies TimelineOption[],

  care: [
    { id: "none", name: "No plan", desc: "I'll handle it myself", icon: UserIdBoldIcon, monthly: 0 },
    { id: "basic", name: "Basic care", desc: "Hosting help, backups, small fixes", icon: ShieldCheckBoldIcon, monthly: 2000 },
    { id: "pro", name: "Full care", desc: "Basic + monthly updates and reports", icon: Star2BoldIcon, monthly: 5000 },
    { id: "enterprise", name: "Dedicated", desc: "Priority support and new features", icon: StarsBoldIcon, monthly: 12000 },
  ] satisfies CarePlan[],
};

export const ALL_FEATURES: Feature[] = CONFIG.featureGroups.flatMap((g) => g.features);
