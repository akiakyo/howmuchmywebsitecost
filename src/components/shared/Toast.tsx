"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { DangerCircleBoldIcon } from "@solar-icons/react";
import "./styles/toast.css";

/** Error toast. Shows `message` until it times out or is dismissed. */
export default function Toast({ message, onClose }: { message: string | null; onClose: () => void }) {
  useEffect(() => {
    if (!message) return;
    const t = setTimeout(onClose, 4000);
    return () => clearTimeout(t);
  }, [message, onClose]);

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          className="toast"
          role="alert"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.2 }}
        >
          <DangerCircleBoldIcon size={20} />
          <span>{message}</span>
          <button type="button" className="toast-close" onClick={onClose}>
            Dismiss
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
