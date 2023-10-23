// const updateExpensesTable = async () => {
//   try {
//     const response = await fetch('/api/users/expenses');
//     if (response.ok) {
//       const data = await response.json();
//       console.log(data);

//       const templateSource = document.getElementById('expenses-template').innerHTML;
//       const template = Handlebars.compile(templateSource);
//       $('#expenses-table tbody').html(template(data));
      
//     } else {
//       console.error('Failed to fetch expenses data.');
//     }
//   } catch (error) {
//     console.error('Error:', error);
//   }
// };

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

      // updateExpensesTable();
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
});

document.querySelector('.add-expense').addEventListener('submit', addExpenseFormHandler);
// updateExpensesTable();