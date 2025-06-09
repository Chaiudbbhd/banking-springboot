const API_AUTH = "http://localhost:8080/api/auth";
const API_ACCOUNT = "http://localhost:8080/api/account";

// Authentication APIs

export async function signup({username, email, password}) {
      console.log({
    username,
    email,
    password,
    roles: ["ROLE_USER"]
  });  // <-- Add this here

  const res = await fetch(`${API_AUTH}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ 
      username, 
      email, 
      password, 
      roles: ["ROLE_USER"]  // ✅ FIXED: send string instead of array
    }),
  });
  if (!res.ok) {
    const error = await res.text();
    throw new Error(error);
  }
  return res.json();
}



export async function login(username, password) {
  const res = await fetch(`${API_AUTH}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) {
    const error = await res.text();
    throw new Error(error);
  }
  const data = await res.json();
  localStorage.setItem("token", data.token);
  return data;
}

export function logout() {
  localStorage.removeItem("token");
}

export function getToken() {
  return localStorage.getItem("token");
}

// Account APIs

export async function getBalance(accountId) {
  const token = getToken();
  const res = await fetch(`${API_ACCOUNT}/${accountId}/balance`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function deposit(accountId, amount) {
  const token = getToken();
  const res = await fetch(`${API_ACCOUNT}/${accountId}/deposit?amount=${amount}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(await res.text());
  return res.text();
}

export async function withdraw(accountId, amount) {
  const token = getToken();
  const res = await fetch(`${API_ACCOUNT}/${accountId}/withdraw?amount=${amount}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(await res.text());
  return res.text();
}

export async function transfer(fromAccountId, toAccountId, amount) {
  const token = getToken();
  const res = await fetch(
    `${API_ACCOUNT}/transfer?fromAccountId=${fromAccountId}&toAccountId=${toAccountId}&amount=${amount}`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  if (!res.ok) throw new Error(await res.text());
  return res.text();
}

export async function getTransactions(accountId) {
  const token = getToken();
  const res = await fetch(`${API_ACCOUNT}/${accountId}/transactions`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
