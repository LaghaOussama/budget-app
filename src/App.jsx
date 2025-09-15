import { useState } from "react";
import "./styles.css";
import TransactionForm from "./components/TransactionForm";
import FixedChargesForm from "./components/FixedChargesForm";
import Dashboard from "./components/Dashboard";
import { loadData } from "./utils/storage";

function App() {
  const [transactions, setTransactions] = useState(loadData("transactions"));
  const [fixedCharges, setFixedCharges] = useState(loadData("fixedCharges"));

  return (
    <div className="container">
      <h1>💰 Budget App PRO</h1>
      <div className="card">
        <TransactionForm transactions={transactions} setTransactions={setTransactions} />
      </div>
      <div className="card">
        <FixedChargesForm fixedCharges={fixedCharges} setFixedCharges={setFixedCharges} />
      </div>
      <div className="card">
        <Dashboard transactions={transactions} fixedCharges={fixedCharges} />
      </div>
    </div>
  );
}

export default App;
