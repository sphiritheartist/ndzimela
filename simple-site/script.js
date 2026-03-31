// Ndzimela Site Logic - Client-side
// Data Persistence with localStorage

let users = JSON.parse(localStorage.getItem('ndzimelaUsers')) || [];
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let students = JSON.parse(localStorage.getItem('students')) || [];
let companies = JSON.parse(localStorage.getItem('companies')) || [];

// Auth Functions
function register(name, email, password, type = 'shopper') {
  if (users.find(u => u.email === email)) {
    alert('User exists');
    return false;
  }
  const user
