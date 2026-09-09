import React, { useState, useEffect } from 'react';

interface MonthlyBudgetProps {
  transactions: any[];
}

const MonthlyBudget: React.FC<MonthlyBudgetProps> = ({ transactions }) => {
  const [budget, setBudget] = useState<number>(() => {
    const saved = localStorage.getItem('monthlyBudget');
    return saved ? Number(saved) : 0;
  });
  const [isEditing, setIsEditing] = useState(budget === 0);
  const [inputValue, setInputValue] = useState(budget.toString());

  useEffect(() => {
    localStorage.setItem('monthlyBudget', budget.toString());
  }, [budget]);

  const now = new Date();
  const spentThisMonth = transactions
    .filter(t => {
      const d = new Date(t.date);
      return (
        d.getMonth() === now.getMonth() &&
        d.getFullYear() === now.getFullYear() &&
        t.amount > 0 // Plaid: positive amount = money out
      );
    })
    .reduce((sum, t) => sum + t.amount, 0);

  const percentUsed = budget > 0 ? Math.min((spentThisMonth / budget) * 100, 100) : 0;
  const remaining = budget - spentThisMonth;
  const isOverBudget = remaining < 0;

  const handleSave = () => {
    const val = parseFloat(inputValue);
    if (!isNaN(val) && val > 0) {
      setBudget(val);
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <div className="box" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
        <h3>Set Your Monthly Budget</h3>
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
          <input
            type="number"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            placeholder="e.g. 2000"
            style={{ padding: '0.5rem', flex: 1 }}
          />
          <button onClick={handleSave}>Save</button>
        </div>
      </div>
    );
  }

  return (
    <div className="box" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3>Monthly Budget</h3>
        <button
          onClick={() => {
            setInputValue(budget.toString());
            setIsEditing(true);
          }}
          style={{ fontSize: '0.8rem' }}
        >
          Edit
        </button>
      </div>
      <div style={{ margin: '0.75rem 0' }}>
        <div style={{ background: '#e5e5e5', borderRadius: '8px', height: '12px', overflow: 'hidden' }}>
          <div
            style={{
              width: `${percentUsed}%`,
              height: '100%',
              background: isOverBudget ? '#e63946' : '#2a9d8f',
              transition: 'width 0.3s ease',
            }}
          />
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span>${spentThisMonth.toFixed(2)} spent</span>
        <span>${budget.toFixed(2)} budget</span>
      </div>
      <div
        style={{
          marginTop: '0.5rem',
          fontWeight: 'bold',
          color: isOverBudget ? '#e63946' : '#2a9d8f',
        }}
      >
        {isOverBudget
          ? `$${Math.abs(remaining).toFixed(2)} over budget`
          : `$${remaining.toFixed(2)} remaining`}
      </div>
    </div>
  );
};

export default MonthlyBudget;