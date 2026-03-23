# Conventions de code — Projet calculatrice (React + TypeScript + Tailwind)

## 1) Nommage
- **Composants React** : PascalCase (`CalculatorForm.tsx`, `ResultDisplay.tsx`).
- **Hooks** : camelCase préfixé par `use` (`useCalculator.ts`).
- **Fonctions/variables** : camelCase (`handleCalculate`, `firstValue`).
- **Types/interfaces** : PascalCase (`CalculatorState`, `CalculationResult`).
- **Constantes globales** : UPPER_SNAKE_CASE (`DEFAULT_OPERATION`).

## 2) Exports
- **Composants** : `export default`.
- **Utils, hooks, types** : exports nommés.
- Un fichier `src/types/index.ts` centralise les types partagés.

## 3) Ordre des imports
Toujours respecter cet ordre avec ligne vide entre groupes :
1. React (`react`)
2. Librairies tierces
3. Imports locaux absolus/relatifs (`components`, `hooks`, `utils`, `types`)
4. Styles (si applicable)

## 4) Style des composants
- Utiliser des **arrow functions** pour les composants.
- Props typées explicitement (pas de `any`).
- Garder les composants présentationales simples, sans logique métier lourde.
- Mettre la logique de calcul/validation dans `hooks/` et `utils/`.

## 5) TypeScript
- **Interdiction de `any`**.
- Préférer les unions littérales pour les enums simples (`Operation`).
- Les entrées utilisateur restent en `string` jusqu’à validation/parsing.
- Retourner des types explicites pour toutes les fonctions utilitaires.

## 6) Gestion d’erreurs
- Validation des entrées avant calcul.
- Messages d’erreur utilisateur explicites et actionnables.
- Cas métier obligatoire : division par zéro.
- Pas de `try/catch` inutile pour la logique pure locale ; préférer des retours typés (`error`/`value`).

## 7) UI / Tailwind
- Utiliser uniquement des classes Tailwind dans le JSX.
- Pas de CSS custom sauf nécessité absolue.
- Conserver une UI sobre, lisible, responsive de base.

## 8) Organisation
- `components/` : uniquement UI et interaction.
- `hooks/` : orchestration d’état et handlers.
- `utils/` : fonctions pures testables.
- `types/` : modèles TS partagés.

## 9) Qualité
- Composants courts et focalisés (single responsibility).
- Noms de fonctions orientés intention (`resetCalculator`, `parseUserNumber`).
- Vérifier les 4 scénarios fournis dans le cahier des charges avant validation.
