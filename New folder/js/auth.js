function showMessage(text, success=false){
  const el = document.getElementById("message");
  if(el){ el.textContent=text; el.className="form-message " + (success ? "success-text" : "warning-text"); }
}

document.addEventListener("DOMContentLoaded", ()=>{
  const loginForm=document.getElementById("loginForm");
  const signupForm=document.getElementById("signupForm");

  if(loginForm){
    const current=getCurrentUser();
    if(current){
      window.location.href = current.role==="admin" ? "admin/dashboard.html" : "user/dashboard.html";
      return;
    }
    loginForm.addEventListener("submit",(e)=>{
      e.preventDefault();
      const email=document.getElementById("email").value.trim().toLowerCase();
      const password=document.getElementById("password").value;
      const user=getUsers().find(u=>u.email===email && u.password===password);
      if(!user){ showMessage("Invalid email or password."); return; }
      setCurrentUser(user);
      window.location.href=user.role==="admin" ? "admin/dashboard.html" : "user/dashboard.html";
    });
  }

  if(signupForm){
    signupForm.addEventListener("submit",(e)=>{
      e.preventDefault();
      const name=document.getElementById("name").value.trim();
      const email=document.getElementById("email").value.trim().toLowerCase();
      const password=document.getElementById("password").value;
      const confirm=document.getElementById("confirmPassword").value;
      const users=getUsers();

      if(password!==confirm){ showMessage("Passwords do not match."); return; }
      if(users.some(u=>u.email===email)){ showMessage("Email is already registered."); return; }

      const newUser={id:Date.now(),name,email,password,role:"user"};
      users.push(newUser);
      setData(STORAGE_KEYS.users,users);
      showMessage("Account created successfully. Redirecting...",true);
      setTimeout(()=>window.location.href="login.html",900);
    });
  }

  if(document.getElementById("profileName")){
    const user=requireLogin("user");
    if(!user) return;
    document.getElementById("profileName").textContent=user.name;
    document.getElementById("profileEmail").textContent=user.email;
    document.getElementById("profileRole").textContent=user.role;
    document.getElementById("profileId").textContent=user.id;
    document.getElementById("avatar").textContent=user.name.charAt(0).toUpperCase();
  }
});
