import { useState } from "react";
import { saveData } from "../utils/storage";

export default function FixedChargesForm({ fixedCharges, setFixedCharges }) {
  const [form, setForm] = useState({ name: "", amount: 0, startMonth: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCharge = { ...form, amount: parseFloat(form.amount) };
    const updated = [...fixedCharges, newCharge];
    setFixedCharges(updated);
    saveData("fixedCharges", updated);
    setForm({ name: "", amount: 0, startMonth: "" });
  };

  return (
    <div>
      <h2>Ajouter une charge fixe</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Nom" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
        <input type="number" placeholder="Montant" value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })} required />
        <input type="month" placeholder="À partir du mois" value={form.startMonth} onChange={e => setForm({ ...form, startMonth: e.target.value })} required />
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
}
