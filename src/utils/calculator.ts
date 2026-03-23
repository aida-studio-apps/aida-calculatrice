import type { Operation } from '../types';

export interface ComputeResult {
  value: number | null;
  error: string | null;
}

export function computeOperation(first: number, second: number, operation: Operation): ComputeResult {
  switch (operation) {
    case 'add':
      return { value: first + second, error: null };
    case 'subtract':
      return { value: first - second, error: null };
    case 'multiply':
      return { value: first * second, error: null };
    case 'divide':
      if (second === 0) {
        return { value: null, error: 'La division par zéro est impossible.' };
      }
      return { value: first / second, error: null };
    default:
      return { value: null, error: 'Opération non supportée.' };
  }
}

