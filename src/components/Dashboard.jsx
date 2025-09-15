import { PieChart, Pie, Cell } from "recharts";

export default function Dashboard({ transactions, fixedCharges }) {
  const COLORS = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"];

  const totalIncome = transactions.filter(t => t.type === "Revenu").reduce((a, b) => a + b.amount, 0);
  const totalExpenses =
    transactions.filter(t => t.type === "Dépense").reduce((a, b) => a + b.amount, 0) +
    fixedCharges.reduce((a, b) => a + b.amount, 0);

  const balance = totalIncome - totalExpenses;

  const pieData = [
    { name: "Dépenses variables", value: totalExpenses - fixedCharges.reduce((a, b) => a + b.amount, 0) },
    { name: "Charges fixes", value: fixedCharges.reduce((a, b) => a + b.amount, 0) },
  ];

  return (
    <div>
      <h2>Tableau de bord</h2>
      <p>Revenus : {totalIncome} CHF</p>
      <p>Dépenses : {totalExpenses} CHF</p>
      <p><strong>Solde : {balance} CHF</strong></p>

      <PieChart width={300} height={300}>
        <Pie data={pieData} cx="50%" cy="50%" label outerRadius={100} dataKey="value">
          {pieData.map((entry, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </div>
  );
}
