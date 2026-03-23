# Plan d’implémentation — Application de calculatrice simple

## 1. Stack technique

- **Template choisi : `vite-react-tailwind-v4`**
- **Justification :**
  - Le besoin est une application **100% frontend** (pas d’API, pas de persistance, pas de traitement serveur).
  - Fonctionnalités simples de saisie/calcul/affichage, idéales pour une SPA légère.
  - Tailwind v4 permet un stylage rapide et propre.

### Dépendances supplémentaires à installer
Aucune dépendance additionnelle n’est strictement nécessaire pour ce périmètre.

Optionnel (si souhaité pour UX) :
- `lucide-react` (icônes pour boutons Reset/Calculate)

---

## 2. Arborescence des fichiers

> Structure alignée avec le template `vite-react-tailwind-v4`.

```text
/workspace/
├── src/
│   ├── components/
│   │   ├── CalculatorForm.tsx          # Formulaire principal (2 inputs, choix opération, actions)
│   │   ├── OperationSelector.tsx       # Sélecteur d’opérations (+, -, ×, ÷)
│   │   ├── ResultDisplay.tsx           # Affichage du résultat ou du message d’erreur
│   │   └── CalculatorActions.tsx       # Boutons Calculer / Effacer / Nouveau calcul
│   ├── hooks/
│   │   └── useCalculator.ts            # Logique métier locale (validation + calcul)
│   ├── types/
│   │   └── index.ts                    # Types partagés (Operation, CalculatorState...)
│   ├── utils/
│   │   ├── calculator.ts               # Fonctions pures de calcul
│   │   └── numberParser.ts             # Parsing nombres (virgule/point)
│   ├── App.tsx                         # Composition de la page unique
│   └── main.tsx                        # Entrée React
├── package.json
└── index.html
```

---

## 3. Modèles de données (TypeScript)

```ts
type Operation = 'add' | 'subtract' | 'multiply' | 'divide';

interface CalculatorInput {
  firstValue: string;
  secondValue: string;
  operation: Operation;
}

interface CalculationResult {
  value: number | null;
  error: string | null;
}

interface CalculatorState {
  input: CalculatorInput;
  result: CalculationResult;
}
```

- Les champs de saisie restent en `string` pour gérer proprement la saisie utilisateur.
- Conversion/validation centralisées avant calcul.

---

## 4. Architecture des composants

- **App**
  - Parent racine, contient la structure de page (container, titre, carte principale).
  - Monte `CalculatorForm`.

- **CalculatorForm**
  - Utilise `useCalculator`.
  - Rend :
    - input nombre 1
    - `OperationSelector`
    - input nombre 2
    - `CalculatorActions`
    - `ResultDisplay`

- **OperationSelector**
  - Props : `value`, `onChange`.
  - Affiche les 4 opérations disponibles.

- **CalculatorActions**
  - Props : `onCalculate`, `onClear`, `onReset`, `isCalculateDisabled`.

- **ResultDisplay**
  - Props : `resultValue`, `errorMessage`.
  - Affiche résultat si succès, sinon message explicite (division par zéro, saisie invalide).

- **useCalculator (hook)**
  - Gère l’état local du formulaire et du résultat.
  - Expose handlers : update champ, calculer, effacer, réinitialiser.

---

## 5. Gestion d’état

- `useState` dans `useCalculator` suffit (pas de Context, pas de state manager global).
- État géré :
  - valeurs des deux entrées,
  - opération choisie,
  - résultat,
  - erreur éventuelle.
- Pas de stockage local (`localStorage`) requis pour ce périmètre.

---

## 6. Routing

- **Aucun routing nécessaire** (application mono-écran).
- `App.tsx` affiche directement la calculatrice.

---

## 7. API Design

- **Aucune API** (pas de backend).

---

## 8. Parties complexes et solutions

1. **Gestion des nombres décimaux avec virgule (ex: 1,5)**
   - Solution : utilitaire `numberParser.ts` qui normalise `,` en `.` avant `Number()`.
   - Retour d’erreur clair si la valeur n’est pas valide.

2. **Division par zéro**
   - Solution : garde-fou dans `calculator.ts` sur l’opération `divide` avec second opérande à `0`.
   - Retour d’un message explicite : « La division par zéro est impossible ».

3. **Séparation logique/UI**
   - Solution : calculs dans `utils/calculator.ts` (fonctions pures), composant UI sans logique lourde.

---

## 9. Dépendances à installer

```bash
# Aucune dépendance obligatoire supplémentaire
# Optionnel :
npm install lucide-react
```

---

## 10. Ordre d’implémentation

1. `src/types/index.ts` — définir tous les types partagés.
2. `src/utils/numberParser.ts` — parsing robuste des entrées.
3. `src/utils/calculator.ts` — logique de calcul pure + erreurs métier.
4. `src/hooks/useCalculator.ts` — orchestration state + validation + appels utils.
5. `src/components/OperationSelector.tsx` — composant sélection opération.
6. `src/components/CalculatorActions.tsx` — boutons d’action.
7. `src/components/ResultDisplay.tsx` — rendu résultat/erreur.
8. `src/components/CalculatorForm.tsx` — assemblage fonctionnel principal.
9. `src/App.tsx` — layout global et intégration formulaire.
10. Vérification fonctionnelle via les 4 scénarios de test du cahier des charges.
