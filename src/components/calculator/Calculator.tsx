"use client";

import { useCallback, useMemo, useState } from "react";
import { MotionConfig, motion } from "motion/react";
import { StarsBoldIcon } from "@solar-icons/react";
import { CONFIG } from "@/config/pricing";
import { calculate, defaultSelection, formatMoney, type Selection } from "@/lib/calculate";
import Logo from "@/components/shared/Logo";
import AnimatedNumber from "@/components/shared/AnimatedNumber";
import OptionRow from "./OptionRow";
import Step from "./Step";
import FeatureGroups from "./FeatureGroups";
import Summary from "./Summary";
import EstimateBar from "./EstimateBar";
import "./styles/calculator.css";

const groupsFor = (featureIds: string[]) =>
  CONFIG.featureGroups.filter((g) => g.features.some((f) => featureIds.includes(f.id))).map((g) => g.id);

const pct = (m: number) => `+${Math.round((m - 1) * 100)}%`;

export default function Calculator() {
  const [sel, setSel] = useState<Selection>(defaultSelection);
  const [open, setOpen] = useState<string[]>(() => groupsFor(defaultSelection().features));

  const type = CONFIG.projectTypes.find((t) => t.id === sel.type) ?? CONFIG.projectTypes[0];
  const estimate = useMemo(() => calculate(sel), [sel]);
  const missingSuggested = type.recommended.filter((id) => !sel.features.includes(id));

  const set = <K extends keyof Selection>(key: K, value: Selection[K]) => setSel((s) => ({ ...s, [key]: value }));

  function chooseType(id: string) {
    const t = CONFIG.projectTypes.find((x) => x.id === id)!;
    setSel((s) => ({ ...s, type: id, pages: Math.max(s.pages, t.includedPages) }));
    setOpen((o) => Array.from(new Set([...o, ...groupsFor(t.recommended)])));
  }

  function toggleFeature(id: string) {
    setSel((s) => ({
      ...s,
      features: s.features.includes(id) ? s.features.filter((f) => f !== id) : [...s.features, id],
    }));
  }

  function addSuggested() {
    setSel((s) => ({ ...s, features: Array.from(new Set([...s.features, ...type.recommended])) }));
    setOpen((o) => Array.from(new Set([...o, ...groupsFor(type.recommended)])));
  }

  function reset() {
    const d = defaultSelection();
    setSel(d);
    setOpen(groupsFor(d.features));
    window.scrollTo({ top: 0 });
  }

  const toggleGroup = useCallback(
    (id: string) => setOpen((o) => (o.includes(id) ? o.filter((x) => x !== id) : [...o, id])),
    []
  );

  return (
    <MotionConfig reducedMotion="user">
      <div className="page">
        <header className="site-header">
          <a className="brand-link" href={CONFIG.brand.url}>
            <Logo size={28} />
            {CONFIG.brand.name}
          </a>
          <span>Open source</span>
        </header>

        <motion.section
          className="hero"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1>How much will my website cost?</h1>
          <p>
            From a simple landing page to a full online store, POS or web app. Pick what you need and get an instant
            estimate. No sign-up, no sales call.
          </p>
          <div className="hero-estimate">
            <span>Your estimate so far</span>
            <b>
              <AnimatedNumber value={estimate.total} format={formatMoney} />
            </b>
          </div>
        </motion.section>

        <main>
          <Step title="What are you building?" hint="Choose the closest match. We'll suggest the features it usually needs.">
            <div className="option-list" role="radiogroup" aria-label="Project type">
              {CONFIG.projectTypes.map((t) => (
                <OptionRow
                  key={t.id}
                  icon={t.icon}
                  title={t.name}
                  desc={t.desc}
                  meta={`from ${formatMoney(t.base)}`}
                  selected={sel.type === t.id}
                  onSelect={() => chooseType(t.id)}
                />
              ))}
            </div>
          </Step>

          <Step title="How many pages?" hint="Count each separate screen, like Home, Shop, About or Dashboard.">
            <div className="pages-row">
              <input
                type="range"
                min={CONFIG.pages.min}
                max={CONFIG.pages.max}
                value={sel.pages}
                aria-label="Number of pages"
                onChange={(e) => set("pages", Number(e.target.value))}
              />
              <span className="pages-value">
                <AnimatedNumber value={sel.pages} format={String} />
              </span>
            </div>
            <p className="pages-note">
              {estimate.extraPages
                ? `${estimate.includedPages} included, ${estimate.extraPages} extra at ${formatMoney(CONFIG.pages.pricePerExtraPage)} each`
                : `${estimate.includedPages} page${estimate.includedPages > 1 ? "s" : ""} included in a ${type.name.toLowerCase()}`}
            </p>
          </Step>

          <Step title="How should it look?" hint="Design level affects the base build price.">
            <div className="option-list" role="radiogroup" aria-label="Design level">
              {CONFIG.design.map((d) => (
                <OptionRow
                  key={d.id}
                  icon={d.icon}
                  title={d.name}
                  desc={d.desc}
                  meta={d.multiplier === 1 ? "base price" : `× ${d.multiplier}`}
                  selected={sel.design === d.id}
                  onSelect={() => set("design", d.id)}
                />
              ))}
            </div>
          </Step>

          <Step
            title="What features do you need?"
            hint="Open a category and pick as many as you like."
            action={
              missingSuggested.length > 0 && (
                <button type="button" className="btn btn-secondary btn-sm" onClick={addSuggested}>
                  <StarsBoldIcon size={18} /> Add Suggested ({missingSuggested.length})
                </button>
              )
            }
          >
            <FeatureGroups
              selected={sel.features}
              recommended={type.recommended}
              open={open}
              onToggleGroup={toggleGroup}
              onToggleFeature={toggleFeature}
            />
          </Step>

          <Step title="When do you need it?" hint="Faster delivery costs more.">
            <div className="option-list" role="radiogroup" aria-label="Timeline">
              {CONFIG.timeline.map((t) => (
                <OptionRow
                  key={t.id}
                  icon={t.icon}
                  title={t.name}
                  desc={t.desc}
                  meta={t.multiplier === 1 ? "no extra" : pct(t.multiplier)}
                  selected={sel.timeline === t.id}
                  onSelect={() => set("timeline", t.id)}
                />
              ))}
            </div>
          </Step>

          <Step title="Ongoing care" hint="An optional monthly plan after launch.">
            <div className="option-list" role="radiogroup" aria-label="Care plan">
              {CONFIG.care.map((c) => (
                <OptionRow
                  key={c.id}
                  icon={c.icon}
                  title={c.name}
                  desc={c.desc}
                  meta={c.monthly ? `${formatMoney(c.monthly)}/mo` : "free"}
                  selected={sel.care === c.id}
                  onSelect={() => set("care", c.id)}
                />
              ))}
            </div>
          </Step>

          <Summary estimate={estimate} onReset={reset} />
        </main>

        <footer className="site-footer">
          <span>MIT licensed. Built with Next.js, TypeScript, Motion and Solar icons.</span>
          <a href={CONFIG.brand.url}>{CONFIG.brand.name}</a>
        </footer>
      </div>

      <EstimateBar estimate={estimate} />
    </MotionConfig>
  );
}
