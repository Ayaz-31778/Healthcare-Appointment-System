function renderCheckout(){
  const summary=document.getElementById("checkoutSummary");
  if(!summary) return;
  const user=requireLogin("user"); if(!user) return;
  const cart=getCart(user.id);
  if(!cart.length){ summary.innerHTML=`<div class="empty">Your cart is empty. <a href="dashboard.html">Shop now</a></div>`; return; }
  let total=0;
  summary.innerHTML=cart.map(i=>{
    const p=getProducts().find(x=>x.id===i.productId);
    if(!p)return "";
    total+=p.price*i.quantity;
    return `<div class="summary-product"><span>${p.name} × ${i.quantity}</span><strong>${formatCurrency(p.price*i.quantity)}</strong></div>`;
  }).join("")+`<div class="summary-line summary-total"><span>Total</span><strong>${formatCurrency(total)}</strong></div>`;
  const current=getCurrentUser();
  document.getElementById("fullName").value=current.name;
}
function placeOrder(e){
  e.preventDefault();
  const user=requireLogin("user"); if(!user)return;
  const cart=getCart(user.id);
  if(!cart.length){document.getElementById("checkoutMessage").textContent="Cart is empty.";return;}
  const products=getProducts();
  for(const item of cart){
    const p=products.find(x=>x.id===item.productId);
    if(!p || item.quantity>p.stock){alert(`Insufficient stock for ${p?.name||"a product"}.`);return;}
  }
  const total=cartTotal(user.id);
  const order={
    id:"ORD"+Date.now(),
    userId:user.id,
    customerName:document.getElementById("fullName").value.trim(),
    phone:document.getElementById("phone").value.trim(),
    address:document.getElementById("address").value.trim(),
    payment:document.getElementById("payment").value,
    items:cart.map(i=>({productId:i.productId,quantity:i.quantity})),
    total,status:"Placed",
    date:new Date().toLocaleString("en-IN")
  };
  const orders=getOrders(); orders.unshift(order); setData(STORAGE_KEYS.orders,orders);
  cart.forEach(item=>{const p=products.find(x=>x.id===item.productId);p.stock-=item.quantity;});
  setData(STORAGE_KEYS.products,products);
  saveCart(user.id,[]);
  document.getElementById("checkoutMessage").textContent="Order placed successfully!";
  document.getElementById("checkoutMessage").className="form-message success-text";
  setTimeout(()=>window.location.href="orders.html",900);
}
function renderUserOrders(){
  const box=document.getElementById("ordersList");
  if(!box)return;
  const user=requireLogin("user"); if(!user)return;
  const orders=getOrders().filter(o=>o.userId===user.id);
  if(!orders.length){box.innerHTML=`<div class="panel empty"><h2>No orders yet.</h2><p>Your placed orders will appear here.</p></div>`;return;}
  const products=getProducts();
  box.innerHTML=orders.map(o=>{
    const names=o.items.map(i=>{const p=products.find(x=>x.id===i.productId);return p?`${p.name} × ${i.quantity}`:"Deleted product";}).join(", ");
    return `<article class="order-card"><div class="order-head"><div><h3>${o.id}</h3><p class="muted">${o.date}</p></div><span class="status status-${o.status}">${o.status}</span></div><p class="order-products">${names}</p><div class="summary-line summary-total"><span>Total</span><strong>${formatCurrency(o.total)}</strong></div></article>`;
  }).join("");
}
document.addEventListener("DOMContentLoaded",()=>{
  const checkoutForm=document.getElementById("checkoutForm");
  if(checkoutForm){requireLogin("user");renderCheckout();checkoutForm.addEventListener("submit",placeOrder);}
  renderUserOrders();
});
