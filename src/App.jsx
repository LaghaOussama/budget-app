import { useState } from "react";
import "./styles.css";
import Dashboard from "./components/Dashboard";
import TransactionForm from "./components/TransactionForm";
import FixedChargesForm from "./components/FixedChargesForm";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [fixedCharges, setFixedCharges] = useState([]);

  return (
    <div className="container">
      <h1>💰 Budget App</h1>
      <div className="card">
        <TransactionForm setTransactions={setTransactions} />
      </div>
      <div className="card">
        <FixedChargesForm setFixedCharges={setFixedCharges} />
      </div>
      <div className="card">
        <Dashboard transactions={transactions} fixedCharges={fixedCharges} />
      </div>
    </div>
  );
}

export default App;
