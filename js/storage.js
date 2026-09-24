const KEY={users:"health_users",doctors:"health_doctors",appointments:"health_appointments",current:"health_current_user"};
const defaultDoctors=[
{id:101,name:"Dr. Anil Kumar",specialty:"Cardiologist",experience:"12 years",fee:800,days:"Mon, Wed, Fri",about:"Heart specialist providing consultation and preventive cardiac care.",emoji:"❤️"},
{id:102,name:"Dr. Priya Sharma",specialty:"Dermatologist",experience:"9 years",fee:600,days:"Tue, Thu, Sat",about:"Skin and hair specialist with clinical dermatology experience.",emoji:"🧴"},
{id:103,name:"Dr. Rahul Reddy",specialty:"Pediatrician",experience:"10 years",fee:500,days:"Mon, Tue, Thu",about:"Specialist in child health and routine pediatric care.",emoji:"👶"},
{id:104,name:"Dr. Sneha Rao",specialty:"General Physician",experience:"7 years",fee:400,days:"Mon to Sat",about:"General medical consultation and preventive healthcare.",emoji:"🩺"},
{id:105,name:"Dr. Kiran Patel",specialty:"Neurologist",experience:"14 years",fee:1000,days:"Wed, Fri, Sat",about:"Neurology consultation for common neurological conditions.",emoji:"🧠"},
{id:106,name:"Dr. Meera Das",specialty:"Orthopedic",experience:"11 years",fee:750,days:"Mon, Wed, Sat",about:"Bone, joint and musculoskeletal consultation.",emoji:"🦴"}
];
function get(key,f=[]){try{return JSON.parse(localStorage.getItem(key))??f}catch(e){return f}}
function set(key,v){localStorage.setItem(key,JSON.stringify(v))}
function users(){return get(KEY.users,[])} function doctors(){return get(KEY.doctors,defaultDoctors)} function appointments(){return get(KEY.appointments,[])} function current(){return get(KEY.current,null)}
function money(n){return "₹"+Number(n).toLocaleString("en-IN")}
function seed(){if(!localStorage.getItem(KEY.users))set(KEY.users,[{id:1,name:"Administrator",email:"admin@healthcare.com",password:"admin123",role:"admin"}]);if(!localStorage.getItem(KEY.doctors))set(KEY.doctors,defaultDoctors);if(!localStorage.getItem(KEY.appointments))set(KEY.appointments,[])}
seed();
function guard(role){const u=current();if(!u){window.location.href="../login.html";return null}if(role&&u.role!==role){window.location.href=u.role==="admin"?"../admin/dashboard.html":"../user/dashboard.html";return null}return u}
function logout(){localStorage.removeItem(KEY.current);window.location.href="../login.html"}
document.addEventListener("DOMContentLoaded",()=>{const b=document.getElementById("logoutBtn");if(b)b.onclick=logout})
