function productImage(product){
  return product.image ? `<img src="${product.image}" alt="${product.name}" onerror="this.style.display='none';this.parentElement.innerHTML='${product.emoji||"🛍️"}'">` : (product.emoji||"🛍️");
}
function renderProducts(){
  const grid=document.getElementById("productGrid");
  if(!grid) return;
  const search=(document.getElementById("searchInput")?.value||"").toLowerCase();
  const category=document.getElementById("categoryFilter")?.value||"All";
  const products=getProducts().filter(p=>
    (category==="All" || p.category===category) &&
    (p.name.toLowerCase().includes(search) || p.description.toLowerCase().includes(search))
  );
  grid.innerHTML=products.length ? products.map(p=>`
    <article class="product-card">
      <div class="product-image">${productImage(p)}</div>
      <div class="product-info">
        <span class="category">${p.category}</span>
        <h3>${p.name}</h3>
        <p class="muted">${p.description}</p>
        <div class="price">${formatCurrency(p.price)}</div>
        <div class="stock">${p.stock>0 ? `${p.stock} in stock` : "Out of stock"}</div>
        <button class="btn btn-primary" ${p.stock<1?"disabled":""} onclick="addToCart(${p.id})">🛒 Add to Cart</button>
      </div>
    </article>`).join("") : `<div class="empty panel" style="grid-column:1/-1">No products found.</div>`;
}
document.addEventListener("DOMContentLoaded",()=>{
  if(!document.getElementById("productGrid")) return;
  const user=requireLogin("user"); if(!user) return;
  document.getElementById("userName").textContent=user.name;
  document.getElementById("searchInput").addEventListener("input",renderProducts);
  document.getElementById("categoryFilter").addEventListener("change",renderProducts);
  renderProducts();
  updateCartCount();
});
