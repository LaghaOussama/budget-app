import { useState } from "react";

export default function FixedChargesForm({ setFixedCharges }) {
  const [form, setForm] = useState({ name: "", amount: 0 });

  const handleSubmit = (e) => {
    e.preventDefault();
    setFixedCharges(prev => [...prev, { ...form, amount: parseFloat(form.amount) }]);
    setForm({ name: "", amount: 0 });
  };

  return (
    <div>
      <h2>Ajouter une charge fixe</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Nom" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
        <input type="number" placeholder="Montant" value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })} required />
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
}
