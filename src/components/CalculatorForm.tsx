import { CalculatorActions } from './CalculatorActions';
import { OperationSelector } from './OperationSelector';
import { ResultDisplay } from './ResultDisplay';
import { useCalculator } from '../hooks/useCalculator';

export function CalculatorForm() {
  const {
    input,
    result,
    setFirstValue,
    setSecondValue,
    setOperation,
    calculate,
    clearInputs,
    resetAll,
    isCalculateDisabled,
  } = useCalculator();

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="first-number" className="block text-sm font-medium text-slate-700">
          Premier nombre
        </label>
        <input
          id="first-number"
          type="text"
          inputMode="decimal"
          value={input.firstValue}
          onChange={(event) => setFirstValue(event.target.value.replace('.', ','))}
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-slate-500 focus:outline-none"
          placeholder="Ex : 2"
        />
      </div>

      <OperationSelector value={input.operation} onChange={setOperation} />

      <div className="space-y-2">
        <label htmlFor="second-number" className="block text-sm font-medium text-slate-700">
          Second nombre
        </label>
        <input
          id="second-number"
          type="text"
          inputMode="decimal"
          value={input.secondValue}
          onChange={(event) => setSecondValue(event.target.value.replace('.', ','))}
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-slate-500 focus:outline-none"
          placeholder="Ex : 3"
        />
      </div>

      <CalculatorActions onCalculate={calculate} onClear={clearInputs} onReset={resetAll} isCalculateDisabled={isCalculateDisabled} />

      <ResultDisplay resultValue={result.value} errorMessage={result.error} />
    </div>
  );
}



