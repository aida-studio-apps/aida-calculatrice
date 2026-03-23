export interface ParsedNumberResult {
  value: number | null;
  error: string | null;
}

export function parseUserNumber(input: string, fieldLabel: string): ParsedNumberResult {
  const normalized = input.trim().replace(',', '.');

  if (normalized.length === 0) {
    return { value: null, error: `Le champ ${fieldLabel} est requis.` };
  }

  const value = Number(normalized);
  if (Number.isNaN(value)) {
    return { value: null, error: `Le champ ${fieldLabel} doit être un nombre valide.` };
  }

  return { value, error: null };
}

