import { useMemo, useState } from 'react';
import type { CalculatorInput, CalculationResult, Operation } from '../types';
import { computeOperation } from '../utils/calculator';
import { parseUserNumber } from '../utils/numberParser';

const initialInput: CalculatorInput = {
  firstValue: '',
  secondValue: '',
  operation: 'add',
};

const initialResult: CalculationResult = {
  value: null,
  error: null,
};

export function useCalculator() {
  const [input, setInput] = useState<CalculatorInput>(initialInput);
  const [result, setResult] = useState<CalculationResult>(initialResult);

  const setFirstValue = (value: string) => {
    setInput((prev) => ({ ...prev, firstValue: value }));
  };

  const setSecondValue = (value: string) => {
    setInput((prev) => ({ ...prev, secondValue: value }));
  };

  const setOperation = (operation: Operation) => {
    setInput((prev) => ({ ...prev, operation }));
  };

  const calculate = () => {
    const firstParsed = parseUserNumber(input.firstValue, 'nombre 1');
    if (firstParsed.error) {
      setResult({ value: null, error: firstParsed.error });
      return;
    }

    const secondParsed = parseUserNumber(input.secondValue, 'nombre 2');
    if (secondParsed.error) {
      setResult({ value: null, error: secondParsed.error });
      return;
    }

    const computed = computeOperation(firstParsed.value as number, secondParsed.value as number, input.operation);
    setResult(computed);
  };

  const clearInputs = () => {
    setInput((prev) => ({ ...prev, firstValue: '', secondValue: '' }));
    setResult(initialResult);
  };

  const resetAll = () => {
    setInput(initialInput);
    setResult(initialResult);
  };

  const isCalculateDisabled = useMemo(
    () => input.firstValue.trim().length === 0 || input.secondValue.trim().length === 0,
    [input.firstValue, input.secondValue],
  );

  return {
    input,
    result,
    setFirstValue,
    setSecondValue,
    setOperation,
    calculate,
    clearInputs,
    resetAll,
    isCalculateDisabled,
  };
}

