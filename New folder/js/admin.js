function adminGuard(){
  const user=requireLogin("admin"); return !!user;
}
function renderAdminDashboard(){
  if(!document.getElementById("productStat"))return;
  if(!adminGuard())return;
  const products=getProducts(),users=getUsers().filter(u=>u.role==="user"),orders=getOrders();
  document.getElementById("productStat").textContent=products.length;
  document.getElementById("userStat").textContent=users.length;
  document.getElementById("orderStat").textContent=orders.length;
  document.getElementById("salesStat").textContent=formatCurrency(orders.reduce((s,o)=>s+o.total,0));
  const box=document.getElementById("recentOrders");
  box.innerHTML=orders.length?`<div class="table-wrap"><table class="data-table"><thead><tr><th>Order</th><th>Customer</th><th>Total</th><th>Status</th></tr></thead><tbody>${orders.slice(0,5).map(o=>`<tr><td>${o.id}</td><td>${o.customerName}</td><td>${formatCurrency(o.total)}</td><td><span class="status status-${o.status}">${o.status}</span></td></tr>`).join("")}</tbody></table></div>`:`<div class="empty-table">No orders yet.</div>`;
}
function resetProductForm(){
  document.getElementById("productForm").reset();
  document.getElementById("productId").value="";
  document.getElementById("formTitle").textContent="Add Product";
}
function renderAdminProducts(){
  const box=document.getElementById("adminProductsTable"); if(!box)return;
  if(!adminGuard())return;
  const products=getProducts();
  box.innerHTML=`<div class="table-wrap"><table class="data-table"><thead><tr><th>Name</th><th>Category</th><th>Price</th><th>Stock</th><th>Actions</th></tr></thead><tbody>${products.map(p=>`<tr><td>${p.name}</td><td>${p.category}</td><td>${formatCurrency(p.price)}</td><td>${p.stock}</td><td><button class="btn btn-outline small" onclick="editProduct(${p.id})">Edit</button> <button class="btn btn-danger small" onclick="deleteProduct(${p.id})">Delete</button></td></tr>`).join("")}</tbody></table></div>`;
}
function editProduct(id){
  const p=getProducts().find(x=>x.id===id); if(!p)return;
  document.getElementById("productFormPanel").classList.remove("hidden");
  document.getElementById("formTitle").textContent="Edit Product";
  document.getElementById("productId").value=p.id;
  document.getElementById("productName").value=p.name;
  document.getElementById("productPrice").value=p.price;
  document.getElementById("productCategory").value=p.category;
  document.getElementById("productStock").value=p.stock;
  document.getElementById("productImage").value=p.image||"";
  document.getElementById("productDescription").value=p.description;
  window.scrollTo({top:0,behavior:"smooth"});
}
function deleteProduct(id){
  if(!confirm("Delete this product?"))return;
  setData(STORAGE_KEYS.products,getProducts().filter(p=>p.id!==id));
  renderAdminProducts();
}
function saveProduct(e){
  e.preventDefault();
  const products=getProducts();
  const id=document.getElementById("productId").value;
  const data={
    id:id?Number(id):Date.now(),
    name:document.getElementById("productName").value.trim(),
    price:Number(document.getElementById("productPrice").value),
    category:document.getElementById("productCategory").value,
    stock:Number(document.getElementById("productStock").value),
    image:document.getElementById("productImage").value.trim(),
    description:document.getElementById("productDescription").value.trim(),
    emoji:"🛍️"
  };
  const index=products.findIndex(p=>p.id===data.id);
  if(index>=0)products[index]=data; else products.push(data);
  setData(STORAGE_KEYS.products,products);
  document.getElementById("productFormPanel").classList.add("hidden");
  resetProductForm(); renderAdminProducts(); alert("Product saved successfully.");
}
function renderUsers(){
  const box=document.getElementById("usersTable");if(!box)return;
  if(!adminGuard())return;
  const users=getUsers().filter(u=>u.role==="user");
  box.innerHTML=users.length?`<div class="table-wrap"><table class="data-table"><thead><tr><th>ID</th><th>Name</th><th>Email</th><th>Role</th></tr></thead><tbody>${users.map(u=>`<tr><td>${u.id}</td><td>${u.name}</td><td>${u.email}</td><td>User</td></tr>`).join("")}</tbody></table></div>`:`<div class="empty-table">No registered users yet.</div>`;
}
function renderAdminOrders(){
  const box=document.getElementById("adminOrdersTable");if(!box)return;
  if(!adminGuard())return;
  const orders=getOrders(),users=getUsers(),products=getProducts();
  box.innerHTML=orders.length?`<div class="table-wrap"><table class="data-table"><thead><tr><th>Order</th><th>Customer</th><th>Total</th><th>Date</th><th>Status</th></tr></thead><tbody>${orders.map(o=>`<tr><td>${o.id}</td><td>${o.customerName}<br><small>${users.find(u=>u.id===o.userId)?.email||""}</small></td><td>${formatCurrency(o.total)}</td><td>${o.date}</td><td><select class="select-status" onchange="updateOrderStatus('${o.id}',this.value)">${["Placed","Processing","Shipped","Delivered","Cancelled"].map(s=>`<option ${o.status===s?"selected":""}>${s}</option>`).join("")}</select></td></tr>`).join("")}</tbody></table></div>`:`<div class="empty-table">No orders yet.</div>`;
}
function updateOrderStatus(id,status){
  const orders=getOrders();const order=orders.find(o=>o.id===id);if(!order)return;
  order.status=status;setData(STORAGE_KEYS.orders,orders);renderAdminOrders();
}
document.addEventListener("DOMContentLoaded",()=>{
  if(document.getElementById("productStat"))renderAdminDashboard();
  if(document.getElementById("adminProductsTable")){
    renderAdminProducts();
    document.getElementById("addProductBtn").addEventListener("click",()=>{resetProductForm();document.getElementById("productFormPanel").classList.remove("hidden");});
    document.getElementById("cancelProduct").addEventListener("click",()=>document.getElementById("productFormPanel").classList.add("hidden"));
    document.getElementById("productForm").addEventListener("submit",saveProduct);
  }
  renderUsers();renderAdminOrders();
});
