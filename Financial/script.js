document.addEventListener("DOMContentLoaded", loadData);

function addIncome() {
    const incomeTable = document.getElementById("income-table").getElementsByTagName("tbody")[0];
    const newRow = incomeTable.insertRow();
    newRow.innerHTML = `
        <td><input type="text" placeholder="Income Source"></td>
        <td><input type="number" placeholder="Amount" min="0"></td>
        <td><input type="date"></td>
    `;
    saveData();
    showAlert('Income source added successfully!');
}

function addExpense() {
    const expenseTable = document.getElementById("expenses-table").getElementsByTagName("tbody")[0];
    const newRow = expenseTable.insertRow();
    newRow.innerHTML = `
        <td><input type="text" placeholder="Expense Category"></td>
        <td><input type="number" placeholder="Amount" min="0"></td>
        <td><input type="date"></td>
    `;
    saveData();
    showAlert('Expense added successfully!');
}

function addSavingsGoal() {
    const savingsTable = document.getElementById("savings-table").getElementsByTagName("tbody")[0];
    const newRow = savingsTable.insertRow();
    newRow.innerHTML = `
        <td><input type="text" placeholder="Savings Goal"></td>
        <td><input type="number" placeholder="Target Amount" min="0"></td>
        <td><input type="number" placeholder="Current Savings" min="0"></td>
        <td><input type="date"></td>
    `;
    saveData();
    showAlert('Savings goal added successfully!');
}

function calculateTotals() {
    const incomeRows = document.querySelectorAll("#income-table tbody tr");
    const expenseRows = document.querySelectorAll("#expenses-table tbody tr");
    const savingsRows = document.querySelectorAll("#savings-table tbody tr");

    let totalIncome = 0;
    let totalExpenses = 0;
    let totalSavings = 0;

    incomeRows.forEach(row => {
        const amount = parseFloat(row.cells[1].getElementsByTagName("input")[0].value) || 0;
        totalIncome += amount;
    });

    expenseRows.forEach(row => {
        const amount = parseFloat(row.cells[1].getElementsByTagName("input")[0].value) || 0;
        totalExpenses += amount;
    });

    savingsRows.forEach(row => {
        const amount = parseFloat(row.cells[2].getElementsByTagName("input")[0].value) || 0;
        totalSavings += amount;
    });

    document.getElementById("total-income").innerText = totalIncome.toFixed(2);
    document.getElementById("total-expenses").innerText = totalExpenses.toFixed(2);
    document.getElementById("total-savings").innerText = totalSavings.toFixed(2);
    document.getElementById("net-balance").innerText = (totalIncome - totalExpenses).toFixed(2);
}

function saveData() {
    const incomeRows = document.querySelectorAll("#income-table tbody tr");
    const expenseRows = document.querySelectorAll("#expenses-table tbody tr");
    const savingsRows = document.querySelectorAll("#savings-table tbody tr");

    const incomeData = [];
    const expenseData = [];
    const savingsData = [];

    incomeRows.forEach(row => {
        incomeData.push({
            source: row.cells[0].getElementsByTagName("input")[0].value,
            amount: row.cells[1].getElementsByTagName("input")[0].value,
            date: row.cells[2].getElementsByTagName("input")[0].value,
        });
    });

    expenseRows.forEach(row => {
        expenseData.push({
            category: row.cells[0].getElementsByTagName("input")[0].value,
            amount: row.cells[1].getElementsByTagName("input")[0].value,
            date: row.cells[2].getElementsByTagName("input")[0].value,
        });
    });

    savingsRows.forEach(row => {
        savingsData.push({
            goal: row.cells[0].getElementsByTagName("input")[0].value,
            target: row.cells[1].getElementsByTagName("input")[0].value,
            current: row.cells[2].getElementsByTagName("input")[0].value,
            date: row.cells[3].getElementsByTagName("input")[0].value,
        });
    });

    localStorage.setItem('incomeData', JSON.stringify(incomeData));
    localStorage.setItem('expenseData', JSON.stringify(expenseData));
    localStorage.setItem('savingsData', JSON.stringify(savingsData));
}

function loadData() {
    const incomeData = JSON.parse(localStorage.getItem('incomeData')) || [];
    const expenseData = JSON.parse(localStorage.getItem('expenseData')) || [];
    const savingsData = JSON.parse(localStorage.getItem('savingsData')) || [];

    incomeData.forEach(data => {
        const row = document.querySelector("#income-table tbody");
        const newRow = row.insertRow();
        newRow.innerHTML = `
            <td><input type="text" value="${data.source}"></td>
            <td><input type="number" value="${data.amount}"></td>
            <td><input type="date" value="${data.date}"></td>
        `;
    });

    expenseData.forEach(data => {
        const row = document.querySelector("#expenses-table tbody");
        const newRow = row.insertRow();
        newRow.innerHTML = `
            <td><input type="text" value="${data.category}"></td>
            <td><input type="number" value="${data.amount}"></td>
            <td><input type="date" value="${data.date}"></td>
        `;
    });

    savingsData.forEach(data => {
        const row = document.querySelector("#savings-table tbody");
        const newRow = row.insertRow();
        newRow.innerHTML = `
            <td><input type="text" value="${data.goal}"></td>
            <td><input type="number" value="${data.target}"></td>
            <td><input type="number" value="${data.current}"></td>
            <td><input type="date" value="${data.date}"></td>
        `;
    });
}

function filterExpenses() {
    const filter = document.getElementById("search-expenses").value.toLowerCase();
    const rows = document.querySelectorAll("#expenses-table tbody tr");
    
    rows.forEach(row => {
        const category = row.cells[0].getElementsByTagName("input")[0].value.toLowerCase();
        row.style.display = category.includes(filter) ? "" : "none";
    });
}

function showAlert(message) {
    alert(message);
}
