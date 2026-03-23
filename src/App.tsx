import { CalculatorForm } from './components/CalculatorForm';

export default function App() {
  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10">
      <div className="mx-auto w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="mb-2 text-2xl font-bold text-slate-900">Calculatrice simple</h1>
        <p className="mb-6 text-sm text-slate-600">Saisissez deux nombres, choisissez une opération et obtenez un résultat immédiat.</p>
        <CalculatorForm />
      </div>
    </main>
  );
}


