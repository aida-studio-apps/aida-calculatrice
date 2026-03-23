import type { Operation } from '../types';

interface OperationSelectorProps {
  value: Operation;
  onChange: (operation: Operation) => void;
}

export function OperationSelector({ value, onChange }: OperationSelectorProps) {
  return (
    <div className="space-y-2">
      <label htmlFor="operation" className="block text-sm font-medium text-slate-700">
        Opération
      </label>
      <select
        id="operation"
        value={value}
        onChange={(event) => onChange(event.target.value as Operation)}
        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-slate-500 focus:outline-none"
      >
        <option value="add">Addition (+)</option>
        <option value="subtract">Soustraction (-)</option>
        <option value="multiply">Multiplication (×)</option>
        <option value="divide">Division (÷)</option>
      </select>
    </div>
  );
}

