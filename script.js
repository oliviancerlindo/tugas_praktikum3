(function () {
  const STORAGE_KEY = "jejak-pengeluaran-data";

  const form = document.getElementById("expense-form");
  const nameInput = document.getElementById("expense-name");
  const amountInput = document.getElementById("expense-amount");
  const errorEl = document.getElementById("form-error");
  const tableBodyEl = document.getElementById("trail-body");
  const tableWrapEl = document.getElementById("table-wrap");
  const emptyEl = document.getElementById("empty-state");

  const currency = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  let expenses = loadExpenses();

  function loadExpenses() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (err) {
      return [];
    }
  }

  function saveExpenses() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
    } catch (err) {
    }
  }

  function formatCurrency(amount) {
    return currency.format(amount);
  }

  function escapeHTML(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  function render() {
    tableBodyEl.innerHTML = "";

    if (expenses.length === 0) {
      tableWrapEl.hidden = true;
      emptyEl.hidden = false;
    } else {
      tableWrapEl.hidden = false;
      emptyEl.hidden = true;

      expenses.forEach(function (exp) {
        const tr = document.createElement("tr");
        tr.dataset.id = exp.id;

        const safeName = escapeHTML(exp.name);

        tr.innerHTML =
          '<td class="trail-name-cell">' + safeName + "</td>" +
          '<td class="trail-amount-cell">' + formatCurrency(exp.amount) + "</td>" +
          '<td class="trail-action-cell">' +
            '<button class="btn-delete" type="button" aria-label="Hapus pengeluaran ' + safeName + '">✕</button>' +
          "</td>";

        tr.querySelector(".btn-delete").addEventListener("click", function () {
          deleteExpense(exp.id);
        });

        tableBodyEl.appendChild(tr);
      });
    }
  }

  function addExpense(name, amount) {
    expenses.push({
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
      name: name,
      amount: amount,
    });
    saveExpenses();
    render();
  }

  function deleteExpense(id) {
    expenses = expenses.filter(function (e) { return e.id !== id; });
    saveExpenses();
    render();
  }

  function showError(message) {
    errorEl.textContent = message;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = nameInput.value.trim();
    const amount = parseInt(amountInput.value, 10);

    if (!name) {
      showError("Isi dulu keterangan pengeluarannya, ya.");
      nameInput.focus();
      return;
    }
    if (!amount || amount <= 0) {
      showError("Nominal harus lebih dari 0.");
      amountInput.focus();
      return;
    }

    showError("");
    addExpense(name, amount);
    form.reset();
    nameInput.focus();
  });

  render();
})();

(function () {
  const SVG_NS = "http://www.w3.org/2000/svg";
  const XLINK_NS = "http://www.w3.org/1999/xlink";

  function addTree(group, x, y, scale) {
    const use = document.createElementNS(SVG_NS, "use");
    use.setAttributeNS(XLINK_NS, "xlink:href", "#pine");
    use.setAttribute("href", "#pine");
    use.setAttribute("transform", "translate(" + x + "," + y + ") scale(" + scale + ")");
    group.appendChild(use);
  }

  function buildTreeline(id, count, spacing, offsetX, scale, baseY) {
    const group = document.getElementById(id);
    if (!group) return;
    for (let i = 0; i < count; i++) {
      const jitter = Math.sin(i * 1.7) * 12;
      const sizeJitter = 1 + (Math.sin(i * 2.3) * 0.12);
      const s = scale * sizeJitter;
      const x = offsetX + i * spacing - (100 * s) / 2;
      const y = baseY - 140 * s + jitter;
      addTree(group, x, y, s);
    }
  }

  buildTreeline("trees-back", 17, 100, -30, 0.55, 870);
  buildTreeline("trees-front", 13, 135, -60, 0.95, 905);

  const fireflyContainer = document.getElementById("fireflies");
  if (fireflyContainer) {
    const count = 7;
    for (let i = 0; i < count; i++) {
      const span = document.createElement("span");
      const top = 45 + Math.random() * 45;
      const left = Math.random() * 100;
      const duration = 5 + Math.random() * 4;
      const glowDuration = 2.5 + Math.random() * 2.5;
      const delay = Math.random() * 5;
      span.style.top = top + "%";
      span.style.left = left + "%";
      span.style.animationDuration = duration + "s, " + glowDuration + "s";
      span.style.animationDelay = delay + "s, " + (delay * 0.6) + "s";
      fireflyContainer.appendChild(span);
    }
  }
})();