import { CSVLink } from "react-csv";

export default function ExportCSV({ transactions }) {
  const headers = [
    { label: "Date", key: "date" },
    { label: "Montant", key: "amount" },
    { label: "Catégorie", key: "category" },
    { label: "Type", key: "type" },
    { label: "Description", key: "description" },
  ];

  return (
    <div style={{ margin: "10px 0" }}>
      <CSVLink
        data={transactions}
        headers={headers}
        filename={"transactions.csv"}
      >
        <button>📤 Exporter CSV</button>
      </CSVLink>
    </div>
  );
}
