import { useMemo, useState } from 'react';

type Operation = '+' | '-' | '×' | '÷';

type ActiveInput = 'first' | 'second';

interface CalculatorState {
  firstValue: string;
  secondValue: string;
  operation: Operation | null;
  activeInput: ActiveInput;
  result: string;
  message: string | null;
}

const initialState: CalculatorState = {
  firstValue: '',
  secondValue: '',
  operation: null,
  activeInput: 'first',
  result: '0',
  message: null,
};

function normalizeNumber(value: string): number {
  return Number(value.replace(',', '.'));
}

function formatResult(value: number): string {
  const rounded = Number.isInteger(value) ? value.toString() : value.toString();
  return rounded.replace('.', ',');
}

export default function App() {
  const [state, setState] = useState<CalculatorState>(initialState);

  const displayValue = useMemo(() => {
    if (state.operation === null) {
      return state.firstValue || state.result;
    }

    const secondPart = state.secondValue ? ` ${state.secondValue}` : '';
    return `${state.firstValue || '0'} ${state.operation}${secondPart}`;
  }, [state.firstValue, state.secondValue, state.operation, state.result]);

  const appendDigit = (digit: string) => {
    setState((prev) => {
      const key = prev.activeInput === 'first' ? 'firstValue' : 'secondValue';
      const current = prev[key];

      if (digit === ',' && current.includes(',')) {
        return prev;
      }

      const nextValue = current === '0' && digit !== ',' ? digit : `${current}${digit}`;

      return {
        ...prev,
        [key]: nextValue,
        message: null,
      };
    });
  };

  const chooseOperation = (operation: Operation) => {
    setState((prev) => {
      const first = prev.firstValue || prev.result;
      return {
        ...prev,
        firstValue: first === '0' ? '' : first,
        operation,
        activeInput: 'second',
        message: null,
      };
    });
  };

  const clearAll = () => {
    setState(initialState);
  };

  const backspace = () => {
    setState((prev) => {
      const key = prev.activeInput === 'first' ? 'firstValue' : 'secondValue';
      const current = prev[key];
      if (!current) return prev;
      return {
        ...prev,
        [key]: current.slice(0, -1),
        message: null,
      };
    });
  };

  const compute = () => {
    setState((prev) => {
      if (!prev.operation || !prev.firstValue || !prev.secondValue) {
        return {
          ...prev,
          message: 'Veuillez saisir deux valeurs et choisir une opération.',
        };
      }

      const a = normalizeNumber(prev.firstValue);
      const b = normalizeNumber(prev.secondValue);

      if (prev.operation === '÷' && b === 0) {
        return {
          ...prev,
          message: 'La division par zéro est impossible.',
          result: '0',
        };
      }

      let value = 0;
      if (prev.operation === '+') value = a + b;
      if (prev.operation === '-') value = a - b;
      if (prev.operation === '×') value = a * b;
      if (prev.operation === '÷') value = a / b;

      const formatted = formatResult(value);

      return {
        ...prev,
        firstValue: formatted,
        secondValue: '',
        operation: null,
        activeInput: 'first',
        result: formatted,
        message: null,
      };
    });
  };

  const buttonClass =
    'rounded-xl px-4 py-4 text-xl font-semibold transition active:scale-[0.98]';

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 px-4 py-8">
      <div className="mx-auto w-full max-w-md rounded-3xl bg-slate-950/80 p-5 shadow-2xl ring-1 ring-white/10">
        <h1 className="mb-4 text-center text-2xl font-bold text-white">Calculatrice</h1>

        <div className="mb-5 rounded-2xl bg-slate-900 p-4 text-right">
          <div className="min-h-8 text-sm text-slate-400">{displayValue}</div>
          <div className="mt-1 min-h-10 text-4xl font-bold text-white">{state.result}</div>
          {state.message ? <p className="mt-2 text-sm text-rose-400">{state.message}</p> : null}
        </div>

        <div className="grid grid-cols-4 gap-3">
          <button type="button" onClick={clearAll} className={`${buttonClass} bg-rose-500 text-white`}>
            C
          </button>
          <button type="button" onClick={backspace} className={`${buttonClass} bg-amber-500 text-white`}>
            ⌫
          </button>
          <button type="button" onClick={() => chooseOperation('÷')} className={`${buttonClass} bg-indigo-500 text-white`}>
            ÷
          </button>
          <button type="button" onClick={() => chooseOperation('×')} className={`${buttonClass} bg-indigo-500 text-white`}>
            ×
          </button>

          {['7', '8', '9'].map((n) => (
            <button key={n} type="button" onClick={() => appendDigit(n)} className={`${buttonClass} bg-slate-800 text-white`}>
              {n}
            </button>
          ))}
          <button type="button" onClick={() => chooseOperation('-')} className={`${buttonClass} bg-indigo-500 text-white`}>
            -
          </button>

          {['4', '5', '6'].map((n) => (
            <button key={n} type="button" onClick={() => appendDigit(n)} className={`${buttonClass} bg-slate-800 text-white`}>
              {n}
            </button>
          ))}
          <button type="button" onClick={() => chooseOperation('+')} className={`${buttonClass} row-span-2 bg-indigo-500 text-white`}>
            +
          </button>

          {['1', '2', '3'].map((n) => (
            <button key={n} type="button" onClick={() => appendDigit(n)} className={`${buttonClass} bg-slate-800 text-white`}>
              {n}
            </button>
          ))}

          <button type="button" onClick={() => appendDigit('0')} className={`${buttonClass} col-span-2 bg-slate-800 text-white`}>
            0
          </button>
          <button type="button" onClick={() => appendDigit(',')} className={`${buttonClass} bg-slate-800 text-white`}>
            ,
          </button>
          <button type="button" onClick={compute} className={`${buttonClass} bg-emerald-500 text-white`}>
            =
          </button>
        </div>
      </div>
    </main>
  );
}

