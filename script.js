(function () {
  const KEY = "jejak-pengeluaran-data";

  const form = document.getElementById("expense-form");
  const nameInput = document.getElementById("expense-name");
  const amountInput = document.getElementById("expense-amount");
  const errorEl = document.getElementById("form-error");
  const tbody = document.getElementById("trail-body");
  const tableWrap = document.getElementById("table-wrap");
  const emptyEl = document.getElementById("empty-state");

  const rupiah = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });

  let expenses = [];
  try {
    expenses = JSON.parse(localStorage.getItem(KEY)) || [];
  } catch (err) {
    expenses = [];
  }

  function save() {
    localStorage.setItem(KEY, JSON.stringify(expenses));
  }

  function removeExpense(id) {
    expenses = expenses.filter((e) => e.id !== id);
    save();
    render();
  }

  function makeRow(exp) {
    const tr = document.createElement("tr");

    const nameTd = document.createElement("td");
    nameTd.className = "trail-name-cell";
    nameTd.textContent = exp.name;

    const amountTd = document.createElement("td");
    amountTd.className = "trail-amount-cell";
    amountTd.textContent = rupiah.format(exp.amount);

    const actionTd = document.createElement("td");
    actionTd.className = "trail-action-cell";
    const delBtn = document.createElement("button");
    delBtn.type = "button";
    delBtn.className = "btn-delete";
    delBtn.textContent = "✕";
    delBtn.setAttribute("aria-label", "Hapus pengeluaran " + exp.name);
    delBtn.addEventListener("click", () => removeExpense(exp.id));
    actionTd.appendChild(delBtn);

    tr.append(nameTd, amountTd, actionTd);
    return tr;
  }

  function render() {
    tbody.innerHTML = "";
    const hasExpenses = expenses.length > 0;
    tableWrap.hidden = !hasExpenses;
    emptyEl.hidden = hasExpenses;
    expenses.forEach((exp) => tbody.appendChild(makeRow(exp)));
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = nameInput.value.trim();
    const amount = parseInt(amountInput.value, 10);

    if (!name) {
      errorEl.textContent = "Isi dulu keterangan pengeluarannya, ya.";
      nameInput.focus();
      return;
    }
    if (!amount || amount <= 0) {
      errorEl.textContent = "Nominal harus lebih dari 0.";
      amountInput.focus();
      return;
    }

    errorEl.textContent = "";
    expenses.push({
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
      name,
      amount,
    });
    save();
    render();
    form.reset();
    nameInput.focus();
  });

  render();
})();
