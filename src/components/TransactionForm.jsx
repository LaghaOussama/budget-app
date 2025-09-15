import { useState } from "react";
import { saveData } from "../utils/storage";

export default function TransactionForm({ transactions, setTransactions }) {
  const [form, setForm] = useState({ date: "", amount: 0, category: "", type: "Dépense", description: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTransaction = { ...form, amount: parseFloat(form.amount) };
    const updated = [...transactions, newTransaction];
    setTransactions(updated);
    saveData("transactions", updated);
    setForm({ date: "", amount: 0, category: "", type: "Dépense", description: "" });
  };

  return (
    <div>
      <h2>Ajouter une transaction</h2>
      <form onSubmit={handleSubmit}>
        <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} required />
        <input type="number" placeholder="Montant" value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })} required />
        <input type="text" placeholder="Catégorie" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} required />
        <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
          <option value="Dépense">Dépense</option>
          <option value="Revenu">Revenu</option>
        </select>
        <input type="text" placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
}
