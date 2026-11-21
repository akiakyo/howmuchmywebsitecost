import { ALL_FEATURES, CONFIG } from "@/config/pricing";

export interface Selection {
  type: string;
  pages: number;
  design: string;
  features: string[];
  timeline: string;
  care: string;
}

export interface Line {
  id: string;
  label: string;
  amount: number;
}

export interface Estimate {
  lines: Line[];
  total: number;
  low: number;
  high: number;
  weeks: number;
  monthly: number;
  careName: string;
  includedPages: number;
  extraPages: number;
}

const find = <T extends { id: string }>(list: readonly T[], id: string): T =>
  list.find((x) => x.id === id) ?? list[0];

export const round = (n: number) => Math.round(n / CONFIG.roundTo) * CONFIG.roundTo;

export function formatMoney(n: number) {
  return new Intl.NumberFormat(CONFIG.currency.locale, {
    style: "currency",
    currency: CONFIG.currency.code,
    maximumFractionDigits: 0,
  }).format(n);
}

export function defaultSelection(): Selection {
  const type = CONFIG.projectTypes[2];
  return {
    type: type.id,
    pages: type.includedPages,
    design: CONFIG.design[0].id,
    features: [...type.recommended],
    timeline: CONFIG.timeline[0].id,
    care: CONFIG.care[0].id,
  };
}

export function calculate(sel: Selection): Estimate {
  const type = find(CONFIG.projectTypes, sel.type);
  const design = find(CONFIG.design, sel.design);
  const timeline = find(CONFIG.timeline, sel.timeline);
  const care = find(CONFIG.care, sel.care);
  const features = ALL_FEATURES.filter((f) => sel.features.includes(f.id));
  const extraPages = Math.max(0, sel.pages - type.includedPages);

  const lines: Line[] = [
    { id: "base", label: `${type.name} (${type.includedPages} page${type.includedPages > 1 ? "s" : ""} included)`, amount: type.base },
  ];
  const pageCost = extraPages * CONFIG.pages.pricePerExtraPage;
  if (extraPages) lines.push({ id: "pages", label: `${extraPages} extra page${extraPages > 1 ? "s" : ""}`, amount: pageCost });

  const build = type.base + pageCost;
  if (design.multiplier !== 1) {
    lines.push({ id: "design", label: `${design.name} design`, amount: build * (design.multiplier - 1) });
  }
  features.forEach((f) => lines.push({ id: f.id, label: f.name, amount: f.price }));

  const subtotal = build * design.multiplier + features.reduce((s, f) => s + f.price, 0);
  if (timeline.multiplier !== 1) {
    lines.push({ id: "timeline", label: `${timeline.name} delivery`, amount: subtotal * (timeline.multiplier - 1) });
  }

  const total = round(subtotal * timeline.multiplier);
  const designEffort = 1 + (design.multiplier - 1) * 0.5;
  const rawWeeks =
    (type.weeks + extraPages * CONFIG.pages.weeksPerExtraPage + features.reduce((s, f) => s + f.weeks, 0)) *
    designEffort *
    timeline.speed;

  const pct = CONFIG.rangePercent / 100;
  return {
    lines: lines.map((l) => ({ ...l, amount: round(l.amount) })),
    total,
    low: round(total * (1 - pct)),
    high: round(total * (1 + pct)),
    weeks: Math.max(1, Math.ceil(rawWeeks)),
    monthly: care.monthly,
    careName: care.name,
    includedPages: type.includedPages,
    extraPages,
  };
}

export function summaryText(e: Estimate) {
  const lines = e.lines.map((l) => `- ${l.label}: ${formatMoney(l.amount)}`).join("\n");
  const care = e.monthly ? `${formatMoney(e.monthly)}/month (${e.careName})` : "none";
  return [
    `Website estimate (${CONFIG.brand.name})`,
    "",
    lines,
    "",
    `Total: ${formatMoney(e.total)} (range ${formatMoney(e.low)} – ${formatMoney(e.high)})`,
    `Timeline: about ${e.weeks} week(s)`,
    `Monthly care: ${care}`,
    "",
    CONFIG.brand.url,
  ].join("\n");
}
