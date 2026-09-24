const STORAGE_KEYS = {
  users: "eshop_users",
  products: "eshop_products",
  orders: "eshop_orders",
  carts: "eshop_carts",
  currentUser: "eshop_current_user"
};

const defaultProducts = [
  {id:101,name:"Wireless Headphones",price:1499,category:"Electronics",stock:15,emoji:"🎧",image:"",description:"Comfortable wireless headphones with clear sound."},
  {id:102,name:"Smart Watch",price:2299,category:"Electronics",stock:10,emoji:"⌚",image:"",description:"Fitness tracking and everyday notifications."},
  {id:103,name:"Classic T-Shirt",price:699,category:"Fashion",stock:30,emoji:"👕",image:"",description:"Comfortable cotton T-shirt for daily wear."},
  {id:104,name:"Running Shoes",price:1899,category:"Fashion",stock:18,emoji:"👟",image:"",description:"Lightweight shoes designed for daily running."},
  {id:105,name:"JavaScript Basics",price:499,category:"Books",stock:25,emoji:"📘",image:"",description:"A beginner-friendly guide to JavaScript."},
  {id:106,name:"Study Lamp",price:899,category:"Home",stock:20,emoji:"💡",image:"",description:"LED study lamp with adjustable brightness."},
  {id:107,name:"Backpack",price:1199,category:"Fashion",stock:12,emoji:"🎒",image:"",description:"Durable backpack for college and travel."},
  {id:108,name:"Coffee Mug",price:299,category:"Home",stock:40,emoji:"☕",image:"",description:"Ceramic mug for tea and coffee."}
];

function getData(key, fallback=[]) {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
  catch(e) { return fallback; }
}
function setData(key, value) { localStorage.setItem(key, JSON.stringify(value)); }
function getUsers(){ return getData(STORAGE_KEYS.users, []); }
function getProducts(){ return getData(STORAGE_KEYS.products, defaultProducts); }
function getOrders(){ return getData(STORAGE_KEYS.orders, []); }
function getCurrentUser(){ return getData(STORAGE_KEYS.currentUser, null); }
function setCurrentUser(user){ setData(STORAGE_KEYS.currentUser, user); }
function getCart(userId){
  const carts = getData(STORAGE_KEYS.carts, {});
  return carts[userId] || [];
}
function saveCart(userId, cart){
  const carts = getData(STORAGE_KEYS.carts, {});
  carts[userId] = cart;
  setData(STORAGE_KEYS.carts, carts);
}
function formatCurrency(value){ return "₹" + Number(value).toLocaleString("en-IN"); }

function seedDatabase(){
  if(!localStorage.getItem(STORAGE_KEYS.users)){
    setData(STORAGE_KEYS.users, [{
      id:1,name:"Administrator",email:"admin@eshop.com",password:"admin123",role:"admin"
    }]);
  }
  if(!localStorage.getItem(STORAGE_KEYS.products)) setData(STORAGE_KEYS.products, defaultProducts);
  if(!localStorage.getItem(STORAGE_KEYS.orders)) setData(STORAGE_KEYS.orders, []);
  if(!localStorage.getItem(STORAGE_KEYS.carts)) setData(STORAGE_KEYS.carts, {});
}
seedDatabase();

function requireLogin(role=null){
  const user = getCurrentUser();
  if(!user){
    window.location.href = "../login.html";
    return null;
  }
  if(role && user.role !== role){
    window.location.href = user.role === "admin" ? "../admin/dashboard.html" : "../user/dashboard.html";
    return null;
  }
  return user;
}

function logout(){
  localStorage.removeItem(STORAGE_KEYS.currentUser);
  window.location.href = "../login.html";
}

document.addEventListener("DOMContentLoaded", ()=>{
  const logoutBtn = document.getElementById("logoutBtn");
  if(logoutBtn) logoutBtn.addEventListener("click", logout);
});
