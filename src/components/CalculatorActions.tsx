interface CalculatorActionsProps {
  onCalculate: () => void;
  onClear: () => void;
  onReset: () => void;
  isCalculateDisabled: boolean;
}

export function CalculatorActions({ onCalculate, onClear, onReset, isCalculateDisabled }: CalculatorActionsProps) {
  return (
    <div className="flex flex-wrap gap-3 pt-2">
      <button
        type="button"
        onClick={onCalculate}
        disabled={isCalculateDisabled}
        className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:bg-slate-400"
      >
        Calculer
      </button>
      <button
        type="button"
        onClick={onClear}
        className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800"
      >
        Effacer
      </button>
      <button
        type="button"
        onClick={onReset}
        className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800"
      >
        Nouveau calcul
      </button>
    </div>
  );
}

