import { PieChart, Pie, Cell } from "recharts";
import { getFixedChargesForMonth } from "../utils/storage";
import ExportCSV from "./ExportCSV";
import { useState } from "react";

export default function Dashboard({ transactions, fixedCharges }) {
  const COLORS = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"];
  const now = new Date();
  const currentMonth = now.toISOString().slice(0, 7); // YYYY-MM

  const monthlyTransactions = transactions.filter(
    (t) => t.date.slice(0, 7) === currentMonth
  );
  const monthlyExpenses = monthlyTransactions
    .filter((t) => t.type === "Dépense")
    .reduce((a, b) => a + b.amount, 0);
  const monthlyIncome = monthlyTransactions
    .filter((t) => t.type === "Revenu")
    .reduce((a, b) => a + b.amount, 0);

  const activeCharges = getFixedChargesForMonth(fixedCharges, currentMonth);

  const totalExpenses = monthlyExpenses + activeCharges;
  const balance = monthlyIncome - totalExpenses;

  const pieData = [
    { name: "Dépenses variables", value: monthlyExpenses },
    { name: "Charges fixes", value: activeCharges },
    { name: "Revenus", value: monthlyIncome },
  ];
  // Historique mensuel
  const months = [
    ...new Set(transactions.map((t) => t.date.slice(0, 7))),
  ].sort();
  return (
    <div>
      <h2>Tableau de bord - {currentMonth}</h2>
      <p>Revenus : {monthlyIncome} CHF</p>
      <p>Dépenses : {totalExpenses} CHF</p>
      <p>
        <strong>Solde : {balance} CHF</strong>
      </p>
      <PieChart width={300} height={300}>
        <Pie
          data={pieData}
          cx="50%"
          cy="50%"
          label
          outerRadius={100}
          dataKey="value"
        >
          {pieData.map((entry, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
      <ExportCSV transactions={transactions} />
      <div>
        <h3>📅 Historique mensuel</h3>
        <table
          border="1"
          style={{
            width: "100%",
            marginTop: "10px",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr>
              <th>Mois</th>
              <th>Revenus</th>
              <th>Dépenses Variables</th>
              <th>Charges Fixes</th>
              <th>Solde</th>
            </tr>
          </thead>
          <tbody>
            {months.map((month) => {
              const monthTransactions = transactions.filter(
                (t) => t.date.slice(0, 7) === month
              );
              const revenus = monthTransactions
                .filter((t) => t.type === "Revenu")
                .reduce((a, b) => a + b.amount, 0);
              const depenses = monthTransactions
                .filter((t) => t.type === "Dépense")
                .reduce((a, b) => a + b.amount, 0);
              const charges = getFixedChargesForMonth(fixedCharges, month);
              const solde = revenus - (depenses + charges);

              return (
                <tr key={month}>
                  <td>{month}</td>
                  <td>{revenus} CHF</td>
                  <td>{depenses} CHF</td>
                  <td>{charges} CHF</td>
                  <td style={{ color: solde >= 0 ? "green" : "red" }}>
                    {solde} CHF
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
