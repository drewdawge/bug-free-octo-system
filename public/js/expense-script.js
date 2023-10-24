const updateExpensesTable = async () => {
  try {
    const response = await fetch('/api/users/expenses');
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      renderExpenses(data.expenses);
    } else {
      console.error('Unable to fetch expenses data.');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

const renderExpenses = (expenses) => {
  const expensesTable = document.querySelector('.expenses-container table tbody');
  expensesTable.innerHTML = '';
  const rows = expenses.map((expense) => {
  const row = document.createElement('tr');
  row.innerHTML = `
        <td>${expense.date}</td>
        <td>${expense.item}</td>
        <td>$${expense.amount}</td>
      `;
  return row;
  });
  rows.forEach((row) => {
  expensesTable.appendChild(row);
  })
};

const addExpenseFormHandler = async (event) => {
  event.preventDefault();

  const date = document.querySelector('#date').value.trim();
  const item = document.querySelector('#item').value.trim();
  const amount = document.querySelector('#amount').value.trim();

  const expenseData = {
    date,
    item,
    amount,
  };

  try {
    const response = await fetch('/api/users/addExpense', {
      method: 'POST',
      body: JSON.stringify(expenseData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      document.querySelector('#date').value = '';
      document.querySelector('#item').value = '';
      document.querySelector('#amount').value = '';

      updateExpensesTable();
    } else {
      const responseData = await response.json();
      console.error('Failed to add expense', responseData.error);
    }
  } catch (error) {
    console.error('Error', error);
  }
};

document.addEventListener('DOMContentLoaded', function () {
  const logoutButton = document.getElementById('logout-button');

  logoutButton.addEventListener('click', async function () {
    try {
      const response = await fetch('/api/users/logout', {
        method: 'POST',
      });

      if (response.ok) {
        window.location.href = '/';
        console.error('Failed to log out.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  });

 updateExpensesTable();
});

document.querySelector('.add-expense').addEventListener('submit', addExpenseFormHandler);