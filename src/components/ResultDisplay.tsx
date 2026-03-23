interface ResultDisplayProps {
  resultValue: number | null;
  errorMessage: string | null;
}

export function ResultDisplay({ resultValue, errorMessage }: ResultDisplayProps) {
  if (errorMessage) {
    return <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{errorMessage}</div>;
  }

  if (resultValue === null) {
    return <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">Le résultat s'affichera ici.</div>;
  }

  return (
    <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
      Résultat : <span className="font-bold">{resultValue}</span>
    </div>
  );
}

