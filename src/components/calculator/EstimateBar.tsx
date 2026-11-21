"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { formatMoney, type Estimate } from "@/lib/calculate";
import AnimatedNumber from "@/components/shared/AnimatedNumber";
import "./styles/estimate-bar.css";

/** Sticky estimate + action, hidden while the full summary is on screen. */
export default function EstimateBar({ estimate }: { estimate: Estimate }) {
  const [summaryVisible, setSummaryVisible] = useState(false);

  useEffect(() => {
    const el = document.getElementById("summary");
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setSummaryVisible(entry.isIntersecting), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <AnimatePresence>
      {!summaryVisible && (
        <motion.div
          className="estimate-bar"
          initial={{ y: 96 }}
          animate={{ y: 0 }}
          exit={{ y: 96 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="estimate-bar-text">
            <span>Estimate</span>
            <b>
              <AnimatedNumber value={estimate.total} format={formatMoney} />
            </b>
          </div>
          <a className="btn btn-primary btn-sm" href="#summary">
            See Estimate
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
