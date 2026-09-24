function msg(t,ok=false){const m=document.getElementById("message");if(m){m.textContent=t;m.className="message "+(ok?"ok":"bad")}}
document.addEventListener("DOMContentLoaded",()=>{
const lf=document.getElementById("loginForm"),sf=document.getElementById("signupForm");
if(lf)lf.onsubmit=e=>{e.preventDefault();const email=document.getElementById("email").value.trim().toLowerCase(),password=document.getElementById("password").value,u=users().find(x=>x.email===email&&x.password===password);if(!u)return msg("Invalid email or password.");set(KEY.current,u);location.href=u.role==="admin"?"admin/dashboard.html":"user/dashboard.html"};
if(sf)sf.onsubmit=e=>{e.preventDefault();const name=document.getElementById("name").value.trim(),email=document.getElementById("email").value.trim().toLowerCase(),p=document.getElementById("password").value,c=document.getElementById("confirm").value,arr=users();if(p!==c)return msg("Passwords do not match.");if(arr.some(u=>u.email===email))return msg("Email already registered.");arr.push({id:Date.now(),name,email,password:p,role:"user"});set(KEY.users,arr);msg("Account created successfully. Redirecting...",true);setTimeout(()=>location.href="login.html",800)};
if(document.getElementById("profile-name")){}
if(document.getElementById("name")&&!sf)return;
if(document.getElementById("avatar")){const u=guard("user");if(!u)return;document.getElementById("name").textContent=u.name;document.getElementById("email").textContent=u.email;document.getElementById("role").textContent=u.role;document.getElementById("id").textContent=u.id;document.getElementById("avatar").textContent=u.name[0].toUpperCase()}
})
