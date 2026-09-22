import type { PropsWithChildren, ReactNode } from 'react';

type CardProps = PropsWithChildren<{
  title?: string;
  eyebrow?: string;
  action?: ReactNode;
  className?: string;
}>;

export function Card({ title, eyebrow, action, className = '', children }: CardProps) {
  return (
    <section className={`rounded-[1.5rem] border border-orange-200 bg-white p-5 shadow-panel ${className}`}>
      {(eyebrow || title || action) && (
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            {eyebrow ? <p className="text-xs font-bold uppercase tracking-[0.28em] text-toastDark">{eyebrow}</p> : null}
            {title ? <h2 className="mt-1 text-xl font-black text-ink">{title}</h2> : null}
          </div>
          {action ? <div>{action}</div> : null}
        </div>
      )}
      {children}
    </section>
  );
}