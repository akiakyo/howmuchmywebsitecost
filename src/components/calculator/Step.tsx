import type { ReactNode } from "react";

interface Props {
  title: string;
  hint: string;
  action?: ReactNode;
  children: ReactNode;
}

export default function Step({ title, hint, action, children }: Props) {
  return (
    <section className="step">
      <div className="step-head">
        <div>
          <h2>{title}</h2>
          <p className="hint">{hint}</p>
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}
