"use client";

import { AnimatePresence, motion } from "motion/react";
import { AltArrowDownBoldIcon } from "@solar-icons/react";
import { CONFIG } from "@/config/pricing";
import { formatMoney } from "@/lib/calculate";
import OptionRow from "./OptionRow";
import "./styles/feature-groups.css";

interface Props {
  selected: string[];
  recommended: string[];
  open: string[];
  onToggleGroup: (id: string) => void;
  onToggleFeature: (id: string) => void;
}

export default function FeatureGroups({ selected, recommended, open, onToggleGroup, onToggleFeature }: Props) {
  return (
    <div className="groups">
      {CONFIG.featureGroups.map((g) => {
        const isOpen = open.includes(g.id);
        const count = g.features.filter((f) => selected.includes(f.id)).length;
        const GroupIcon = g.icon;
        return (
          <div className="group" key={g.id}>
            <button
              type="button"
              className="group-btn"
              aria-expanded={isOpen}
              aria-controls={`group-${g.id}`}
              onClick={() => onToggleGroup(g.id)}
            >
              <span className="row-icon">
                <GroupIcon size={24} />
              </span>
              <span className="row-text">
                <span className="group-title">{g.name}</span>
                <span className="row-desc">{g.desc}</span>
              </span>
              <span className={`group-count${count ? " has" : ""}`}>{count ? `${count} selected` : "None"}</span>
              <span className={`group-chevron${isOpen ? " open" : ""}`} aria-hidden>
                <AltArrowDownBoldIcon size={20} />
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`group-${g.id}`}
                  key="body"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  style={{ overflow: "hidden" }}
                >
                  <div className="group-body">
                    {g.features.map((f) => (
                      <OptionRow
                        key={f.id}
                        multi
                        icon={f.icon}
                        title={f.name}
                        desc={f.desc}
                        meta={`+${formatMoney(f.price)}`}
                        selected={selected.includes(f.id)}
                        recommended={recommended.includes(f.id)}
                        onSelect={() => onToggleFeature(f.id)}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
