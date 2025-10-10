// Simple admin credentials
const ADMIN_USER = "admin";
const ADMIN_PASS = "12345";

function login() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;
  const msg = document.getElementById("login-msg");

  if (user === ADMIN_USER && pass === ADMIN_PASS) {
    localStorage.setItem("adminLoggedIn", "true");
    document.getElementById("login-box").classList.add("hidden");
    document.getElementById("dashboard").classList.remove("hidden");
    msg.textContent = "";
    loadData();
  } else {
    msg.textContent = "Invalid credentials!";
  }
}

function logout() {
  localStorage.removeItem("adminLoggedIn");
  document.getElementById("login-box").classList.remove("hidden");
  document.getElementById("dashboard").classList.add("hidden");
}

function addLink() {
  const section = document.getElementById("section-select").value;
  const text = document.getElementById("new-link-text").value;
  const url = document.getElementById("new-link-url").value;

  if (text && url) {
    const data = JSON.parse(localStorage.getItem("links")) || {};
    if (!data[section]) data[section] = [];
    data[section].push({ text, url });
    localStorage.setItem("links", JSON.stringify(data));
    alert("Link added!");
    loadData();
  }
}

function loadData() {
  const data = JSON.parse(localStorage.getItem("links")) || {};
  document.getElementById("data-output").textContent = JSON.stringify(data, null, 2);
}

window.onload = function() {
  const loggedIn = localStorage.getItem("adminLoggedIn");
  if (loggedIn && document.getElementById("dashboard")) {
    document.getElementById("login-box").classList.add("hidden");
    document.getElementById("dashboard").classList.remove("hidden");
    loadData();
  }
};
// Custom admin credentials
const ADMIN_USER = "premadmin";
const ADMIN_PASS = "Prem@123";

function login() {
  const user = document.getElementById("username").value.trim();
  const pass = document.getElementById("password").value.trim();
  const msg = document.getElementById("login-msg");

  if (user === ADMIN_USER && pass === ADMIN_PASS) {
    localStorage.setItem("adminLoggedIn", "true");
    document.getElementById("login-box").classList.add("hidden");
    document.getElementById("dashboard").classList.remove("hidden");
    msg.textContent = "";
    loadData();
  } else {
    msg.textContent = "❌ Invalid username or password!";
    msg.style.color = "red";
  }
}

function logout() {
  localStorage.removeItem("adminLoggedIn");
  document.getElementById("login-box").classList.remove("hidden");
  document.getElementById("dashboard").classList.add("hidden");
}

function addLink() {
  const section = document.getElementById("section-select").value;
  const text = document.getElementById("new-link-text").value.trim();
  const url = document.getElementById("new-link-url").value.trim();

  if (text && url) {
    const data = JSON.parse(localStorage.getItem("links")) || {};
    if (!data[section]) data[section] = [];
    data[section].push({ text, url });
    localStorage.setItem("links", JSON.stringify(data));
    alert("✅ Link added successfully!");
    loadData();
  } else {
    alert("⚠️ Please fill in both the link title and URL!");
  }
}

function loadData() {
  const data = JSON.parse(localStorage.getItem("links")) || {};
  const output = document.getElementById("data-output");
  output.textContent = JSON.stringify(data, null, 2);
}

window.onload = function() {
  const loggedIn = localStorage.getItem("adminLoggedIn");
  if (loggedIn && document.getElementById("dashboard")) {
    document.getElementById("login-box").classList.add("hidden");
    document.getElementById("dashboard").classList.remove("hidden");
    loadData();
  }
};
// === Admin credentials ===
const ADMIN_USER = "premadmin";
const ADMIN_PASS = "Prem@123";

// === LOGIN FUNCTION ===
function login() {
  const user = document.getElementById("username").value.trim();
  const pass = document.getElementById("password").value.trim();
  const msg = document.getElementById("login-msg");

  if (user === ADMIN_USER && pass === ADMIN_PASS) {
    localStorage.setItem("adminLoggedIn", "true");
    document.getElementById("login-box").classList.add("hidden");
    document.getElementById("dashboard").classList.remove("hidden");
    msg.textContent = "";
    loadAdminData();
  } else {
    msg.textContent = "❌ Invalid username or password!";
    msg.style.color = "red";
  }
}

// === LOGOUT FUNCTION ===
function logout() {
  localStorage.removeItem("adminLoggedIn");
  document.getElementById("login-box").classList.remove("hidden");
  document.getElementById("dashboard").classList.add("hidden");
}

// === DATA HANDLING ===
function getData() {
  return JSON.parse(localStorage.getItem("links")) || {
    "results-list": [],
    "admit-list": [],
    "form-list": []
  };
}

function saveData(data) {
  localStorage.setItem("links", JSON.stringify(data));
}

// === ADD NEW LINK ===
function addLink() {
  const section = document.getElementById("section-select").value;
  const text = document.getElementById("new-link-text").value.trim();
  const url = document.getElementById("new-link-url").value.trim();

  if (!text || !url) {
    alert("⚠️ Please fill in both the link title and URL!");
    return;
  }

  const data = getData();
  data[section].push({ text, url });
  saveData(data);

  document.getElementById("new-link-text").value = "";
  document.getElementById("new-link-url").value = "";
  loadAdminData();
  alert("✅ Link added successfully!");
}

// === DELETE LINK ===
function deleteLink(section, index) {
  const data = getData();
  if (confirm("Are you sure you want to delete this link?")) {
    data[section].splice(index, 1);
    saveData(data);
    loadAdminData();
  }
}

// === LOAD ADMIN DASHBOARD DATA ===
function loadAdminData() {
  const data = getData();
  const output = document.getElementById("data-output");
  output.innerHTML = "";

  Object.keys(data).forEach(section => {
    const sectionName =
      section === "results-list" ? "Results" :
      section === "admit-list" ? "Admit Cards" : "Online Forms";

    const div = document.createElement("div");
    div.innerHTML = `<h4>${sectionName}</h4>`;
    const ul = document.createElement("ul");

    data[section].forEach((item, i) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <a href="${item.url}" target="_blank">${item.text}</a>
        <button class="del-btn" onclick="deleteLink('${section}', ${i})">❌ Delete</button>
      `;
      ul.appendChild(li);
    });
    div.appendChild(ul);
    output.appendChild(div);
  });
}

// === DISPLAY DATA ON HOME PAGE ===
function loadPublicData() {
  const data = getData();
  for (const section in data) {
    const list = document.getElementById(section);
    if (list) {
      list.innerHTML = "";
      data[section].forEach(item => {
        const li = document.createElement("li");
        li.innerHTML = `<a href="${item.url}" target="_blank">${item.text}</a>`;
        list.appendChild(li);
      });
    }
  }
}

// === INITIAL LOAD ===
window.onload = function () {
  const isDashboard = document.getElementById("dashboard");
  const isHome = document.getElementById("results-list");

  if (isDashboard) {
    const loggedIn = localStorage.getItem("adminLoggedIn");
    if (loggedIn) {
      document.getElementById("login-box").classList.add("hidden");
      document.getElementById("dashboard").classList.remove("hidden");
      loadAdminData();
    }
  }

  if (isHome) {
    loadPublicData();
  }
};
