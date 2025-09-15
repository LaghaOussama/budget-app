export const loadData = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

export const saveData = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

// Calculer les charges fixes pour un mois donné
export const getFixedChargesForMonth = (fixedCharges, month) => {
  // month = "YYYY-MM"
  return fixedCharges
    .filter(c => c.startMonth <= month)
    .reduce((sum, c) => sum + c.amount, 0);
};
