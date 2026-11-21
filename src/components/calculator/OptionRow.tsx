"use client";

import type { Icon } from "@/config/pricing";
import "./styles/option-row.css";

interface Props {
  icon: Icon;
  title: string;
  desc: string;
  meta?: string;
  selected: boolean;
  multi?: boolean;
  recommended?: boolean;
  onSelect: () => void;
}

/** One choice in a list: a radio (single pick) or a checkbox (multi). */
export default function OptionRow({ icon: IconCmp, title, desc, meta, selected, multi, recommended, onSelect }: Props) {
  return (
    <button
      type="button"
      role={multi ? "checkbox" : "radio"}
      aria-checked={selected}
      className={`row${selected ? " on" : ""}`}
      onClick={onSelect}
    >
      <span className="row-icon">
        <IconCmp size={24} />
      </span>
      <span className="row-text">
        <span className="row-title">
          {title}
          {recommended && !selected && <span className="row-note">Suggested</span>}
        </span>
        <span className="row-desc">{desc}</span>
      </span>
      {meta && <span className="row-price">{meta}</span>}
      <span className={`row-mark${multi ? " box" : ""}`} aria-hidden>
        {selected && (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            {multi ? (
              <path d="M2.5 7.5l3 3 6-7" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" />
            ) : (
              <circle cx="7" cy="7" r="4" fill="currentColor" />
            )}
          </svg>
        )}
      </span>
    </button>
  );
}
