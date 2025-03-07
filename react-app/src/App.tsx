import ExpenseList from "./expense-tracker/components/ExpenseList";
import { useState } from "react";
import ExpenseFilter from "./expense-tracker/components/ExpenseFilter";
import ExpenseForm from "./expense-tracker/components/ExpenseForm";
import categories from "./expense-tracker/categories";

function App() { 

  const [selectedCategory, setSelectedCategory] = useState('');

  const [expenses, setExpenses] = useState([
    {id: 1, description: 'aaa', amount: 10, category: 'Groceries'},
    {id: 2, description: 'bbb', amount: 20, category: 'Entertainment'},
    {id: 3, description: 'ccc', amount: 30, category: 'Utilities'},
  ]);

  const visibleExpenses = selectedCategory ? expenses.filter(e => e.category === selectedCategory) : expenses;

  return (
    <div>
      <div className="mb-5">
        <ExpenseForm onSubmit={(expense) => setExpenses([...expenses, {...expense, id: expenses.length + 1}])} />
      </div>
      <div className="mb-5">
        <ExpenseFilter onSelectCategory={category => setSelectedCategory(category)} />
      </div>
      <ExpenseList expenses={visibleExpenses} onDelete={(id) => setExpenses(expenses.filter(e => e.id !== id))} />
    </div>
  );
}

export default App;