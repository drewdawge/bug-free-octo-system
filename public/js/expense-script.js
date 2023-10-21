const updateExpensesTable = async () => {
  try {
    const response = await fetch('/api/users/expenses');
    if (response.ok) {
      const data = await response.json();
      console.log(data);

      const templateSource = document.getElementById('expenses-template').innerHTML;
      const template = Handlebars.compile(templateSource);
      $('#expenses-table tbody').html(template(data));
      
    } else {
      console.error('Failed to fetch expenses data.');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

const addExpenseFormHandler = async (event) => {
  event.preventDefault();

  const date = document.querySelector('#date').value.trim();
  const name = document.querySelector('#name').value.trim();
  const type = document.querySelector('#type').value.trim();
  const amount = document.querySelector('#amount').value.trim();

  const expenseData = {
    date,
    name,
    type,
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
      document.querySelector('#name').value = '';
      document.querySelector('#type').value = '';
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
  
document.querySelector('.add-expense').addEventListener('submit', addExpenseFormHandler);