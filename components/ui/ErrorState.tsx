export function ErrorState({ message }: { message: string }) {
  return <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-sm font-medium text-rose-900">{message}</div>;
}