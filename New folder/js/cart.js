function addToCart(productId){
  const user=requireLogin("user"); if(!user) return;
  const product=getProducts().find(p=>p.id===productId);
  if(!product || product.stock<=0) return alert("Product is out of stock.");
  const cart=getCart(user.id);
  const item=cart.find(i=>i.productId===productId);
  if(item){
    if(item.quantity>=product.stock) return alert("Maximum available stock reached.");
    item.quantity++;
  }else cart.push({productId,quantity:1});
  saveCart(user.id,cart);
  updateCartCount();
  alert("Product added to cart.");
}
function updateCartCount(){
  const user=getCurrentUser();
  const el=document.getElementById("cartCount");
  if(el && user) el.textContent=getCart(user.id).reduce((s,i)=>s+i.quantity,0);
}
function cartTotal(userId){
  return getCart(userId).reduce((sum,item)=>{
    const p=getProducts().find(x=>x.id===item.productId);
    return sum+(p?p.price*item.quantity:0);
  },0);
}
function changeQty(productId,delta){
  const user=requireLogin("user"); if(!user) return;
  const cart=getCart(user.id);
  const item=cart.find(i=>i.productId===productId);
  const product=getProducts().find(p=>p.id===productId);
  if(!item || !product) return;
  item.quantity += delta;
  if(item.quantity<=0) cart.splice(cart.indexOf(item),1);
  else if(item.quantity>product.stock) item.quantity=product.stock;
  saveCart(user.id,cart);
  renderCart();
  updateCartCount();
}
function removeFromCart(productId){
  const user=requireLogin("user"); if(!user) return;
  saveCart(user.id,getCart(user.id).filter(i=>i.productId!==productId));
  renderCart(); updateCartCount();
}
function renderCart(){
  const box=document.getElementById("cartContent");
  if(!box) return;
  const user=requireLogin("user"); if(!user) return;
  const cart=getCart(user.id);
  if(!cart.length){ box.innerHTML=`<div class="panel empty"><h2>Your cart is empty 🛒</h2><p>Add some products to continue.</p><br><a class="btn btn-primary" href="dashboard.html">Browse Products</a></div>`; return; }
  const items=cart.map(i=>({i,p:getProducts().find(p=>p.id===i.productId)})).filter(x=>x.p);
  const total=cartTotal(user.id);
  box.innerHTML=`<div class="cart-layout">
    <section class="panel"><h2>Cart Items (${cart.length})</h2>
      ${items.map(({i,p})=>`<div class="cart-item">
        <div class="cart-thumb">${p.image?`<img src="${p.image}" alt="${p.name}">`:p.emoji||"🛍️"}</div>
        <div><strong>${p.name}</strong><p class="muted">${formatCurrency(p.price)} each</p></div>
        <div class="qty-controls"><button onclick="changeQty(${p.id},-1)">−</button><strong>${i.quantity}</strong><button onclick="changeQty(${p.id},1)">+</button></div>
        <div><strong>${formatCurrency(p.price*i.quantity)}</strong><br><button class="danger-link" onclick="removeFromCart(${p.id})">Remove</button></div>
      </div>`).join("")}
    </section>
    <aside class="panel"><h2>Summary</h2><div class="summary-line"><span>Subtotal</span><strong>${formatCurrency(total)}</strong></div><div class="summary-line"><span>Delivery</span><strong>FREE</strong></div><div class="summary-line summary-total"><span>Total</span><strong>${formatCurrency(total)}</strong></div><a class="btn btn-primary full" href="checkout.html">Proceed to Checkout</a></aside>
  </div>`;
}
document.addEventListener("DOMContentLoaded",()=>{ if(document.getElementById("cartContent")) renderCart(); updateCartCount(); });
