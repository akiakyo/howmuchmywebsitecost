"use client";

import { useCallback, useState } from "react";
import { CheckCircleBoldIcon, CopyBoldIcon, LetterBoldIcon } from "@solar-icons/react";
import { CONFIG } from "@/config/pricing";
import { formatMoney, summaryText, type Estimate } from "@/lib/calculate";
import AnimatedNumber from "@/components/shared/AnimatedNumber";
import Toast from "@/components/shared/Toast";
import "./styles/summary.css";

export default function Summary({ estimate, onReset }: { estimate: Estimate; onReset: () => void }) {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const clearError = useCallback(() => setError(null), []);
  const { email } = CONFIG.brand;
  const text = summaryText(estimate);
  const mailto = `mailto:${email}?subject=${encodeURIComponent(
    `Website inquiry — estimate ${formatMoney(estimate.total)}`
  )}&body=${encodeURIComponent(text)}`;

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError("Couldn't copy to your clipboard. Try Send Inquiry instead.");
    }
  }

  return (
    <section id="summary" className="summary" aria-labelledby="summary-title">
      <h2 id="summary-title" className="summary-label">Your estimate</h2>
      <div className="summary-total" aria-live="polite">
        <AnimatedNumber value={estimate.total} format={formatMoney} />
      </div>
      <p className="summary-range">
        Likely range {formatMoney(estimate.low)} – {formatMoney(estimate.high)}
      </p>

      <div className="summary-actions">
        <a className="btn btn-primary" href={mailto}>
          <LetterBoldIcon size={20} /> Send Inquiry
        </a>
        <button type="button" className="btn btn-secondary" onClick={copy}>
          {copied ? <CheckCircleBoldIcon size={20} /> : <CopyBoldIcon size={20} />}
          {copied ? "Copied" : "Copy Estimate"}
        </button>
      </div>

      <dl className="summary-facts">
        <div>
          <dt>Timeline</dt>
          <dd>
            About {estimate.weeks} week{estimate.weeks > 1 ? "s" : ""}
          </dd>
        </div>
        <div>
          <dt>Monthly care</dt>
          <dd>{estimate.monthly ? `${formatMoney(estimate.monthly)}/mo` : "None"}</dd>
        </div>
      </dl>

      <h3 className="breakdown-title">Breakdown</h3>
      <ul className="breakdown">
        {estimate.lines.map((l) => (
          <li key={l.id}>
            <span>{l.label}</span>
            <span>{formatMoney(l.amount)}</span>
          </li>
        ))}
        <li className="breakdown-total">
          <span>Total</span>
          <span>{formatMoney(estimate.total)}</span>
        </li>
      </ul>

      <p className="summary-contact">
        Prefer to write yourself? Email <a href={`mailto:${email}`}>{email}</a>
      </p>
      <p className="summary-disclaimer">{CONFIG.disclaimer}</p>

      <button type="button" className="btn btn-tertiary" onClick={onReset}>
        Start Over
      </button>

      <Toast message={error} onClose={clearError} />
    </section>
  );
}
