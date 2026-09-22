export function LoadingState({ label = 'Loading...' }: { label?: string }) {
  return <div className="rounded-2xl border border-dashed border-stone-300 bg-white/70 p-6 text-sm text-stone-600">{label}</div>;
}