import { PieChart, Pie, Cell } from "recharts";

export default function Dashboard({ transactions, fixedCharges }) {
  const COLORS = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"];
  const now = new Date();
  const currentMonth = now.toISOString().slice(0, 7);

  const monthlyTransactions = transactions.filter(t => t.date.slice(0,7) === currentMonth);
  const monthlyExpenses = monthlyTransactions.filter(t => t.type === "Dépense").reduce((a,b) => a+b.amount,0);
  const monthlyIncome = monthlyTransactions.filter(t => t.type === "Revenu").reduce((a,b) => a+b.amount,0);
  const activeCharges = fixedCharges.filter(c => c.startMonth <= currentMonth).reduce((a,b) => a+b.amount,0);

  const totalExpenses = monthlyExpenses + activeCharges;
  const balance = monthlyIncome - totalExpenses;

  const pieData = [
    { name: "Dépenses variables", value: monthlyExpenses },
    { name: "Charges fixes", value: activeCharges },
    { name: "Revenus", value: monthlyIncome }
  ];

  return (
    <div>
      <h2>Tableau de bord - {currentMonth}</h2>
      <p>Revenus : {monthlyIncome} CHF</p>
      <p>Dépenses : {totalExpenses} CHF</p>
      <p><strong>Solde : {balance} CHF</strong></p>

      <PieChart width={300} height={300}>
        <Pie data={pieData} cx="50%" cy="50%" label outerRadius={100} dataKey="value">
          {pieData.map((entry,index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)}
        </Pie>
      </PieChart>
    </div>
  );
}
