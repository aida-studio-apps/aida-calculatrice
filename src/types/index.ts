export type Operation = 'add' | 'subtract' | 'multiply' | 'divide';

export interface CalculatorInput {
  firstValue: string;
  secondValue: string;
  operation: Operation;
}

export interface CalculationResult {
  value: number | null;
  error: string | null;
}

export interface CalculatorState {
  input: CalculatorInput;
  result: CalculationResult;
}

