/* Frontend account prototype. Do not use localStorage as production authentication. */
const AUTH_SESSION_KEY='risssClobberSession';
const DEMO_USERS_KEY='risssClobberDemoUsers';
const DEMO_ORDERS_KEY='risssClobberOrders';
const authRead=(key,fallback)=>{try{const value=JSON.parse(localStorage.getItem(key));return value??fallback;}catch{return fallback;}};
const authWrite=(key,value)=>{try{localStorage.setItem(key,JSON.stringify(value));}catch{}};
function currentUser(){return authRead(AUTH_SESSION_KEY,null);}
function resetDemoData(){if(!confirm('Reset semua data? Cart, wishlist, akun tambahan, order, dan perubahan admin akan dihapus.'))return;[AUTH_SESSION_KEY,DEMO_USERS_KEY,DEMO_ORDERS_KEY,'risssClobberCart','risssClobberWishlist','risssClobberAdminProducts','risssClobberAdminOrders','casualCultureCart','casualCultureWishlist'].forEach(key=>localStorage.removeItem(key));location.hash='#/home';location.reload();}
function authMessage(text,type='error'){const el=document.querySelector('[data-auth-message]');if(el){el.textContent=text;el.className=`form-message ${type}`;}}

// Seed akun awal jika belum ada
(function initDemoUsers(){
  if(!localStorage.getItem(DEMO_USERS_KEY)){
    authWrite(DEMO_USERS_KEY,[
      {name:'Admin Risss',email:'admin@risssclobber.demo',password:'password123',role:'admin'},
      {name:'Demo Customer',email:'demo@risssclobber.demo',password:'password123',role:'customer'}
    ]);
  }
})();

function setupAuth(){
  const login=document.querySelector('#login-form');
  if(login&&!login.dataset.bound){
    login.dataset.bound='true';
    login.addEventListener('submit',e=>{
      e.preventDefault();
      const email=login.querySelector('input[type=email]').value.trim().toLowerCase(),password=login.querySelector('input[type=password]').value;
      if(!login.checkValidity()){authMessage('Masukkan email dan password yang valid.');return;}
      const users=authRead(DEMO_USERS_KEY,[]),user=users.find(item=>item.email===email);
      if(!user||user.password!==password){authMessage('Email atau password salah.');return;}
      authWrite(AUTH_SESSION_KEY,{name:user.name,email:user.email,role:user.role||'customer'});
      location.hash='#/profile';
    });
  }
  const register=document.querySelector('#register-form');
  if(register&&!register.dataset.bound){
    register.dataset.bound='true';
    register.addEventListener('submit',e=>{
      e.preventDefault();
      if(!register.checkValidity()){authMessage('Lengkapi data dan gunakan password minimal 8 karakter.');return;}
      const name=register.querySelector('#register-name').value.trim(),email=register.querySelector('#register-email').value.trim().toLowerCase(),password=register.querySelector('#register-password').value;
      const users=authRead(DEMO_USERS_KEY,[]);
      if(users.some(item=>item.email===email)){authMessage('Email sudah terdaftar.');return;}
      users.push({name,email,password,role:'customer'});
      authWrite(DEMO_USERS_KEY,users);
      authWrite(AUTH_SESSION_KEY,{name,email,role:'customer'});
      location.hash='#/profile';
    });
  }
  const logout=document.querySelector('#logout-btn');
  if(logout&&!logout.dataset.bound){
    logout.dataset.bound='true';
    logout.onclick=()=>{
      localStorage.removeItem(AUTH_SESSION_KEY);
      location.hash='#/login';
    };
  }
  const resetBtn=document.querySelector('#reset-demo-btn');if(resetBtn&&!resetBtn.dataset.bound){resetBtn.dataset.bound='true';resetBtn.onclick=()=>resetDemoData();}
  const detail=document.querySelector('#profile-details');if(detail){const user=currentUser();if(!user){detail.innerHTML='<p class="form-message error">Silakan login terlebih dahulu.</p><div style="display:flex;gap:10px;align-items:center;margin-top:16px;"><a class="button dark" href="#/login">Login</a></div>';return}detail.innerHTML=`<div class="admin-panel"><p class="eyebrow">Signed in as</p><h2>${escapeHtml(user.name)}</h2><p>${escapeHtml(user.email)}</p><p class="account-note">Role: ${user.role==='admin'?'Administrator':'Customer'}</p></div><div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center;"><a class="button dark" href="#/orders">Lihat Pesanan</a>${user.role==='admin'?'<a class="button olive" href="#/admin">Panel Admin</a>':''}</div>`;}
  const orders=document.querySelector('#orders-list');if(orders){const user=currentUser();const allOrders=authRead(DEMO_ORDERS_KEY,[]).map(normalizeOrder);const items=user&&user.role!=='admin'?allOrders.filter(o=>!o.email||o.email.toLowerCase()===user.email.toLowerCase()):allOrders;orders.innerHTML=items.length?items.map(o=>`<article class="admin-panel" style="margin-bottom:16px;"><div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:8px;"><div><p class="eyebrow">${escapeHtml(o.createdAt?new Date(o.createdAt).toLocaleString('id-ID'):'-')}</p><h2 style="margin:4px 0;">${escapeHtml(o.orderNumber||'Order')}</h2></div>${statusBadge(o.status)}</div><p style="font-weight:700;margin:6px 0;font-size:1.1rem;">${rupiah(o.total)}</p>${o.customer?`<p class="account-note" style="margin-bottom:4px;"><strong>Penerima:</strong> ${escapeHtml(o.customer)} ${o.city?`(${escapeHtml(o.city)})`:''}</p>`:''}${o.paymentMethod?`<p class="account-note" style="margin-bottom:4px;"><strong>Metode:</strong> ${escapeHtml(o.paymentMethod)}</p>`:''}${Array.isArray(o.items)&&o.items.length?`<p class="account-note"><strong>Item:</strong> ${o.items.map(i=>`${escapeHtml(i.name)} (${i.quantity}x${i.size?`, ${escapeHtml(i.size)}`:''})`).join(', ')}</p>`:''}${o.status==='Pending'&&typeof buildWhatsAppOrderUrl==='function'?`<div style="margin-top:12px;"><a class="button whatsapp" style="padding:8px 16px;font-size:0.75rem;" target="_blank" rel="noopener" href="${escapeHtml(buildWhatsAppOrderUrl(o))}">Konfirmasi via WhatsApp</a></div>`:''}</article>`).join(''):'<div class="empty-state"><h2>Belum ada pesanan</h2><p>Pesanan yang berhasil dibuat akan tampil di sini.</p><a href="#/shop" class="button dark">Mulai Belanja</a></div>';}
}
document.addEventListener('DOMContentLoaded',setupAuth);
